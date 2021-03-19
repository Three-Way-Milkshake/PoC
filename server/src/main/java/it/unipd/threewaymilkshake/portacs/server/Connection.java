package it.unipd.threewaymilkshake.portacs.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;


public class Connection {
  private Socket socket;
  private BufferedReader in;
  public PrintWriter out;
  private String lastMessage;
  private WareHouseMap map;
  private Deque<Character> tasks;
  private Deque<Character> pathToNextTask;
  private Point actualPosition;
  private int id;

  private  static int ID_COUNTER=0;
  private boolean manager;

  Connection(Socket socket, WareHouseMap map, Deque<Character> tasks) {
    this.map=map;
    this.socket = socket;
    this.tasks=tasks;
    this.id=++ID_COUNTER;
    this.pathToNextTask=new LinkedList<>();
    actualPosition=new Point();
    try {
      out = new PrintWriter(socket.getOutputStream(), true);
      in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
      String type=in.readLine();
      out.print("MAP,");
      out.print(map.getRows());
      out.print(',');
      out.print(map.getColumns());
      out.print(',');
      out.print(map.toString()+";");
      if(type.equals("UNIT")){
        manager=false;
        // int[][] m=map.toIntMatrix();
        
        /* Arrays.stream(map.toIntMatrix()).forEach(r->{
          Arrays.stream(r).forEach(i->{
            out.print(i);
          });
        }); */
        out.print("LIST,"+tasks.toString().replaceAll("(,| |\\[|\\])", "")+";");
        // out.println("HELLO");
        /*
        * out.println("MAP"); Gson g=new Gson(); int[][] arr=new int[3][3];
        * g.toJson(arr); out.println(g.toString());
        */
      }
      else{
        //responsabile
        manager=true;
      }

      out.println();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public boolean isManager(){
    return manager;
  }

  public Point getPosition(){
    //return new Point(actualPosition.getX(),actualPosition.getY(),actualPosition.getOrientation());
    return actualPosition;
  }

  public String calculateAndGetPathToNextTask(){
    char next=tasks.removeFirst();
    //System.out.println("Looking for "+actualPosition.toNodeString()+" to "+map.getPOIPosition(next));
    pathToNextTask=map.getPath(actualPosition, map.getPOIPosition(next));
    return pathToNextTask.toString().replaceAll("(,| |\\[|\\])", "");
  }

  public void updatePosition(int x, int y, Orientation d){
    actualPosition.set(x, y, d);
  }

  public void updatePosition(String[] par){
    /* swapped x, y to try fix swapping problem in client */
    updatePosition(
      Integer.parseInt(par[2]),
      Integer.parseInt(par[1]), 
      Orientation.values()[Integer.parseInt(par[3])]
    );
  }

  /*
   * public boolean isAlive(){ return !socket.isClosed(); }
   */

  public void send(String msg) {
    out.println(msg);
  }

  public void process(){
    String[] commands=lastMessage.split(";");
    Arrays.stream(commands)
      .forEach(c->{
        String[] par=c.split(",");
        System.out.print("Command: "+par[0]+", params: ");
        for(int i=1; i<par.length; ++i){
          System.out.print(par[i]+" ");
        }
        System.out.println();
        switch(par[0]){
          case "POS": 
            updatePosition(par); 
            break;
          case "PATH": 
            out.print("PATH,"+calculateAndGetPathToNextTask()+";"); 
            // out.print("PATH,TMMMLMMM;"); 
            //out.print("PATH,TMMMLMMM;"); 
            break;
          default: 
            System.out.println("Unrecognized message: "+par[0]);
        }
        System.out.println("I am at: "+actualPosition.toString());
      });
  }

  public boolean isAlive() {
    boolean r = true;
    try {
      lastMessage = in.readLine();
      if (lastMessage == null)
        r = false;
    } catch (IOException e) {
      r = false;
    }
    if (!r) {
      close();
    }

    return r;
  }

  public String getLastMessage() {
    return lastMessage;
  }
  public int getId() {
    return id;
  }

  public LinkedList<Move> getFirstTwoMoves() {
    LinkedList<Move> toReturn = new LinkedList<Move>();
    if(pathToNextTask.size() > 1) {
      // Character move = pathToNextTask.get(0);
      char move=pathToNextTask.removeFirst();
      toReturn.add(characterToMove(move));
      move = pathToNextTask.getFirst();
      toReturn.add(characterToMove(move));
    }
    else if(pathToNextTask.size() == 1) {
      // Character move = pathToNextTask.get(1);
      char move=pathToNextTask.removeFirst();
      toReturn.add(characterToMove(move));
    }
    return toReturn;
  }

  public static Move characterToMove(Character m) {
    return switch(m){
      case 'R' -> Move.TURNRIGHT;
      case 'L' -> Move.TURNLEFT;
      case 'T' -> Move.TURNBACK;
      default -> Move.GOSTRAIGHT;
    };
  }

  public void close() {
    try {
      in.close();
      out.close();
      socket.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
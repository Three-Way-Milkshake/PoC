package it.unipd.threewaymilkshake.portacs.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

class Connection {
  private Socket socket;
  private BufferedReader in;
  private PrintWriter out;
  private String lastMessage;
  private WareHouseMap map;
  private Deque<Character> tasks;
  private Deque<Character> pathToNextTask;
  private Point actualPosition;

  Connection(Socket socket, WareHouseMap map, Deque<Character> tasks) {
    this.map=map;
    this.socket = socket;
    this.tasks=tasks;
    actualPosition=new Point();
    try {
      out = new PrintWriter(socket.getOutputStream(), true);
      in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//      int[][] m=map.toIntMatrix();
      out.print("MAP,");
      out.print(map.getRows());
      out.print(',');
      out.print(map.getColumns());
      out.print(',');
      /* Arrays.stream(map.toIntMatrix()).forEach(r->{
        Arrays.stream(r).forEach(i->{
          out.print(i);
        });
      }); */
      out.print(map.toString()+";");
      out.print("LIST,"+tasks.toString().replaceAll("(,| |\\[|\\])", "")+";");
      out.println();
      // out.println("HELLO");
      /*
       * out.println("MAP"); Gson g=new Gson(); int[][] arr=new int[3][3];
       * g.toJson(arr); out.println(g.toString());
       */
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public String calculateAndGetPathToNextTask(){
    char next=tasks.removeFirst();
    pathToNextTask=map.getPath(actualPosition, map.getPOIPosition(next));
    return pathToNextTask.toString().replaceAll("(,| |\\[|\\])", "");
  }

  public void updatePosition(int x, int y, Direction d){
    actualPosition.set(x, y, d);
  }

  public void updatePosition(String[] par){
    updatePosition(
      Integer.parseInt(par[1]), 
      Integer.parseInt(par[2]),
      Direction.values()[Integer.parseInt(par[3])]
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
            // out.print("PATH,"+calculateAndGetPathToNextTask()+";"); 
            out.print("PATH,MMLMMRMTMRMRMLMTMM;"); 
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
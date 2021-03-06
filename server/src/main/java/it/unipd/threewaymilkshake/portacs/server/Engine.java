package it.unipd.threewaymilkshake.portacs.server;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;


class Engine implements Runnable {
  private ConcurrentLinkedQueue<Connection> connections;
  private WareHouseMap map;
  private Deque<Deque<Character>> tasksList;

  Engine(ConcurrentLinkedQueue<Connection> c, WareHouseMap map, Deque<Deque<Character>> tasksList) {
    this.connections = c;
    this.map=map;
    this.tasksList=tasksList;
  }

  @Override
  public void run() {
    while (true) {
      if (!connections.isEmpty()) {
        for (Connection c : connections) {
          c.send("ALIVE");
          if (!c.isAlive()) {
            connections.remove(c);
            System.out.println("Found a closed connection, removing it from list...");
          } else {
            //System.out.println("Received: " + c.getLastMessage());
            c.process();
          }
        }

        /********************/
        LinkedList<Muletto> incomingConnections = new LinkedList<Muletto>();
        connections.stream().forEach(zzz->{
          incomingConnections.add(new Muletto(zzz));
        });
        /* while (!connections.isEmpty()) {
            incomingConnections.add(new Muletto(connections.poll()));        
        } */
        ServerCentrale serverCentrale = new ServerCentrale(incomingConnections);
        serverCentrale.organizer();
        /********************/


        System.out.println("Doing sth, there are: " + connections.size());
      } else {
        System.out.println("No unit connected...");
      }

      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }
}
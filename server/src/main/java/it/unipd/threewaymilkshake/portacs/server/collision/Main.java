package it.unipd.threewaymilkshake.portacs.server.collision;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) throws InterruptedException {


        testUnitSendingPosition();  

        //testSerialization();
        
        //testCollisionSolver();
        
        //testCollision();
        
    }

    public static void testUnitSendingPosition() throws InterruptedException {

        Unit unit1 = new Unit(1,new Point(0,0,Orientation.RIGHT),new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        Unit unit2 = new Unit(2,new Point(5,5,Orientation.UP),new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        Unit unit3 = new Unit(3,new Point(0,10,Orientation.LEFT),new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        //Unit unit4 = new Unit(4,new Point(5,5,Orientation.UP),new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        //Unit unit5 = new Unit(5,new Point(5,5,Orientation.UP),new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        //Unit unit6 = new Unit(6,new Point(5,5,Orientation.UP),new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        BlockingQueue<Connection> connections = new LinkedBlockingQueue<>(30);

        Thread muletto1 = new Thread(new Runnable() {
            public void run() {
                String mossa = unit1.moves.get(0).toString();
                Connection connection = new Connection(1,unit1.makeMove(),unit1.getFirstTwoMoves());
                String message = "Muletto 1: pos " + connection.position.printPosition();
                System.out.println("Muletto sending..." + message + " moving " + mossa);
                try {
                    connections.put(connection);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread muletto2 = new Thread(new Runnable() {
            public void run() {
                String mossa = unit2.moves.get(0).toString();
                Connection connection = new Connection(2, unit2.makeMove(),unit2.getFirstTwoMoves());
                String message = "Muletto 2: pos " + connection.position.printPosition();
                System.out.println("Muletto sending..." + message + " moving " + mossa);
                try {
                    connections.put(connection);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread muletto3 = new Thread(new Runnable() {
            public void run() {
                String mossa = unit3.moves.get(0).toString();
                Connection connection = new Connection(3, unit3.makeMove(),unit2.getFirstTwoMoves());
                String message = "Muletto 3: pos " + connection.position.printPosition();
                System.out.println("Muletto sending..." + message + " moving " + mossa);
                try {
                    connections.put(connection);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });


        CellType[][] templateMappa = {
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE },
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE },
                        { CellType.LEFT, CellType.LEFT, CellType.LEFT, CellType.LEFT, CellType.LEFT, CellType.LEFT,
                                        CellType.UP, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE },
                        { CellType.RIGHT, CellType.RIGHT, CellType.RIGHT, CellType.RIGHT, CellType.RIGHT,
                                        CellType.RIGHT, CellType.UP, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE },
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.DOWN, CellType.UP, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE },
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.DOWN, CellType.LEFT, CellType.LEFT, CellType.LEFT, CellType.LEFT },
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.DOWN, CellType.RIGHT, CellType.RIGHT, CellType.RIGHT, CellType.RIGHT },
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE },
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE },
                        { CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE, CellType.OBSTACLE,
                                        CellType.OBSTACLE } };

        Map map = new Map(templateMappa,10,10);
        
        ServerCentrale server = new ServerCentrale(connections,map);

        

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(3);
        executor.scheduleAtFixedRate(muletto1, 0, 500L, TimeUnit.MILLISECONDS);
        executor.scheduleAtFixedRate(muletto2, 0, 500L, TimeUnit.MILLISECONDS);
        executor.scheduleAtFixedRate(muletto3, 0, 500L, TimeUnit.MILLISECONDS);        
        executor.scheduleAtFixedRate(() -> server.organizer(executor), 250L, 500L, TimeUnit.MILLISECONDS);
        //executor.submit(() -> server.startServer());
        
        Thread.sleep(5000L);
        //if(unit1.moves.isEmpty()) 
            executor.shutdown();

    }
    

    public static void testCollision() throws InterruptedException {

        // 1 test
        LinkedList<Connection> lista = new LinkedList<Connection>();

        //Connection con1 = new Connection(1, new Point(2, 0, Orientation.RIGHT), new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        //Connection con2 = new Connection(2, new Point(3, 2, Orientation.UP), new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        //Connection con3 = new Connection(3, new Point(0, 3, Orientation.LEFT), new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        //Connection con4 = new Connection(4, new Point(0, 1, Orientation.RIGHT), new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT)));

        Connection con5 = new Connection(5, new Point(0, 1, Orientation.RIGHT), new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT)));
        Connection con6 = new Connection(6, new Point(2, 3, Orientation.UP), new LinkedList(Arrays.asList(Move.GOSTRAIGHT,Move.GOSTRAIGHT)));


        //lista.add(con1);
        //lista.add(con2);
        //lista.add(con3);
        //lista.add(con4);
        lista.add(con5);
        lista.add(con6);

        System.out.println("MULETTI");
        for (int i = 0; i < lista.size(); i++) {
            System.out.println(
                    lista.get(i).id + "," + lista.get(i).position.printPosition() + "," + lista.get(i).nextMoves);
        }

        long startTime = System.nanoTime();
        HashMap<Point, LinkedList<Connection>> prova = new HashMap<Point, LinkedList<Connection>>();
        prova = Collision.CollisionDetector(lista);
        // System.out.println(Arrays.asList(prova));
        System.out.println("MAPPA");
        Collision.printCollisionDetected(prova);
        long stopTime = System.nanoTime();
        System.out.println((stopTime - startTime) / 1000);

    }


public static void testCollisionSolver() {

        HashMap<Point,LinkedList<Connection>> collision = new HashMap<Point,LinkedList<Connection>>();
        // 1 test
        // collision.put(new Point(4,3),new LinkedList(Arrays.asList(new Connection(1,new Point(4,1,Orientation.RIGHT)),new Connection(2,new Point(5,3,Orientation.UP)))));
        // collision.put(new Point(3,3),new LinkedList(Arrays.asList(new Connection(2,new Point(5,3,Orientation.UP)),new Connection(3,new Point(3,4,Orientation.LEFT)),new Connection(4,new Point(1,3,Orientation.DOWN)))));
        // collision.put(new Point(7,3),new LinkedList(Arrays.asList(new Connection(5,new Point(7,1,Orientation.RIGHT)),new Connection(6,new Point(7,5,Orientation.LEFT)))));
        // collision.put(new Point(1,7),new LinkedList(Arrays.asList(new Connection(7,new Point(1,5,Orientation.RIGHT)),new Connection(8,new Point(3,7,Orientation.UP)))));
        // collision.put(new Point(5,7),new LinkedList(Arrays.asList(new Connection(9,new Point(7,7,Orientation.UP)),new Connection(10,new Point(5,7,Orientation.UP)))));
        // collision.put(new Point(4,7),new LinkedList(Arrays.asList(new Connection(10,new Point(5,7,Orientation.UP)),new Connection(8,new Point(3,7,Orientation.UP)))));


        // 2 test
        //collision.put(new Point(2,1),new LinkedList(Arrays.asList(new Connection(1,new Point(3,0,Orientation.RIGHT)),new Connection(6,new Point(1,1,Orientation.DOWN)),new Connection(2,new Point(5,1,Orientation.UP)))));
        //collision.put(new Point(2,1),new LinkedList(Arrays.asList(new Connection(6,new Point(1,1,Orientation.DOWN)),new Connection(5,new Point(2,3,Orientation.LEFT)))));
        //collision.put(new Point(2,3),new LinkedList(Arrays.asList(new Connection(5,new Point(2,3,Orientation.LEFT)),new Connection(4,new Point(2,5,Orientation.LEFT)))));
        //collision.put(new Point(2,5),new LinkedList(Arrays.asList(new Connection(4,new Point(2,5,Orientation.LEFT)),new Connection(3,new Point(4,5,Orientation.UP))))); 

        // 3 test
        Connection con1 = new Connection(1,new Point(2,0,Orientation.RIGHT));
        Connection con2 = new Connection(2,new Point(3,2,Orientation.UP));
        Connection con3 = new Connection(3,new Point(1,3,Orientation.LEFT));
        Connection con4 = new Connection(4,new Point(0,1,Orientation.DOWN));
        collision.put(new Point(1,1),new LinkedList(Arrays.asList(con3,con4)));
        collision.put(new Point(2,1),new LinkedList(Arrays.asList(con1,con4)));
        collision.put(new Point(1,2),new LinkedList(Arrays.asList(con3,con2)));
        collision.put(new Point(2,2),new LinkedList(Arrays.asList(con1,con2)));


        Solver solver = new Solver(collision);
        long startTime = System.nanoTime();
        solver.collisionSolver();
        long stopTime = System.nanoTime();
        System.out.println((stopTime - startTime)/1000);    
        solver.printResponse();

    }




    public static void testSerialization() {
        // new map version, to test gson
        CellType[][] templateMapItem = {
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                         CellType
                         .OBSTACLE },
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE },
                { CellType
                .LEFT, CellType
                .LEFT, CellType
                .LEFT, CellType
                .LEFT,
                        CellType
                        .LEFT, CellType
                        .LEFT, CellType
                        .UP,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE },
                { CellType
                .RIGHT, CellType
                .RIGHT, CellType
                .RIGHT, CellType
                .RIGHT,
                        CellType
                        .RIGHT, CellType
                        .RIGHT, CellType
                        .UP,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE },
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .DOWN,
                        CellType
                        .UP, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE },
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .DOWN,
                        CellType
                        .LEFT, CellType
                        .LEFT, CellType
                        .LEFT,
                        CellType
                        .LEFT },
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .DOWN,
                        CellType
                        .RIGHT, CellType
                        .RIGHT, CellType
                        .RIGHT,
                        CellType
                        .RIGHT },
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE },
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE },
                { CellType
                .OBSTACLE, CellType
                .OBSTACLE, CellType
                .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE, CellType
                        .OBSTACLE, CellType
                        .OBSTACLE,
                        CellType
                        .OBSTACLE } };

        // experimenting with gson
        Map mappa = new Map(templateMapItem);
        try {
            mappa.serialize();
            mappa.deserialize();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }



}

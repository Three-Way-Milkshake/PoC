/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package it.unipd.threewaymilkshake.portacs.server;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.TimerTask;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ServerCentrale {

    LinkedList<Muletto> currentMulettos = new LinkedList<Muletto>();

    
    public ServerCentrale(LinkedList<Muletto> currentMulettos) {
        this.currentMulettos = currentMulettos;
    }

    /*public void startServer() {

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.scheduleAtFixedRate(() -> organizer(), 250L, 500L, TimeUnit.MILLISECONDS);

    }*/

    public void organizer() {
        System.out.println("***");
    

        generateMatrix(currentMulettos);

        
        HashMap<Point, LinkedList<Muletto>> collisionDetected = Collision.CollisionDetector(new HashSet<Muletto>(currentMulettos));
       
    
        Collision.printCollisionDetected(collisionDetected);


        
        Solver solver = new Solver(collisionDetected);

        solver.collisionSolver();
        
        solver.printResponse();
        
        System.out.println("***");
        currentMulettos.clear();
    }

    public void generateMatrix(LinkedList<Muletto> currentMulettos) {
        
        for(Muletto con : currentMulettos)
        {
            System.out.println("Ricevuto muletto " + con.id + con.position.printPosition() + " nextTwoMoves: ");
            con.printNextMoves();
        }
        


        int[][] map = {
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 },
            { 0,0,0,0,0,0,0,0,0,0 }
        };

        for(Muletto con : currentMulettos)
        {
            map[con.position.getX()][con.position.getY()] = 1;
        }

        for(int i = 0; i < 10; i++) 
        {
            for(int j = 0; j < 10; j++)
            {
                System.out.printf(map[i][j] + " ");
            }
            System.out.printf("\n");
        }
        

    }


    

}
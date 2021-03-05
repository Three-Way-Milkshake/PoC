package it.unipd.threewaymilkshake.portacs.server.collision;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Collision {

    static void printCollisionDetected(HashMap<Point, LinkedList<Connection>> prova) {
        if(!prova.isEmpty()) System.out.println("RILEVATA COLLISIONE: ");
        for (HashMap.Entry<Point, LinkedList<Connection>> entry : prova.entrySet()) {
            System.out.print("(" + entry.getKey().x + "," + entry.getKey().y + ")" + ": ");
            LinkedList<Connection> tmp = entry.getValue();
            LinkedList<Connection> tmp1 = new LinkedList<Connection>(tmp);
            for (int i = 0; i < tmp1.size(); i++) {
                System.out.print("(" + tmp1.get(i).id + "," + tmp1.get(i).position.printPosition() + ","
                        + tmp1.get(i).nextMoves + ")");
            }
            System.out.println();
        }
    }



    static HashMap<Point, LinkedList<Connection>> CollisionDetector(LinkedList<Connection> muletti) {
        HashMap<Point, LinkedList<Connection>> tmp = new HashMap<Point, LinkedList<Connection>>();

        for (Connection e1 : muletti) {
            for (Connection e2 : muletti) {
                if (e1.id < e2.id) {
                    Set<Connection> mul = new LinkedHashSet<Connection>();
                    // pos coincidente
                    Point pos1 = new Point(e1.position.x, e1.position.y, e1.position.orientation);
                    Point pos2 = new Point(e2.position.x, e2.position.y, e2.position.orientation);
                    // pos prossime mosse
                    Point pos1m1 = e1.position.TellNewPosition(e1.getMove(0));
                    Point pos1m2 = e1.position.Tell2NewPosition(e1.getMove(1), pos1m1);

                    Point pos2m1 = e2.position.TellNewPosition(e2.getMove(0));

                    Point pos2m2 = e2.position.Tell2NewPosition(e2.getMove(1), pos2m1);

                    if (pos1.equals(pos2)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1, s);
                    }
                    if (pos1.equals(pos2m1)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1, s);
                    }
                    if (pos1.equals(pos2m2)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1, s);
                    }
                    if (pos1m1.equals(pos2)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1m1, s);
                    }
                    if (pos1m1.equals(pos2m1)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1m1, s);
                    }
                    if (pos1m1.equals(pos2m2)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1m1, s);
                    }
                    if (pos1m2.equals(pos2)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1m2, s);
                    }
                    if (pos1m2.equals(pos2m1)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1m2, s);
                    }
                    if (pos1m2.equals(pos2m2)) {

                        mul.add(e1);
                        mul.add(e2);
                        LinkedList<Connection> s = new LinkedList<Connection>(mul);
                        tmp.put(pos1m2, s);
                    }
                }

            }
        }
        return tmp;
    }
    

}
package it.unipd.threewaymilkshake.portacs.server.collision;

import java.util.LinkedList;

public class Connection {
    public int id;
    public Point position;
    LinkedList<Move> nextMoves;

    public Connection(int id, Point position) {
        this.id = id;
        this.position = position;
    }

    public Connection(int id, Point position, LinkedList<Move> nextMoves) {
        this.id = id;
        this.position = position;
        this.nextMoves = nextMoves;
    }

    @Override
    public int hashCode() {
        return id;
    }

    @Override
    public boolean equals(Object obj) {
        if (getClass() != obj.getClass())
            return false;
        Connection other = (Connection) obj;
        if (id != other.id)
            return false;
        return true;
    }

    public void printConnection() {
        System.out.println(id + " " + position.x + position.y);
    }

    public void printNextMoves() {
        for(Move m : nextMoves) {
            System.out.printf(m.toString() + " ");
        }
        System.out.printf("\n");
    }


    Move getMove(Integer i) {
        return nextMoves.get(i);
    }
}

package it.unipd.threewaymilkshake.portacs.server.collision;

import java.util.Random;
import java.lang.Math;

enum Orientation{
  UP, DOWN, RIGHT, LEFT
}

public class Point {

    public int x;
    public int y;
    Orientation orientation;

    public Point(int x, int y, Orientation orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
        this.orientation = null;
    }

    public int calculateDistance(Point destination) {
        if(this.x == destination.x)
            return Math.abs(this.y-destination.y);
        else if(this.y == destination.y)
            return Math.abs(this.x-destination.x);
        else 
            return 0;
    }

    public Point goIntoNewPosition(Move move) {

        if(move == Move.GOSTRAIGHT) {
            if(this.orientation == Orientation.UP)
                x--;
            else if(this.orientation == Orientation.DOWN)
                x++;
            else if(this.orientation == Orientation.LEFT)
                y--;
            else //right
                y++;
        }
        else if(move == Move.TURNLEFT) {
            if(this.orientation == Orientation.UP)
                orientation = Orientation.LEFT;
            else if(this.orientation == Orientation.DOWN)
                orientation = Orientation.RIGHT;
            else if(this.orientation == Orientation.LEFT)
                orientation = Orientation.DOWN;
            else //right
                orientation = Orientation.UP; 
        }
        else if(move == Move.TURNRIGHT) {
            if(this.orientation == Orientation.UP)
                orientation = Orientation.RIGHT;
            else if(this.orientation == Orientation.DOWN)
                orientation = Orientation.LEFT;
            else if(this.orientation == Orientation.UP)
                orientation = Orientation.LEFT;
            else //right
                orientation = Orientation.DOWN; 
        }
        else { //TURNBACK
            if(this.orientation == Orientation.UP)
                orientation = Orientation.DOWN;
            else if(this.orientation == Orientation.DOWN)
                orientation = Orientation.UP;
            else if(this.orientation == Orientation.LEFT)
                orientation = Orientation.RIGHT;
            else //right
                orientation = Orientation.LEFT; 
        }
        return this;
    }

    public boolean headOnRisk(Point b) {
        if(x == b.x) {
            if(y < b.y) {
                return orientation == Orientation.RIGHT && b.orientation == Orientation.LEFT;
            }
            else if(y > b.y) {
                return orientation == Orientation.LEFT && b.orientation == Orientation.RIGHT;
            }
        }
        else if(y == b.y) {
            if(x < b.x) {
                return orientation == Orientation.DOWN && b.orientation == Orientation.UP;
            }
            else if(x > b.x) {
                return orientation == Orientation.UP && b.orientation == Orientation.DOWN;
            }
        }
        return false;
    }

    public Point TellNewPosition(Move move) {

        if (move == Move.GOSTRAIGHT) {
            if (this.orientation == Orientation.UP)
                return new Point((x - 1), y, orientation);
            else if (this.orientation == Orientation.DOWN)
                return new Point((x + 1), y, orientation);
            else if (this.orientation == Orientation.LEFT)
                return new Point(x, (y - 1), orientation);
            else // right
                return new Point(x, (y + 1), orientation);
        } else if (move == Move.TURNLEFT) {
            if (this.orientation == Orientation.UP)
                return new Point(x, y, Orientation.LEFT);
            else if (this.orientation == Orientation.DOWN)
                return new Point(x, y, Orientation.LEFT);
            else if (this.orientation == Orientation.LEFT)
                return new Point(x, y, Orientation.LEFT);
            else // right
                return new Point(x, y, Orientation.LEFT);
        } else if (move == Move.TURNRIGHT) {
            return new Point(x, y, Orientation.RIGHT);

        } else if (move == Move.TURNBACK) {
            // TURNBACK
            if (this.orientation == Orientation.UP)
                return new Point(x, y, Orientation.DOWN);
            else if (this.orientation == Orientation.DOWN)
                return new Point(x, y, Orientation.UP);
            else if (this.orientation == Orientation.LEFT)
                return new Point(x, y, Orientation.RIGHT);
            else // right
                return new Point(x, y, Orientation.LEFT);
        }
        return new Point(0, 0, Orientation.DOWN);
    }

    public Point Tell2NewPosition(Move move, Point p) {

        if (move == Move.GOSTRAIGHT) {
            if (p.orientation == Orientation.UP)
                return new Point((p.x - 1), p.y, p.orientation);
            else if (p.orientation == Orientation.DOWN)
                return new Point((p.x + 1), p.y, p.orientation);
            else if (p.orientation == Orientation.LEFT)
                return new Point(p.x, (p.y - 1), p.orientation);
            else // right
                return new Point(p.x, (p.y + 1), p.orientation);
        } else if (move == Move.TURNLEFT) {
            if (p.orientation == Orientation.UP)
                return new Point(p.x, p.y, Orientation.LEFT);
            else if (p.orientation == Orientation.DOWN)
                return new Point(p.x, p.y, Orientation.LEFT);
            else if (p.orientation == Orientation.LEFT)
                return new Point(p.x, p.y, Orientation.LEFT);
            else // right
                return new Point(p.x, p.y, Orientation.LEFT);
        } else if (move == Move.TURNRIGHT) {
            return new Point(p.x, p.y, Orientation.RIGHT);

        } else if (move == Move.TURNBACK) {
            // TURNBACK
            if (p.orientation == Orientation.UP)
                return new Point(p.x, p.y, Orientation.DOWN);
            else if (p.orientation == Orientation.DOWN)
                return new Point(p.x, p.y, Orientation.UP);
            else if (p.orientation == Orientation.LEFT)
                return new Point(p.x, p.y, Orientation.RIGHT);
            else // right
                return new Point(p.x, p.y, Orientation.LEFT);
        }
        return new Point(0, 0, Orientation.DOWN);
    }


    public String printPosition() {
        return "< " + x + "," + y + "," + orientation.toString() + " >";
    }


     @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Point)) {
            return false;
        }
        return (x == ((Point) obj).x && y == ((Point) obj).y);
    }


}

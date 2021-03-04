package it.unipd.threewaymilkshake.portacs.server;

class Point{
  private int x;
  private int y;
  private Direction dir;
  
  Point(int x, int y){
    this.x=x;
    this.y=y;
  }

  Point(int x, int y, Direction dir){
    this(x, y);
    this.dir=dir;
  }

  Point(){}

  public int getX(){
    return x;
  }
  
  public int getY(){
    return y;
  }

  public Direction getDirection(){
    return dir;
  }

  public void set(int x, int y, Direction dir){
    this.x=x;
    this.y=y;
    this.dir=dir;
  }

  public boolean equals(Point p){
    return x==p.x && y==p.y;
  }

  public String toString(){
		return "("+x+","+y+";"+dir+")";
	}

  public char setNext(int xn, int yn){
    char r='n';
    if(xn<x){
      //up
      r=switch(dir){
        case UP -> {
          --x;
          yield 'M';
        }
        case DOWN -> 'T';
        case LEFT -> 'R';
        case RIGHT -> 'L';
      };
      dir=Direction.UP;
    }
    else if(xn>x){
      //down
      r=switch(dir){
        case UP -> 'T';
        case DOWN -> {
          ++x;
          yield 'M';
        }
        case LEFT -> 'L';
        case RIGHT -> 'R';
      };
      dir=Direction.DOWN;
    }
    else if(yn<y){
      //left
      r=switch(dir){
        case UP -> 'L';
        case DOWN -> 'R';
        case LEFT -> {
          --y;
          yield 'M';
        }
        case RIGHT -> 'T';
      };
      dir=Direction.LEFT;
    }
    else{
      //right
      r=switch(dir){
        case UP -> 'R';
        case DOWN -> 'L';
        case LEFT -> 'T';
        case RIGHT -> {
          ++y;
          yield 'M';
        }
      };
      dir=Direction.RIGHT;
    }

    return r;
  }

  public boolean isNext(int xn, int yn){
    return switch(dir){
      case UP -> x-1==xn;
      case DOWN -> x+1==xn;
      case LEFT -> y-1==yn;
      case RIGHT -> y+1==yn;
    };
  }

  public boolean isClose(Point p2){
    boolean r=true;
    if(x!=p2.x){
      if(x+1!=p2.x && x-1!=p2.x){
        r=false;
      } 
    }
    if(r && y!=p2.y){
      if(y+1 != p2.y && y-1 != p2.y){
        r=false;
      }
    }
    return r;
  }
}
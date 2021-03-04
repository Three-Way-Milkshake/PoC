package it.unipd.threewaymilkshake.portacs.server;

import static org.junit.Assert.assertEquals;

import java.util.Deque;

// import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.Test;

// import org.junit.jupiter.api.Test;

public class TestMap {
  @Test
  public void testPath(){
    int[][] arr = new int[][] { 
      { 1, 1, 1, 1, 1, 0, 0, 1}, 
      { 1, 0, 1, 0, 1, 0, 0, 1 }, 
      { 1, 0, 1, 1, 1, 1, 0, 0 },
      { 1, 1, 1, 0, 1, 1, 1, 1} 
    };
    WareHouseMap m=new WareHouseMap(arr);
    
    Deque<Character> l=m.getPath(2, 0, 3, 7, Direction.UP); // T, R, M, M, M, L, M
    String s="";
    for(char c:l)
      s+=c+" ";
    
    assertEquals("T M L M M L M R M M R M L M M M ", s); //...;PATH,T,M,L,M,M;
  }

  @Test
  public void testMapWithChar(){
    char[][] arr = new char[][] { 
      { '1', '1', '1', '1', '1', '0', '0', '1'}, 
      { '1', '0', '1', '0', '1', '0', '0', '1' }, 
      { '1', '0', '1', '1', '1', '1', '0', '0' },
      { 'a', '1', '1', '0', '1', '1', '1', 'b'} 
    };

    WareHouseMap m=new WareHouseMap(arr);

    assertEquals("111110011010100110111100a110111b", m.toString());
    assertEquals("a(3,0)b(3,7)", m.getPOIList());
  }
}

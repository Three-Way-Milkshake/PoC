package it.unipd.threewaymilkshake.portacs.server.collision;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.Scanner;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

enum CellType{OBSTACLE,POI,UP,DOWN,RIGHT,LEFT,NEUTRAL};


public class Map {
    CellType[][] matrix;
    private int rows, cols;

    public Map(CellType[][] matrix, int rows, int cols) {
        this.matrix = matrix;
        this.rows = rows;
        this.cols = cols;
    }

    public void serialize() throws IOException {
        Gson gson = new GsonBuilder().create();
        String serialization = gson.toJson(matrix); 
        System.out.println(serialization);
        try (Writer writer = new FileWriter("output.json")) {
            writer.write(serialization);
        }
    }
        

    public void deserialize() throws IOException {
        Gson gson = new GsonBuilder().create();
        try(Scanner scanner = new Scanner(new File("output.json"))) {
            String content = scanner.useDelimiter("\\Z").next();
            CellType[][] deserialized = gson.fromJson(content, CellType[][].class);

            // serialize again to see if it works
            String serializationAgain = gson.toJson(deserialized); 
            System.out.println(serializationAgain);
        }
    }


        
}


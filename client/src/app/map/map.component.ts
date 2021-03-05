import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MapService } from './../map.service';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

const socket = io("http://127.0.0.1:8080/");


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map : string = '';
  posX : number = 0;
  posY : number = 0;
  dir : string = 'N'
  constructor(private service : MapService, private http: HttpClient, private ngZone: NgZone) {
    
  }

  ngOnInit() {
    //this.getValues();
    this.onNewMossa().subscribe((data) =>{
      this.ngZone.run(() => {
        //console.log('ciao '+data);
        this.changePosition(String(data));
        
      }); 
    })

    this.onNewMessage().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });      
    });
    
    
  }

  onNewMessage() {
    return new Observable(observer => {
      socket.on('mappa', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  onNewMossa(){
    return new Observable(observer => {
      socket.on('frecce', (msg: string) => {
        observer.next(msg);
      });
    });
  }


  getMap (map: string[][]){
    let tabellaHtml : string = '<table>';
    for (let i = 0; i < map.length; i++) {
      tabellaHtml += '<tr>';
      for (let j = 0; j < map[i].length; j++) {
        if(map[i][j] === '1') {                                          // zona transitabile
          tabellaHtml += '<td><img src="assets/white.png"></td>';
        } else if (map[i][j] === '0'){                                   // zona non transitabile
          tabellaHtml += '<td><img src="assets/black.png" ></td>';
        } else if(map[i][j] === '2'){                                    // sx -> dx
          tabellaHtml += '<td><img src="assets/dx.png"></td>';
        } else if(map[i][j] === '3'){                                    // up -> down
          tabellaHtml += '<td><img src="assets/down.png"></td>';
        } else if(map[i][j] === '4'){                                    // dx -> sx
          tabellaHtml += '<td><img src="assets/sx.png"></td>';
        } else if(map[i][j] === '5'){                                    // down -> up
          tabellaHtml += '<td><img src="assets/up.png"></td>';
        } else if(map[i][j] === 'Z'){
          tabellaHtml += '<td><img src="assets/muletto.png"></td>';
        } else { //POI
          
          tabellaHtml += '<td style="background-color: red;">'+map[i][j]+'</td>';          
        }
      }
      tabellaHtml += '</tr>';
    }
    tabellaHtml += '</table>';

    
    return tabellaHtml;
  }
  
  setValues(data : string) {
    
    var arr = new Array();
    arr[0] = new Array();
    let k = 0; //virgole
    let j = 0; //parentesi
    let i = 2;
    while(i < data.length) {
      if (data[i] === "[") {
        k = 0;
        j++;
        arr[j] = new Array();
      } else if (data[i] === ",") {
        k++;
        i++;
      } else if (data[i] === "]") {
      } else {
        arr[j][k] = data[i];
      }
      i++; 
    }
    console.log(arr);
    arr[this.posY][this.posX] = "Z"; //metto il muletto nella mappa 
    console.log("muletto: "+arr[this.posY][this.posX]+", posX:"+this.posX + ", posY:"+this.posY);
    this.map = this.getMap(arr);
  }

  changePosition(mossa : string){
    console.log(mossa);
    switch(mossa) {
      case "R":
        if      (this.dir == 'N') this.dir = 'E';
        else if (this.dir == 'O') this.dir = 'N';
        else if (this.dir == 'S') this.dir = 'O';
        else if (this.dir == 'E') this.dir = 'S';
        

        break;
        case "L":
          if      (this.dir == 'N') this.dir = 'O';
          else if (this.dir == 'O') this.dir = 'S';
          else if (this.dir == 'S') this.dir = 'E';
          else if (this.dir == 'E') this.dir = 'N';
          
          break;
        case "T":
          if      (this.dir == 'N') this.dir = 'S';
          else if (this.dir == 'O') this.dir = 'E';
          else if (this.dir == 'S') this.dir = 'N';
          else if (this.dir == 'E') this.dir = 'O';
          
          break;
        case "S":
          //fermo non fa niente
          break;
        case "M":
          if        (this.dir == 'N') { 
            this.posY --;
          } else if (this.dir == 'S') {
            this.posY ++;
          } else if (this.dir == 'E') {
            this.posX ++;
          } else if (this.dir == 'O') {
            this.posX --;
          }
          break;
    }
    socket.emit("mappa");
  }
}

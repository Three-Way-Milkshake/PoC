import { ViewMapService } from '../services/view-map.service';
import { UnitPosition } from './../../unitposition';
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-viewmap',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {
  map : string = '';
  pos : UnitPosition [] = [];
  constructor(private ngZone: NgZone, private service: ViewMapService) {}

  ngOnInit() {
    this.service.onNewMossa().subscribe((data) =>{
      this.ngZone.run(() => {
        this.changePosition(String(data));
      }); 
    })

    this.service.onNewMap().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));

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
        } else if(map[i][j] === '&'){
          let unitDir = this.getDir(i, j);
          if        (unitDir == 0) { // facing NORTH
            tabellaHtml += '<td><img src="assets/mulettoN.png"></td>';
          } else if (unitDir == 1) { // facing EAST
            tabellaHtml += '<td><img src="assets/mulettoE.png"></td>';
          } else if (unitDir == 2) { // facing SOUTH
            tabellaHtml += '<td><img src="assets/mulettoS.png"></td>';
          } else if (unitDir == 3) { // facing WEST
            tabellaHtml += '<td><img src="assets/mulettoO.png"></td>';
          }
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
    for (let t = 0; t < this.pos.length; t++) {
      arr[this.pos[t].posX][this.pos[t].posY] = "&";
    }
    this.map = this.getMap(arr);
  }

  getDir(x : number, y : number) {
    for (let t = 0; t < this.pos.length; t++) {
      if (this.pos[t].posX == x && this.pos[t].posY == y) {
        return this.pos[t].dir;
      }
    }
    return -1;
  }

  dirToNumber(d : string) {
    if        (d == "UP") {
      return 0;
    } else if (d == "RIGHT") {
      return 1;
    } else if (d == "DOWN") {
      return 2;
    } else if (d == "LEFT") {
      return 3;
    } else {
      return -1;
    }
  }

  changePosition(cmd : string){
    cmd = cmd.toString().replace(/(\r\n|\n|\r)/gm, "");
    let data : string[] = cmd.toString().split(",");
    for (let j = 0, i = 0; i < data.length; i= i+3, j++) {
      this.pos[j] = {posX: parseInt(data[i]), posY: parseInt(data[i+1]), dir: this.dirToNumber(data[i+2])};
    }
    this.service.requestMap();
    
  }
}
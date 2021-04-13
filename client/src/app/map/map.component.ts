import { MapService } from './../services/map.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from './../../environments/environment';
import { UnitPosition } from './../unitposition';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: string = ''; //html
  tmp : string[][] = [];
  pos: UnitPosition;
  nextPOI: string = '';
  constructor(private service: MapService, private ngZone: NgZone) {
    this.pos = {posX: environment.x, posY: environment.y, dir: 0};
   }

  ngOnInit() {
    this.service.onNewAction().subscribe((data) => {
      this.ngZone.run(() => {
        this.changePosition(String(data));

      });
    })

    this.service.onNewMap().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });
    });
    this.service.onNewPOI().subscribe((data) => {
      this.ngZone.run(() => {
        this.nextPOI = String(data);
        console.log(data);
      });
    });
  }

  getMap(map: string[][]) {
    let tabellaHtml: string = '<table>';
    for (let i = 0; i < map.length; i++) {
      tabellaHtml += '<tr>';
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === '1') {                                          // zona transitabile
          tabellaHtml += '<td><img src="assets/white.png"></td>';
        } else if (map[i][j] === '0') {                                   // zona non transitabile
          tabellaHtml += '<td><img src="assets/black.png" ></td>';
        } else if (map[i][j] === '2') {                                    // sx -> dx
          tabellaHtml += '<td><img src="assets/up.png"></td>';
        } else if (map[i][j] === '3') {                                    // up -> down
          tabellaHtml += '<td><img src="assets/dx.png"></td>';
        } else if (map[i][j] === '4') {                                    // dx -> sx
          tabellaHtml += '<td><img src="assets/down.png"></td>';
        } else if (map[i][j] === '5') {                                    // down -> up
          tabellaHtml += '<td><img src="assets/sx.png"></td>';
        } else if (map[i][j] === '&') {
          //controllare la direzione e far stampare immagine corretta
          if        (this.pos.dir == 0) { // facing NORD
            tabellaHtml += '<td><img src="assets/mulettoN.png"></td>';
          } else if (this.pos.dir == 1) { // facing EAST
            tabellaHtml += '<td><img src="assets/mulettoE.png"></td>';
          } else if (this.pos.dir == 2) { // facing SOUTH
            tabellaHtml += '<td><img src="assets/mulettoS.png"></td>';
          } else if (this.pos.dir == 3) { // facing WEST
            tabellaHtml += '<td><img src="assets/mulettoO.png"></td>';
          }
        } else if (map[i][j] == this.nextPOI) {
          tabellaHtml += '<td><img src="assets/red.png"></td>';
        } else {
          tabellaHtml += '<td style="background-color: red;">' + map[i][j] + '</td>';
        }
      }
      tabellaHtml += '</tr>';
    }
    tabellaHtml += '</table>';
    return tabellaHtml;
  }
  /*
    transform data in a string
  */
  setValues(data: string) {
    this.tmp[0] = [];
    let k = 0; //virgole
    let j = 0; //parentesi
    let i = 2;
    while (i < data.length) {
      if (data[i] === "[") {
        k = 0;
        j++;
        this.tmp[j] = [];
      } else if (data[i] === ",") {
        k++;
        i++;
      } else if (data[i] === "]") {
      } else {
        this.tmp[j][k] = data[i];
      }
      i++;
    }
    this.tmp[this.pos.posY][this.pos.posX] = this.dirToIntArray(); //metto il muletto nella mappa con la sua direzione
    
  }

  dirToIntArray() {
    if (this.pos.dir == 0) {        // facing NORD
      return "6";
    } else if (this.pos.dir == 1) { // facing EAST
      return "7";
    } else if (this.pos.dir == 2) { // facing SOUTH
      return "8";
    } else if (this.pos.dir == 3) { // facing WEST
      return "9";
    } else {                        // errore
      return "-";
    }
  }

  changePosition(mossa: string) {
    let pos : string[] = mossa.toString().split(",");
    this.pos.posX = parseInt(pos[0]);
    this.pos.posY = parseInt(pos[1]);
    this.pos.dir = parseInt(pos[2]);
    this.service.requestMap();
  }
}

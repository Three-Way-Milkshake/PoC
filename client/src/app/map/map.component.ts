import { MapService } from './../services/map.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: string = ''; //html
  posX: number = environment.x;
  posY: number = environment.y;
  dir: number = 0;
  constructor(private service: MapService, private ngZone: NgZone) { }

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
          tabellaHtml += '<td><img src="assets/dx.png"></td>';
        } else if (map[i][j] === '3') {                                    // up -> down
          tabellaHtml += '<td><img src="assets/down.png"></td>';
        } else if (map[i][j] === '4') {                                    // dx -> sx
          tabellaHtml += '<td><img src="assets/sx.png"></td>';
        } else if (map[i][j] === '5') {                                    // down -> up
          tabellaHtml += '<td><img src="assets/up.png"></td>';
        } else if (map[i][j] === '&') {
          //controllare la direzione e far stampare immagine corretta
          tabellaHtml += '<td><img src="assets/muletto.png"></td>';
        } else { //POI

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
    var arr = new Array();
    arr[0] = new Array();
    let k = 0; //virgole
    let j = 0; //parentesi
    let i = 2;
    while (i < data.length) {
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
    arr[this.posY][this.posX] = "&"; //metto il muletto nella mappa 
    this.map = this.getMap(arr);
  }

  changePosition(mossa: string) {
    let pos : string[] = mossa.toString().split(",");
    this.posX = parseInt(pos[0]);
    this.posY = parseInt(pos[1]);
    this.dir = parseInt(pos[2]);
    this.service.requestMap();
  }
}

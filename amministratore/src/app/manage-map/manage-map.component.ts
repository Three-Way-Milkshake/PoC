import { Component, OnInit } from '@angular/core';
import { ViewMapService } from '../services/view-map.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-manage-map',
  templateUrl: './manage-map.component.html',
  styleUrls: ['./manage-map.component.css']
})
export class ManageMapComponent implements OnInit {
  map : string = '';
  tmp : string[][] = [];
  constructor(private service : ViewMapService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.onNewMap().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });      
    });
  }
/*
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
        } else {           
          tabellaHtml += '<td style="background-color: red;">'+map[i][j]+'</td>';          
        }
      }
      tabellaHtml += '</tr>';
    }
    tabellaHtml += '</table>';
    return tabellaHtml;
  }
*/
  setValues(data : string) {
    
    var arr = new Array();
    arr[0] = new Array();
    this.tmp[0] = [];
    let k = 0; //virgole
    let j = 0; //parentesi
    let i = 2;
    while(i < data.length) {
      if (data[i] === "[") {
        k = 0;
        j++;
        arr[j] = new Array();
        this.tmp[j] = [];
      } else if (data[i] === ",") {
        k++;
        i++;
      } else if (data[i] === "]") {
      } else {
        arr[j][k] = data[i];
        this.tmp[j][k] = data[i];
      }
      i++; 
    }
    console.log(this.tmp);
    //this.map = this.getMap(arr);
    
  }

}

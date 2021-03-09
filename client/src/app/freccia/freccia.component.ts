import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { environment } from './../../environments/environment';
const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Component({
  selector: 'app-freccia',
  templateUrl: './freccia.component.html',
  styleUrls: ['./freccia.component.css']
})

export class FrecciaComponent implements OnInit {

  /*
  dir[0] sx
  dir[1] turnaround
  dir[2] dx
  dir[3] start/stop
  */
  dir: boolean[] = [false, false, false, false];

  constructor(private http : HttpClient, private ngZone: NgZone) {
    
  }

  onNewMessage() {
    return new Observable(observer => {
      socket.on('frecce', (msg: string) => {
        observer.next(msg);
        
      });
    });
  }

ngOnInit() {
  this.onNewMessage().subscribe((data) => {
    this.ngZone.run(() => {
      switch(data) {
        case "R":
          this.dir = [false, false, true, false];
        break;
        case "L":
          this.dir = [true, false, false, false];
          break;
        case "T":
          this.dir = [false, true, false, false];
          break;
        case "S":
          this.dir = [false, false, false, false];
          break;
        case "M":
          this.dir = [false, false, false, true];
        break;
      }
      
      });      
      console.log(data);
  });
}

}


import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from './../../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Component({
  selector: 'app-guidamanuale',
  templateUrl: './guidamanuale.component.html',
  styleUrls: ['./guidamanuale.component.css']
})
export class GuidamanualeComponent {
  stop : boolean = false;
  cmd : string = 'Start';
  constructor() { }

  movement(dir : string) {
    socket.emit(dir);
  }

  startstop() {
    if (this.stop) {
      socket.emit("stop");
      this.cmd = 'Start';
    } else {
      socket.emit("start");
      this.cmd = 'Stop';
    }
    this.stop = !this.stop;
  }

}

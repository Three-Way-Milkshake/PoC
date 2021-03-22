import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Injectable({
  providedIn: 'root'
})
export class ManualdrivingService {

  constructor() { }

  stop() {
    socket.emit("stop");
  }

  start() {
    socket.emit("start");
  }

  onMovement(dir : string){
    socket.emit(dir);
  }
}

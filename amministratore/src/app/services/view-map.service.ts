import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ViewMapService {

  constructor() { }

  onNewMap() {
    return new Observable(observer => {
      socket.on('mappa', (msg: string) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }

  onNewMossa(){
    return new Observable(observer => {
      socket.on('unit', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  requestMap() {
    socket.emit("mappa");
  }
}

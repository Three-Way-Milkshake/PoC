import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from './../environments/environment';
const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Injectable({
  providedIn: 'root'
})
export class ListataskService {

  constructor(private http: HttpClient) {
    
  }

  onGetButton() {
    return new Observable(observer => {
      socket.on('pulsante', () => {
        console.log("service mostra pulsante")
        observer.next();
      });
    });
  }
  

  onNewList() {
    return new Observable(observer => {
      socket.on('lista', (list: string) => {
        observer.next(list);
      });
    });
  }

  doneTask(){
    socket.emit("taskcompletata");
  }
}

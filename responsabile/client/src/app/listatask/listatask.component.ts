import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { environment } from './../../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Component({
  selector: 'app-listatask',
  templateUrl: './listatask.component.html',
  styleUrls: ['./listatask.component.css']
})
export class ListataskComponent implements OnInit {
  showButton : boolean = false;
  //lista : string = '';
  lista : string [] = [];

  constructor(private http: HttpClient, private ngZone: NgZone) {
    socket.on("pulsante", () => {
      this.showButton = true;
    });
  }

  ngOnInit() {
    this.onNewMessage().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });      
    });
  }

  taskCompletata() {
    socket.emit("taskcompletata");
  }

  onNewMessage() {
    return new Observable(observer => {
      socket.on('lista', (msg: string) => {
        observer.next(msg);
      });
    });
  }
/*
  setValues(data : string) {
    this.lista = '<ol>';
    let i = 0;
    for (let i = 0; i < data.length; i++) {
      this.lista += '<li>' + data[i] + '</li>';
    }
    this.lista += '</ol>';
  }
*/
  setValues(data : string) {
    this.lista = [];
    for (let i = 0; i < data.length; i++) {
      this.lista[i] = data[i];
    }
  }
  
}

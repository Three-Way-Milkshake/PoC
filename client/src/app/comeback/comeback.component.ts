import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from './../../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Component({
  selector: 'app-comeback',
  templateUrl: './comeback.component.html',
  styleUrls: ['./comeback.component.css']
})
export class ComebackComponent implements OnInit {

  constructor() {
    //service
   }



  comeBack(){
    socket.emit('comeback');
  }
}

import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Component({
  selector: 'app-startbutton',
  templateUrl: './startbutton.component.html',
  styleUrls: ['./startbutton.component.css']
})
export class StartButtonComponent  {

  constructor() {
    //service
   }



  comeBack(){
    socket.emit('comeback');
  }
}

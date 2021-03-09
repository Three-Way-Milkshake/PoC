import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from './../../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);
@Component({
  selector: 'app-cambioguida',
  templateUrl: './cambioguida.component.html',
  styleUrls: ['./cambioguida.component.css']
})
export class CambioguidaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

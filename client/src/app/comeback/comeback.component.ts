import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8080/");

@Component({
  selector: 'app-comeback',
  templateUrl: './comeback.component.html',
  styleUrls: ['./comeback.component.css']
})
export class ComebackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  comeBack(){
    socket.emit('comeback');
  }
}

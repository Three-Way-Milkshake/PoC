import { Component } from '@angular/core';
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8080/");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'responsabile';
}

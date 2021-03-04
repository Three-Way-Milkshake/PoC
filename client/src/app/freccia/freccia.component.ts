import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

const socket = io("http://127.0.0.1:8080/");

@Component({
  selector: 'app-freccia',
  templateUrl: './freccia.component.html',
  styleUrls: ['./freccia.component.css']
})

export class FrecciaComponent implements OnInit {
  dir: boolean[] = [false, false, false, false];
  isMoving : boolean = false;
  constructor(private http : HttpClient, private ngZone: NgZone) {
    
  }

  onNewMessage() {
    return new Observable(observer => {
      socket.on('frecce', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  ngOnInit() {
    this.onNewMessage().subscribe((data) => {
      this.ngZone.run(() => {
          let c = 0;
          let i = 0;
          while (i < 4) {
            if (String(data)[i] ==="0") {
             this.dir[i] = false;
             c++;
          } else {
           this.dir[i] = true;
           }
           i++;
      }
      this.isMoving = (c == 4) ? false : true;
        });      
        console.log(this.isMoving)
    });
  }
}


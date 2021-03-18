import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { ListataskService } from './../listatask.service'
//import { environment } from './../../environments/environment';



@Component({
  selector: 'app-listatask',
  templateUrl: './listatask.component.html',
  styleUrls: ['./listatask.component.css']
})
export class ListataskComponent implements OnInit {
  showButton : boolean = false;
  lista : string [] = [];

  constructor(private http: HttpClient, private service: ListataskService, private ngZone: NgZone) {}

  ngOnInit() {
    //update list
    this.service.onNewList().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });      
    });
    //show button
    this.service.onGetButton().subscribe( () =>{
      this.ngZone.run(() => {
        console.log("mostro il pulsante di task");
        this.showButton = true;
      })
    })
  }

  
  taskCompletata() {
    this.service.doneTask();
    this.showButton = false;
  }

  

  setValues(data : string) {
    this.lista = [];
    for (let i = 0; i < data.length; i++) {
      this.lista[i] = data[i];
    }
  }
  
}

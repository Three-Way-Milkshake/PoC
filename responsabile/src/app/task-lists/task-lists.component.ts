import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.css']
})
export class TaskListsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }
}

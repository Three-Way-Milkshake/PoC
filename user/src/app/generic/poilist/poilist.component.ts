import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poilist',
  templateUrl: './poilist.component.html',
  styleUrls: ['./poilist.component.css']
})
export class POIListComponent implements OnInit {
  list: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

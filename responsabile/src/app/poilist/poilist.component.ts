import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poilist',
  templateUrl: './poilist.component.html',
  styleUrls: ['./poilist.component.css']
})
export class POIListComponent implements OnInit {
  lists: string [] = ["a","b"]
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }

}

import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const mapUrl ='http://127.0.0.1:8080/map/'
@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http : HttpClient) {}
  

  

}

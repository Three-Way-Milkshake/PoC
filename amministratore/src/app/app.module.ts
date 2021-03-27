import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ViewMapComponent } from './view-map/view-map.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewMapComponent,
  ],
  imports: [
    BrowserModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

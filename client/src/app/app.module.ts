import { StartButtonComponent } from './startbutton/startbutton.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ArrowsComponent } from './arrows/arrows.component';

@NgModule({
  declarations: [
    ArrowsComponent,
    MapComponent,
    StartButtonComponent,
    TasklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

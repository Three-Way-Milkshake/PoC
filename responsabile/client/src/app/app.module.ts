import { FrecciaComponent } from './freccia/freccia.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ListataskComponent } from './listatask/listatask.component';
import { ComebackComponent } from './comeback/comeback.component';
import { GuidamanualeComponent } from './guidamanuale/guidamanuale.component';
import { CambioguidaComponent } from './cambioguida/cambioguida.component';

@NgModule({
  declarations: [
    AppComponent,
    FrecciaComponent,
    MapComponent,
    ListataskComponent,
    ComebackComponent,
    GuidamanualeComponent,
    CambioguidaComponent
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { ManageMapComponent } from './manage-map/manage-map.component';

@NgModule({
  declarations: [
    AppComponent,    
    ViewMapComponent, ManageMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

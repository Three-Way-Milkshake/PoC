import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminComponent } from './admin/admin.component';
import { GenericComponent } from './generic/generic.component';
import { ViewMapComponent } from './generic/view-map/view-map.component';
import { POIListComponent } from './generic/poilist/poilist.component';
import { PersonalAccountComponent } from './generic/personal-account/personal-account.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent,
    AdminComponent,
    GenericComponent,
    ViewMapComponent,
    POIListComponent,
    PersonalAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

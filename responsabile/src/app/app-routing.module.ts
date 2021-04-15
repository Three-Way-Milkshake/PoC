import { MapComponent } from './map/map.component';

import { POIListComponent } from './poilist/poilist.component';
import { TaskListsComponent } from './task-lists/task-lists.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'tasklists', component: TaskListsComponent },
  { path: 'map', component: MapComponent },
  { path: 'poilist', component: POIListComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*
if (loggedIn) {
  // cose comuni ad entrambi
  if (isAdmin) {
    // cose admin
  } else {
    // cose responsabile
  }
} else {
  // pagina login
}
*/
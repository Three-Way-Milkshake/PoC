
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMapComponent } from './generic/view-map/view-map.component';

const routes: Routes = [
  {
    path: 'viewmap',
    component: ViewMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

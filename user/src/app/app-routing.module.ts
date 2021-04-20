import { ManageMapComponent } from './admin/manage-map/manage-map.component';
import { PersonalAccountComponent } from './generic/personal-account/personal-account.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMapComponent } from './generic/view-map/view-map.component';
import { POIListComponent } from './generic/poilist/poilist.component';

const routes: Routes = [
  {
    path: 'viewmap',
    component: ViewMapComponent,
  },
  {
    path: 'poilist',
    component: POIListComponent,
  },
  {
    path: 'account',
    component: PersonalAccountComponent
  },
  {
    path: 'managemap',
    component: ManageMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
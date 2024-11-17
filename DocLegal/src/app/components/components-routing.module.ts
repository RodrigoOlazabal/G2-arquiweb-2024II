import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from '../services/guard.service';
import { DoclegalComponent } from './doclegal/doclegal.component';
import { CreaeditaDocComponent } from './doclegal/creaedita-doc/creaedita-doc.component';

const routes: Routes = [



  {
    path: 'doclegal',
    component: DoclegalComponent,
    children:[
      { path: 'nuevo', component: CreaeditaDocComponent },
      { path: 'ediciones/:id', component: CreaeditaDocComponent },
    ],canActivate: [GuardService],    //Validar si no hay problema
    data: { 'requiredRole': 'ADMIN' }
    //NO olvidar la validación de acuerdo a los Roles
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }

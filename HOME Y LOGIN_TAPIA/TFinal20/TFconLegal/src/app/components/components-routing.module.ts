import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreaeditaUsersComponent } from './users/creaedita-users/creaedita-users.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from '../services/guard.service';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
import { CreaeditaComponent } from './metodo-pago/creaedita/creaedita.component';
import { SuscripcionComponent } from './suscripcion/suscripcion.component';
import { CreaeditaSusComponent } from './suscripcion/creaedita-sus/creaedita-sus.component';
import { DoclegalComponent } from './doclegal/doclegal.component';
import { CreaeditaDocComponent } from './doclegal/creaedita-doc/creaedita-doc.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [

  {
    path: 'usuarios',
    component: UsersComponent,
    children:[
      { path: 'nuevo', component: CreaeditaUsersComponent },
      { path: 'ediciones/:id', component: CreaeditaUsersComponent },
    ],canActivate: [GuardService],    //Validar si no hay problema
    data: { 'requiredRole': 'ADMIN' }
    //NO olvidar la validación de acuerdo a los Roles
  },

  {
    path: 'metPago',
    component: MetodoPagoComponent,
    children:[
      { path: 'nuevo', component: CreaeditaComponent },
      { path: 'ediciones/:id', component: CreaeditaComponent },
    ],canActivate: [GuardService],    //Validar si no hay problema
    data: { 'requiredRole': 'ADMIN' }
    //NO olvidar la validación de acuerdo a los Roles
  },


  {
    path: 'suscrip',
    component: SuscripcionComponent,
    children:[
      { path: 'nuevo', component: CreaeditaSusComponent },
      { path: 'ediciones/:id', component: CreaeditaSusComponent },
    ],canActivate: [GuardService],    //Validar si no hay problema
    data: { 'requiredRole': 'ADMIN' }
    //NO olvidar la validación de acuerdo a los Roles
  },


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

  {
    path: 'reportes', component:ReportesComponent, children:[
      
    ]  //VALIDAR 
  },

  {
    path:'login',component: LoginComponent    //Validar si está bien Dejarlo por ahora  
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DoclegalComponent } from './doclegal/doclegal.component';
import { ListarDocComponent } from './doclegal/listar-doc/listar-doc.component';
import { CreaeditaDocComponent } from './doclegal/creaedita-doc/creaedita-doc.component';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [

       DoclegalComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    NgChartsModule,
  ]
})
export class ComponentsModule { }

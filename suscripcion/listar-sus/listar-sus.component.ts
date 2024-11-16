import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Suscripcion } from 'src/app/models/Suscripcion';
import { SuscripcionService } from 'src/app/services/suscripcion.service';

@Component({
  selector: 'app-listar-sus',
  templateUrl: './listar-sus.component.html',
  styleUrls: ['./listar-sus.component.css']
})
export class ListarSusComponent implements OnInit{

  dataSource: MatTableDataSource<Suscripcion> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'fechaInicio',
    'fechaFinal',
    'tipo',
    'precio',
    'Usuario',
    'accion01',
    'accion02'
  ];
  constructor(private mS: SuscripcionService) {}


  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }
  //hu3 y hu4
  eliminar(id: number){
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
      this.mS.setList(data);
      });
      });      
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

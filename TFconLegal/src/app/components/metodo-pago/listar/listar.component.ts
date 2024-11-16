import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MetodoPago } from 'src/app/models/MetodoPago';
import { MeotodoPagoService } from 'src/app/services/meotodo-pago.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{

  dataSource: MatTableDataSource<MetodoPago> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'codigo',
    'tipo',
    'Usuario',
    'accion01',
    'accion02'
  ];
  
  constructor(private mS: MeotodoPagoService) {}
  
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

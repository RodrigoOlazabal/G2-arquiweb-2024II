import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentoLegal } from 'src/app/models/DocumentoLegal';
import { DocumentolegalService } from 'src/app/services/documentolegal.service';

@Component({
  selector: 'app-listar-doc',
  templateUrl: './listar-doc.component.html',
  styleUrls: ['./listar-doc.component.css']
})
export class ListarDocComponent implements OnInit{

  dataSource: MatTableDataSource<DocumentoLegal> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'codigo',
    'tipoDocumento',
    'tituloDocumento',
    //'descripcionDocumento',   //validar no mostrar estos documentos porque puede que sean muy amplios 
    //'urlDocumento',             y esta url puede que no sea necesario mostrar
    'fechaPublicacion',
    'user',
    'accion01',
    'accion02'
  ];
  constructor(private cS: DocumentolegalService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }
  eliminar(id: number){
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
      this.cS.setList(data);
      });
      });      
  }

  filter(en: any) {     //para filtrar la info
    this.dataSource.filter = en.target.value.trim();
  }
}

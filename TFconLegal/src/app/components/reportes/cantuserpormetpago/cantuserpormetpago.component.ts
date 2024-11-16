import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MeotodoPagoService } from 'src/app/services/meotodo-pago.service';

@Component({
  selector: 'app-cantuserpormetpago',
  templateUrl: './cantuserpormetpago.component.html',
  styleUrls: ['./cantuserpormetpago.component.css']
})
export class CantuserpormetpagoComponent implements OnInit{

  barChartOptions:ChartOptions={
    responsive:true,
  };

  barChartLabels:string[] = [];
  barCharType: ChartType = 'doughnut'; //Tipo de gráfico que quieres utilizar  - bar - line
  barChartLegend=true;    //para que nos muestre la leyenda
  barChartData:ChartDataset[]=[];  //para pasar la data

  constructor(private metser:MeotodoPagoService){}

  ngOnInit(): void {
    this.metser.getCanUsuariosXmetPago().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nameTipo);
      this.barChartData=[
        {
          data:data.map(item=>item.cantidad),
          label:'Cantidad de Usuarios por método de pago'
        },
      ];
    });
  }
}

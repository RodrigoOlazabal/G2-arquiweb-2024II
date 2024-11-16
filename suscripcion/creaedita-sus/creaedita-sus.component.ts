import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Suscripcion } from 'src/app/models/Suscripcion';
import { Users } from 'src/app/models/Users';
import { SuscripcionService } from 'src/app/services/suscripcion.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-creaedita-sus',
  templateUrl: './creaedita-sus.component.html',
  styleUrls: ['./creaedita-sus.component.css']
})
export class CreaeditaSusComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  suscripcion: Suscripcion = new Suscripcion();
  mensaje: string = '';
  //hu3 y 4
  maxFecha: Date = moment().add(-1, 'days').toDate();
  edicion: boolean = false;
  id:number=0;
  listaUsuario: Users[]=[];

  tipos: { value: string; viewValue: string }[] = [   //tipos de membresia, definen las fecha fin de tu suscripcion
    { value: 'Mensual', viewValue: 'Mensual' },
    { value: 'Semestral', viewValue: 'Semestral' },
    { value: 'Anual', viewValue: 'Anual' },
  ];

  constructor(
    private mS: SuscripcionService,
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      });

    const fechaActual = moment().format('YYYY-MM-DD');


    //hu3 y hu4
    this.form = this.formBuilder.group({
      idSuscripcion: [''],
      tipoSuscripcion: ['', Validators.required],
      fechaInicio: [fechaActual],
      fechaFin: [''],
      precio: [''],
      user: ['',Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario= data;
    })

    //precio con tipo
    this.form.get('tipoSuscripcion')?.valueChanges.subscribe((tipoSeleccionado) => {
      this.actualizarPrecio(tipoSeleccionado);

      const fechaInicio = this.form.get('fechaInicio')?.value;
      const fechaExpiracion = this.calcularFechaExpiracion(tipoSeleccionado, fechaInicio);
      this.form.get('fechaFin')?.setValue(fechaExpiracion);
    });
  }

  actualizarPrecio(tipoSeleccionado: string) {
    let precio: number = 0.0;

    switch (tipoSeleccionado) {
      case 'Mensual':
        precio = 9.90;
        break;
      case 'Semestral':
        precio = 29.90;
        break;
      case 'Anual':
        precio = 49.90;
        break;
      default:
        // Puedes manejar un valor predeterminado o mostrar un mensaje de error.
        break;
    }

    this.form.get('precio')?.setValue(precio);
  }

  aceptar(): void {
    if (this.form.valid) {
      this.suscripcion.idSuscripcion = this.form.value.idSuscripcion;
      this.suscripcion.fechaInicio = this.form.value.fechaInicio;
      this.suscripcion.fechaFin = this.form.value.fechaFin;
      this.suscripcion.tipoSuscripcion = this.form.value.tipoSuscripcion;
      this.suscripcion.precio = this.form.value.precio;
      this.suscripcion.user.id = this.form.value.user;


      //inicio hu3 y 4
      if (this.edicion) {
        this.mS.update(this.suscripcion).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.suscripcion).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      //fin hu3 y 4
      this.router.navigate(['components/suscrip']); //permite llevar a la ruta deseada después de presionar el botón
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSuscripcion: new FormControl(data.idSuscripcion),
          fechaInicio: new FormControl(data.fechaInicio),
          fechaFin: new FormControl(data.fechaFin),
          tipoSuscripcion: new FormControl(data.tipoSuscripcion),
          precio: new FormControl(data.precio),
          user: new FormControl(data.user.id)
        });
         this.form.get('tipoSuscripcion')?.valueChanges.subscribe((tipoSeleccionado) => {
      this.actualizarPrecio(tipoSeleccionado);

      const fechaInicio = this.form.get('fechaInicio')?.value;
      const fechaExpiracion = this.calcularFechaExpiracion(tipoSeleccionado, fechaInicio);
      this.form.get('fechaFin')?.setValue(fechaExpiracion);
    });
      });
    }
  }

  calcularFechaExpiracion(tipoSeleccionado: string, fechaInicio: string): string {
    const fechaInicioMoment = moment(fechaInicio, 'YYYY-MM-DD');
    let fechaExpiracionMoment: moment.Moment;

    switch (tipoSeleccionado) {
      case 'Mensual':
        fechaExpiracionMoment = fechaInicioMoment.clone().add(1, 'months');
        break;
      case 'Semestral':
        fechaExpiracionMoment = fechaInicioMoment.clone().add(6, 'months');
        break;
      case 'Anual':
        fechaExpiracionMoment = fechaInicioMoment.clone().add(1, 'years');
        break;
      default:
        fechaExpiracionMoment = fechaInicioMoment;
        break;
    }

    return fechaExpiracionMoment.format('YYYY-MM-DD');
  }
}

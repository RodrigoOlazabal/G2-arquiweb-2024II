import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MetodoPago } from 'src/app/models/MetodoPago';
import { Users } from 'src/app/models/Users';
import { MeotodoPagoService } from 'src/app/services/meotodo-pago.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-creaedita',
  templateUrl: './creaedita.component.html',
  styleUrls: ['./creaedita.component.css']
})
export class CreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  metodoPago: MetodoPago = new MetodoPago();
  mensaje: string = '';

  edicion: boolean = false;
  id:number=0;
  listaUsuario: Users[]=[];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Yape', viewValue: 'Yape' },
    //{ value: 'Anual', viewValue: 'Anual' },    COLOCAR MÁS OPCIONES 
  ];

  constructor(
    private mS: MeotodoPagoService,
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

      this.form = this.formBuilder.group({
        idMetodoPago: [''],
        tipoPago: ['', Validators.required],
        user: ['',Validators.required],
      });
  
      this.uS.list().subscribe((data) => {
        this.listaUsuario= data;
      }) 

  }
  
  aceptar(): void {
    if (this.form.valid) {
      this.metodoPago.idMetodoPago = this.form.value.idMetodoPago;
      this.metodoPago.tipoPago = this.form.value.tipoPago;
      this.metodoPago.user.id = this.form.value.user;


      //inicio hu3 y 4
      if (this.edicion) {
        this.mS.update(this.metodoPago).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.metodoPago).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      //fin hu3 y 4
      this.router.navigate(['components/metPago']); //permite llevar a la ruta deseada después de presionar el botón
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
          idMetodoPago: new FormControl(data.idMetodoPago),
          tipoPago: new FormControl(data.tipoPago),
          user: new FormControl(data.user.id)
        });
      });
    }
  }
}

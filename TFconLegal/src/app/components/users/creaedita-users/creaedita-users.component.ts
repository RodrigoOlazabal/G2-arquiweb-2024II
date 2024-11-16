import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Users } from 'src/app/models/Users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-creaedita-users',
  templateUrl: './creaedita-users.component.html',
  styleUrls: ['./creaedita-users.component.css']
})
export class CreaeditaUsersComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  usuario: Users = new Users();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();   //este es especial xd -__- 
  id: number = 0;
  edicion: boolean=false;

  tipos:{ value: string; viewValue: string}[]=[
    { value:'Masculino', viewValue: 'Masculino'},
    { value:'Femenino', viewValue: 'Femenino'},
    { value:'Otros', viewValue: 'Otros'},
  ];

constructor(
    private uS:UsersService,
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

    const fechaActual = moment().format('YYYY-MM-DD');   //para obtener la fecha actual 

    this.form = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],    //Validar si queremos asignar estos campos o sino hacer el duplicado del nombre
      password: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', [Validators.required]],
      celular: ['', Validators.required],
      fechaRegistro: [fechaActual],    //Está tomando la fecha actual por default
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.id = this.form.value.id;
      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.enabled =  true;         //cada vez que se ingrese un registro el enabled va ser true
      this.usuario.nombres = this.form.value.nombres;
      this.usuario.apellidos = this.form.value.apellidos;
      this.usuario.genero = this.form.value.genero;
      this.usuario.email = this.form.value.email;
      this.usuario.dni =  this.form.value.dni;
      this.usuario.celular = this.form.value.celular;
      this.usuario.fechaRegistro = this.form.value.fechaRegistro;
      if (this.edicion) {
        this.uS.update(this.form.value.id,this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['components/usuarios']);    //OJOO con la ruta hacía donde quieres navegar, después de haber hecho el registro
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
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          enabled:new FormControl(data.enabled),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          genero: new FormControl(data.genero),
          email: new FormControl(data.email),
          dni:new FormControl(data.dni),
          celular: new FormControl(data.celular),
          fechaRegistro: new FormControl(data.fechaRegistro),
        });
      });
    }
  }

}

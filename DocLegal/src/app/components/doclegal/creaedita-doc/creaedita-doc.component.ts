import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { DocumentoLegal } from 'src/app/models/DocumentoLegal';
import { Users } from 'src/app/models/Users';
import { DocumentolegalService } from 'src/app/services/documentolegal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-creaedita-doc',
  templateUrl: './creaedita-doc.component.html',
  styleUrls: ['./creaedita-doc.component.css']
})
export class CreaeditaDocComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  doclegal: DocumentoLegal = new DocumentoLegal();
  mensaje: string = '';
  //hu3 y 4
  maxFecha: Date = moment().add(-1, 'days').toDate();
  edicion: boolean = false;
  id:number=0;
  listaUsuario: Users[]=[];
  //hu3 y 4
  tipos: { value: string; viewValue: string }[] = [     //Para poder colocar el tipo de documento 
    { value: 'Contrato', viewValue: 'Contrato' },
    { value: 'Demanda', viewValue: 'Demanda' },
    { value: 'Alegatos', viewValue: 'Alegatos' },
  ];
  constructor(
    private mS: DocumentolegalService,
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

      const fechaActual = moment().format('YYYY-MM-DD');      //POR mientras para que tome la fecha por default

      this.form = this.formBuilder.group({
        idDocumento: [''],
        tipoDocumento: ['', Validators.required],
        tituloDocumento: ['', Validators.required],
        descripcionDocumento: ['', Validators.required],
        urlDocumento: ['', Validators.required],
        fechaPublicacion: [fechaActual],    
        user: ['',Validators.required],
      });
  
      this.uS.list().subscribe((data) => {
        this.listaUsuario= data;
      })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.doclegal.idDocumento = this.form.value.idDocumento;
      this.doclegal.tipoDocumento = this.form.value.tipoDocumento;
      this.doclegal.tituloDocumento = this.form.value.tituloDocumento;
      this.doclegal.descripcionDocumento = this.form.value.descripcionDocumento;
      this.doclegal.urlDocumento = this.form.value.urlDocumento;
      this.doclegal.fechaPublicacion = this.form.value.fechaPublicacion;
      this.doclegal.user.id = this.form.value.user;

      //inicio hu3 y 4
      if (this.edicion) {
        this.mS.update(this.doclegal).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.doclegal).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      //fin hu3 y 4
      this.router.navigate(['components/doclegal']); //permite llevar a la ruta deseada después de presionar el botón
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
          idDocumento: new FormControl(data.idDocumento),
          tipoDocumento: new FormControl(data.tipoDocumento),
          tituloDocumento: new FormControl(data.tituloDocumento),
          descripcionDocumento: new FormControl(data.descripcionDocumento),
          urlDocumento: new FormControl(data.urlDocumento),
          fechaPublicacion: new FormControl(data.fechaPublicacion),
          user: new FormControl(data.user.id)
        });
      });
    }
  }

}

/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import Swal from 'sweetalert2'
// jQuery Sign $
declare let $: any;

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css'],
})
export class AgregarTareaComponent implements OnInit {
  @ViewChild('cerrarmodalcrear', { static: false }) cerrarmodalcrear: ElementRef;
  @ViewChild("myModal", { static: false }) myModal: ElementRef;
  @ViewChild('nomempresa', { static: false }) nomempresa: ElementRef;
  @ViewChild('nomasesor', { static: false }) nomasesor: ElementRef;
  @ViewChild('nomsuc', { static: false }) nomsuc: ElementRef;

  private baseURL = 'http://192.168.1.61/lum/';
  idEmp: number;
  empresa: any = [];
  sucursal: any = [];
  usuarios: any =[];
  usuarios2: any =[];
  opcionSeleccionado: string = '';
  verSeleccion: string = '';
  opcionSeleccionado2: string = '';
  verSeleccion2: string = '';
  textarea: string ='';
  vertarea: string = '';
  archivos: string[] = [];
  archivos1: string[] = [];
  nombredearchivos: any = [];
  nombredearchivos1: any = [];
  idtarea: any = [];
  idarchivo: any = [];
  fechat : String;
  nombrear ='';
  error2 = '';
  error = '';
  iddeSelectEmpresa = '';
  loginForm1: FormGroup;
  submitted1 = false;
  info = [];
  idUsuario = '';
  tipodearchivo: any = [];
  tipodearchivo1: any = [];
  config = {
    displayKey: "Nombre_Empresa", // Selecciona quese mostrara en el select
    search: true, // activa la busqueda en el select
    height: '300px', // la altura del select
    placeholder: 'Selecciona una opción', // placeholder
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se hayaron resultados!', // Texto cuando no haya resultados
    searchPlaceholder: 'Selecciona una opción', // placeholder
    searchOnKey: 'Nombre_Empresa', // define con que elemento realizaras la busqueda
    };
  public mdlSampleIsOpen: boolean = false;


  rol = '';
  sinsucursal = '';
  dprospectos = true;
  dempresas = true;
  dprospectos1 = true;
  dempresas1 = true;
  usuario: any = [];
  idequipodetrabajo = '';
  calendarioinfofinal: any = [];
  usuariosE: any = [];
  equipo: any = [];
  usuariobuscador = '';
  filtrarcot = '';
  empresasinfo: any = [''];
  empresasid: any = [];
  empresasid1: any = [];
  idempresa = '';
  claseerrorempresa = '';
  Motivo = '';
  claseerrormotivo = '';
  fechainicio = '';
  fechayhorainicial = '';
  horainicial = '';
  claseerrornot = '';
  idrecordatorio = '';
  fechafinal = '';
  horafinal = '';
  fechayhorafinal = '';
  idcolaborador = '';
  prospecto = true;
  idprospecto = '';
  idsucursal = '';
  sucursales: any = [];
  fechas: any = [];
  direccion = '';
  recordatorioinfO: any = [];
  fechastatus = true;
  fechastatus1 = true;
  clasecordinador: string = "input form-control";
  clasesel: string = "input form-control";
  clasemotivo: string = "input form-control";
  claserecor: string = "input form-control";
  clasecordinadorerror = '';
  idUsuario1 = '';
  empresanombre = '';
  nombresucursal = '';
  nombreasesor = '';
  empresaid ='';
  enviartarea = false;
  sucursal1: any = [];
  opcionSeleccionado1: string = '';
  verSeleccion1: string = '';
  sinsucursal1 = '';
  direccionp = ''

//CONTINUA TODA LA LOGICA
  constructor(private formBuilder: FormBuilder,public route: ActivatedRoute, private http: HttpClient, private router: Router, private subirarchivo: SubirarchivoService) {
    this.route.params.subscribe(parametros => {
      this.idEmp = parametros['idE'];
    });
    const info1 = localStorage.getItem('usuariolumi');
    const info2 = info1.replace("[", '').replace("]", '').replace("", '');
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"', '').replace('"', '');
    console.log(this.idUsuario);
   }

  ngOnInit() {
    this.obtenerempresa();
    this.empresas();
    this.obtenerusuario();
    this.obtenerusuario2();
    this.recordatorio();
    this.fechat = moment().format('YYYY-MM-DD');
    this.loginForm1 = this.formBuilder.group({
      select1: ['', [Validators.required]],
      select2: ['', [Validators.required]],
      select3: ['', [Validators.required]],
      tareaI: ['', [Validators.required]]
    });
    this.enviartarea = false;
  }

  get ff() {return this.loginForm1.controls;}

  empresas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'idUsuario': this.idUsuario };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasid1 = respuesta;
      });
  }

  obtenerempresa() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 11 };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresa = respuesta;
        console.log(this.empresa);
      });
  }

  obtenersucursal(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 11.1, 'idEmp': this.iddeSelectEmpresa };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucursal = respuesta;
        console.log(this.sucursal);
        if (this.sucursal == null) {
          console.log('no hay sucursales');
          this.sinsucursal = '0';
          this.opcionSeleccionado = '0';
          this.verSeleccion = '0';
        } else {
          this.sinsucursal = '';
          this.opcionSeleccionado = '';
          this.verSeleccion = '';
        }
      });
  }

  obtenersucursal1() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 11.1, 'idEmp': this.iddeSelectEmpresa };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucursal1 = respuesta;
        if (this.sucursal1== null) {
          console.log('no hay sucursales');
          this.sinsucursal1 ='0';
          this.opcionSeleccionado1 = '0';
          this.verSeleccion1 = '0';
        }else{
          this.sinsucursal1 = '';
          this.opcionSeleccionado1 = '';
          this.verSeleccion1 = '';
        }
      });
  }

  onSubmit1() {
    this.submitted1 = true;
      this.enviartarea = true;
      this.guardartarea();
  }

  obtenerusuario() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 12, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuarios = respuesta;
        console.log(this.usuarios);
      });
  }

  obtenerusuario2() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 12.1, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuarios2 = respuesta;
        console.log(this.usuarios2);
      });
  }

  guardartarea() {
    console.log(this.iddeSelectEmpresa,this.verSeleccion,this.verSeleccion2,this.vertarea,this.fechat,this.idUsuario);
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 13, 'idEmp': this.iddeSelectEmpresa, 'suc': this.verSeleccion, 'idRes': this.verSeleccion2, 'tarea': this.vertarea, 'fecha': this.fechat, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        if (this.archivos.length > 0) {
          const idtarea = respuesta.toString();
          this.servidorarchivo(idtarea, 0);
        } else {
          this.idtarea = respuesta;
          if (this.idtarea > 0 && this.idtarea != null) {
            this.inicializarcariables();
            this.ngOnInit();
            Swal.hideLoading();
            Swal.fire('Tarea agregada correctamente', '', 'success');
            this.nombredearchivos = [];
            this.archivos = [];
            this.submitted1 = false;
            setTimeout(() => {
              this.router.navigate(['/Detalle_Tareas']);
            }, 2); // Activate after 2 seconds.
          }
          else{
            this.error = 'hubo un error por favor intente de nuevo';
            setTimeout(() => {
              this.error = '';
            }, 4000);
          }
        }
      });
  }

  guardararchivo() {
    console.log(this.idtarea);
  this.nombrear=this.nombredearchivos[0]
    console.log(this.nombrear);
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 14, 'idTarea': this.idtarea, 'NameAr':this.nombrear};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.idarchivo = respuesta;
        console.log(this.idarchivo);
      });
  }

  public openModal(open: boolean): void {
    this.mdlSampleIsOpen = open;
  }
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    var selectnombremes = this.nomsuc.nativeElement;
    this.nombresucursal = selectnombremes.options[selectnombremes.selectedIndex].text;
    console.log(this.verSeleccion);
    this.infosuc();
  }

  capturar1($event, nombre) {
    this.iddeSelectEmpresa = $event;
    this.empresanombre = nombre;
    console.log(this.iddeSelectEmpresa + this.empresanombre);
    // var selectnombremes = this.nomempresa.nativeElement;
    this.obtenersucursal();
    this.obtenersucursal1();
    this.obtenerifoempresa1(this.iddeSelectEmpresa);
  }
  obtenerifoempresa1(emp){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 3, 'idEmpresa': emp};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        var arr = respuesta;
        this.direccion = arr[0].Direccion_Empresa;
        this.direccionp = arr[0].Direccion_Empresa;
      });
  }

  capturar2() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion2 = this.opcionSeleccionado2;
    var selectnombremes = this.nomasesor.nativeElement;
    this.nombreasesor = selectnombremes.options[selectnombremes.selectedIndex].text;
    console.log(this.verSeleccion2);
    // if (this.verSeleccion2 == '1') {
    // }
  }
  capturar3() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.vertarea = this.textarea;
    console.log(this.vertarea);
    // if (this.verSeleccion2 == '1') {
    // }
  }

  inicializarcariables() {
    this.archivos = [];
    this.nombredearchivos = [];
    this.tipodearchivo = [];
  }
  onFileChanged(event) {
    for  (var i =  0; i <  event.target.files.length; i++)  {
      this.archivos.push(event.target.files[i]);
      this.nombredearchivos.push(event.target.files[i].name);
      var ext= (event.target.files[i].name.substring(event.target.files[i].name.lastIndexOf('.')+1)).toLowerCase();
      this.tipodearchivo.push(ext);
  }
  // for (let index = 0; index < event.target.files[0].name.length; index++) {
  //   this.nombredearchivos.push(event.target.files[0].name[index]);
  // }
  console.log(this.nombredearchivos);
  console.log(this.archivos);
  console.log(this.tipodearchivo);
  }

  quitararchivo(i){
    this.archivos.splice(i,1);
    this.nombredearchivos.splice(i,1);
    this.tipodearchivo.splice(i,1);
    console.log(this.nombredearchivos);
    console.log(this.archivos);
    console.log(this.tipodearchivo);
    (<HTMLInputElement>document.getElementById('archivo')).value = '';
  }

  servidorarchivo(idtarea, idEmp) {
    const formData = new FormData();
    for (var i = 0; i < this.archivos.length; i++) {
      formData.append("file[]", this.archivos[i]);
    }
    formData.append('idtarea', idtarea);
    formData.append('idcita','0');
    formData.append('idEmp',idEmp);
    Swal.fire('Creando tarea');
    Swal.showLoading();
    this.subirarchivo.enviararchivo(formData).subscribe(
      resp => {
        if (resp.toString() !== '') {
          Swal.hideLoading();
          Swal.fire('Tarea agregada correctamente', '', 'success')
            .then((value) => {
              setTimeout(() => {
                this.router.navigate(['/Detalle_Tareas']);
              }, 2); // Activate after 2 seconds.
            });
          this.nombredearchivos = [];
          this.archivos = [];
          this.myForm.resetForm();
          this.submitted1 = false;
        } else {
          console.log('ocurrio un error');
          this.nombredearchivos = [];
          this.archivos = [];
        }
      },
    );
  }


  obtenerempresas() {
    if (this.idcolaborador !== '') {
      this.clasecordinador = 'input form-control';
      this.clasecordinadorerror = '';
    }
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'idUsuario': this.idcolaborador };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasid = respuesta;
      });
  }
  obtenerifoempresa() {
    this.dprospectos1 = false;
    this.idprospecto = '';
    this.idsucursal = '';
    if (this.idempresa !== '') {
      this.clasesel = 'input form-control';
      this.claseerrorempresa = '';
    }
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 3, 'idEmpresa': this.idempresa };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasinfo = respuesta;
        this.direccion = this.empresasinfo[0].Direccion_Empresa;
      });
    this.obtensucursal();
  }
  infoprospecto() {
    this.dempresas1 = false;
    this.idempresa = '';
    this.idsucursal = '0';
    if (this.idprospecto !== '') {
      this.clasesel = 'input form-control';
      this.claseerrorempresa = '';
    }
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 3, 'idEmpresa': this.idprospecto };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasinfo = respuesta;
        this.direccion = this.empresasinfo[0].Direccion_Empresa;
      });
  }
  obtensucursal() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 16, 'idEmp': this.idempresa };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucursales = respuesta;
      });
  }
  dimot(e) {
    if (this.Motivo !== '') {
      this.clasemotivo = 'input form-control';
      this.claseerrormotivo = '';
    }
    if (this.Motivo === '') {
      this.clasemotivo = 'input form-control  is-invalid';
    }
  }

  recordatorioevent() {
    // this.obtenerfechas();
    if (this.idrecordatorio !== '') {
      this.claserecor = 'input form-control';
      this.claseerrornot = '';
    }
  }
  fecha() {
    this.fechastatus = false;
    const fecha = new Date();
    const fechahoy = moment(fecha).format();
    const fechaelegida = moment(this.fechainicio + ' ' + this.horainicial).format();
    console.log(fechahoy);
    console.log(fechaelegida);
    if (fechahoy > fechaelegida) {
      this.fechayhorainicial = '';
    } else {
      this.fechayhorainicial = (moment(this.fechainicio).format('dddd DD [de] MMMM [de] YYYY')) + ' ' + this.horainicial;
    }
    this.fecha1();
  }

  fecha1() {
    this.fechastatus1 = false;
    const fechainicio = moment(this.fechainicio + ' ' + this.horainicial).format();
    const fechaelegida = moment(this.fechafinal + ' ' + this.horafinal).format();
    if (fechainicio > fechaelegida) {
      this.fechayhorafinal = '';
    } else {
      this.fechayhorafinal = (moment(this.fechafinal).format('dddd DD [de] MMMM [de] YYYY')) + ' ' + this.horafinal;
    }
    this.obtenerfechas();
  }

  obtenerfechas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = {
      'caso': 16, 'fechai': this.fechainicio, 'fechaf': this.fechafinal, 'horai': this.horainicial,
      'horaf': this.horafinal, 'idUsuario': this.idcolaborador
    };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.fechas = respuesta;
        console.log(this.fechas);
        if (this.fechas !== null) {
          Swal.hideLoading();
          Swal.fire('El colaborador no esta disponible en este horario', '', 'warning');
          this.fechayhorainicial = '';
          this.fechayhorafinal = '';
          this.fechainicio = '';
          this.horainicial = '';
          this.fechafinal = '';
          this.horafinal = '';
          this.idrecordatorio = '';
        }
      });
  }

  crearcita() {
      console.log('direccion ' + this.direccion + 'Motivo ' + this.Motivo + 'fecha i' + this.fechainicio +
        ' hora i ' + this.horainicial + 'fecha f' + this.fechafinal + ' hora f' + this.horafinal +
        'usuario' + this.idcolaborador + 'recordatorio' + this.idrecordatorio + 'empresa' + (this.idempresa || this.idprospecto));

      const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options: any = {
        'caso': 15, 'direccion': this.direccion, 'motivo': this.Motivo,
        'fechai': this.fechainicio, 'fechaf': this.fechafinal, 'horai': this.horainicial,
        'horaf': this.horafinal, 'idSO': this.opcionSeleccionado, 'idUsuario': this.opcionSeleccionado2,
        'recordatorio': this.idrecordatorio, 'idEmpresa': this.iddeSelectEmpresa,
        'idusuarioenv': this.opcionSeleccionado2
      };
      const URL: any = this.baseURL + 'calendario.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          var res = respuesta.toString();

          if (res === '0') {
            Swal.fire('El colaborador no esta disponible en este horario', '', 'warning');
          } else {

            if (this.archivos1.length > 0) {
              const idcita = respuesta.toString();
              this.servidorarchivos(idcita,this.iddeSelectEmpresa);
              setTimeout(() => {
                //this.router.navigate(['/Detalle_Tareas']);
              }, 2); // Activate after 2 seconds.
            } else {

             // this.cerrarmodalcrear.nativeElement.click();
              Swal.fire('Cita agregada correctamente', '', 'success');
              this.inicializarcariables1();
              this.cerrarmodalcrear.nativeElement.click();
              setTimeout(() => {
                //this.router.navigate(['/Detalle_Tareas']);
              }, 2); // Activate after 2 seconds.
            }

          }
        });
  }
  inicializarcariables1() {
    this.archivos1 = [];
    this.nombredearchivos1 = [];
    this.tipodearchivo1 = [];
    this.Motivo='';
    this.fechainicio = '';
    this.fechafinal = '';
    this.horainicial = '';
    this.horafinal = '';
    this.idrecordatorio ='';
    this.fechayhorainicial = '';
    this.fechayhorafinal = '';
    this.direccionp = '';
  }

  onFileChanged1(event) {
    for  (var i =  0; i <  event.target.files.length; i++)  {
      this.archivos1.push(event.target.files[i]);
      this.nombredearchivos1.push(event.target.files[i].name);
      var ext= (event.target.files[i].name.substring(event.target.files[i].name.lastIndexOf('.')+1)).toLowerCase();
      this.tipodearchivo1.push(ext);
  }
  // for (let index = 0; index < event.target.files[0].name.length; index++) {
  //   this.nombredearchivos.push(event.target.files[0].name[index]);
  // }
  console.log(this.nombredearchivos1);
  console.log(this.archivos1);
  console.log(this.tipodearchivo1);
  }

  quitararchivo1(i){
    this.archivos1.splice(i,1);
    this.nombredearchivos1.splice(i,1);
    this.tipodearchivo1.splice(i,1);
    console.log(this.nombredearchivos1);
    console.log(this.archivos1);
    console.log(this.tipodearchivo1);
    (<HTMLInputElement>document.getElementById('archivo1')).value = '';
  }


  servidorarchivos(idcita,idEmp) {
    const formData = new FormData();

    for (var i = 0; i < this.archivos1.length; i++) {
      formData.append("file[]", this.archivos1[i]);
    }
    formData.append('idcita', idcita);
    formData.append('idtarea', '0');
    formData.append('idEmp',idEmp);
    Swal.fire({
      title: 'Subiendo archivos',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading();
    this.subirarchivo.enviararchivo(formData).subscribe(
      resp => {
        if (resp.toString() !== '') {
          Swal.hideLoading();
          Swal.fire('Cita agregada correctamente', '', 'success');
          this.inicializarcariables();
          this.cerrarmodalcrear.nativeElement.click();
        } else {
          console.log('ocurrio un error');
          this.archivos1 = [];
        }
      },
    );
  }

  usuariosequipo(idEq) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 12, 'idEquipoT': idEq, 'idUsuario': this.idUsuario };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuariosE = respuesta;
        console.log(this.usuariosE);
      });
  }

  recordatorio() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 2 };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.recordatorioinfO = respuesta;
      });
  }

  openModel() {

    this.inicializarcariables1();
    console.log(this.empresanombre,this.nombreasesor,this.nombresucursal,this.direccion);

    $(this.myModal.nativeElement).modal("show");
  }
  closeModel() {
    this.myModal.nativeElement.className = "modal hide";
  }

  infosuc(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 6, 'sucursal': this.opcionSeleccionado };
    const URL: any = this.baseURL + 'check.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.direccion = respuesta[0].direccion;
      });
  }

  infosuc1(){
    if (this.opcionSeleccionado !== '0') {
      const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options: any = { 'caso': 6, 'sucursal': this.opcionSeleccionado };
      const URL: any = this.baseURL + 'check.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          this.direccion = respuesta[0].direccion;
        });
    } else {
      this.direccion = this.direccionp;
    }
  }


  @ViewChild('regForm', { static: false }) myForm: NgForm;
}



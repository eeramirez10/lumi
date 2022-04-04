import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { AuthenticationService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import { EventInput } from '@fullcalendar/core';
import * as moment from 'moment';
import Swal from 'sweetalert2'
moment.locale('es');

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @ViewChild('cerrarmodalcrear', { static: false }) cerrarmodalcrear: ElementRef;
  private baseURL = 'http://192.168.1.61/lum/';
  calendarPlugins = [dayGridPlugin, timeGridPlugin];
  calendarEvents: EventInput[] = [
    { title: '', start: '' }
  ];
  calendarioinfocitas: any = [];
  calendarioinfotareas: any = [];
  localMx = esLocale;
  info = [];
  rol = '';
  idUsuario = '';
  idUsuario1 = '';
  usuario: any = [];
  idequipodetrabajo = '';
  calendarioinfofinal: any = [];
  usuariosE : any = [];
  usuariobuscador = '';
  filtrarcot = '';
  empresasinfo: any = [''];
  empresasid: any = [];
  empresasid1: any = [];
  empresasid2: any = [];
  prospectosid: any = [];
  idempresa = '';
  claseerrorempresa = '';
  Motivo = '';
  idcita = "";
  claseerrormotivo = '';
  nombredearchivos: any = [];
  tipodearchivo: any = [];
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
  cprospecto = true;
  csuc = true;
  idprospecto = '';
  idsucursal = '';
  sucursales: any = [];
  fechas: any = [];
  direccion = '';
  archivos: string  []  =  [];
  recordatorioinfO: any = [];
  fechastatus = true;
  fechastatus1 = true;
  clasecordinador: string = "input form-control";
  clasesel: string = "input form-control";
  clasemotivo: string = "input form-control";
  claserecor: string = "input form-control";
  clasecordinadorerror = '';
  direccionprincipal = '';
  idDelSelect = '';
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
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private subirarchivo: SubirarchivoService
  ) {
    const info1 = localStorage.getItem('usuariolumi');

    const info2 = info1.replace("[", "").replace("]", "").replace("", "");

    // console.log(info1);

    this.info = info2.split(",");

    this.idUsuario = this.info[0];

    this.idUsuario1 = this.idUsuario.replace(/['"]+/g, '');

    this.rol = this.info[2];

    this.idequipodetrabajo = this.info[3];

    if (this.rol.toString() === '"1"' || this.rol.toString() === '"3"') {
      this.router.navigate(['/Sel-Perfil']);
    }
}

  ngOnInit() {
    this.calendariocitas();
    this.usuariosequipo();
    this.recordatorio();
    this.obtenerempresas();
    this.obtenerempresascoordinador();
  }

  calendariocitas(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 10, 'idEquipoT': this.idequipodetrabajo, 'idusuarioenv': this.idUsuario1};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.calendarioinfocitas = respuesta;
        if (this.calendarioinfocitas === '' || this.calendarioinfocitas === null) {
          this.calendarioinfocitas = [];
        } else {
        }
        console.log(this.calendarioinfocitas)
        this.calendariotarea();
      });
    }

  calendariotarea(){
    const idE = this.idequipodetrabajo.replace(/["']/g, "");
    console.log(idE);
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 11, 'idEquipoT': idE, 'idusuarioenv': this.idUsuario1};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.calendarioinfotareas = respuesta;
        if (this.calendarioinfotareas === '' || this.calendarioinfotareas === null) {
          this.calendarioinfotareas = [];
        } else {
        }
        console.log(this.calendarioinfotareas)
        this.calendariofinal();
      });
  }

  calendariofinal(){
    this.calendarioinfofinal = this.calendarioinfocitas.concat(this.calendarioinfotareas);
  }

  usuariosequipo(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 12, 'idEquipoT': this.idequipodetrabajo, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuariosE = respuesta;
      });
  }

  recordatorio(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 2};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.recordatorioinfO = respuesta;
      });
  }

  calendariocitasbuscador(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 13, 'idEquipoT': this.idequipodetrabajo, 'UsuarioB' : this.usuariobuscador};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        if (respuesta !== null) {
          this.calendarioinfofinal = respuesta;
        } else {
          this.calendarioinfofinal = this.calendarEvents;
        }

      });
    }

  calendariotareabuscador(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 14, 'idEquipoT': this.idequipodetrabajo, 'UsuarioB' : this.usuariobuscador};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        if (respuesta !== null) {
          this.calendarioinfofinal = respuesta;
        } else {
          this.calendarioinfofinal = this.calendarEvents;
        }

      });
  }

  filtrarporusuario(){

    if (this.usuariobuscador !== '' && this.filtrarcot !== ''){

      if (this.filtrarcot === 'cita'){
        this.calendariocitasbuscador();
      }

      if (this.filtrarcot === 'tarea'){
        this.calendariotareabuscador();
      }

    }
    if (this.usuariobuscador !== '' && this.filtrarcot === ''){

      const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
      const options: any = { 'caso': 13, 'idEquipoT': this.idequipodetrabajo, 'UsuarioB' : this.usuariobuscador, 'idusuarioenv': this.idUsuario1};
      const URL: any = this.baseURL + 'calendario.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
            this.calendarioinfocitas = respuesta;

            const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
            const options: any = { 'caso': 14, 'idEquipoT': this.idequipodetrabajo, 'UsuarioB' : this.usuariobuscador,  'idusuarioenv': this.idUsuario1};
            const URL: any = this.baseURL + 'calendario.php';
            this.http.post(URL, JSON.stringify(options), headers).subscribe(
              respuesta => {
                  this.calendarioinfotareas = respuesta;
                  if (this.calendarioinfocitas === null && this.calendarioinfotareas !== null){
                    this.calendarioinfofinal = this.calendarioinfotareas;
                  }

                  if (this.calendarioinfocitas !== null && this.calendarioinfotareas === null){
                    this.calendarioinfofinal = this.calendarioinfocitas;
                  }

                  if (this.calendarioinfocitas === null && this.calendarioinfotareas === null){
                    this.calendarioinfofinal = this.calendarEvents;
                  }

                  if (this.calendarioinfocitas !== null && this.calendarioinfotareas !== null){
                    this.calendarioinfofinal = this.calendarioinfocitas.concat(this.calendarioinfotareas);
                  }
              });
        });

    }
    if (this.usuariobuscador === '' && this.filtrarcot !== ''){

      if (this.filtrarcot === 'cita'){
        const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
        const options: any = { 'caso': 10, 'idEquipoT': this.idequipodetrabajo, 'idusuarioenv': this.idUsuario1};
        const URL: any = this.baseURL + 'calendario.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
          respuesta => {
            if (respuesta !== null) {
              this.calendarioinfofinal = respuesta;
            } else {
              this.calendarioinfofinal = this.calendarEvents;
            }
          });
      }

      if (this.filtrarcot === 'tarea'){
        const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
        const options: any = { 'caso': 11, 'idEquipoT': this.idequipodetrabajo, 'idusuarioenv': this.idUsuario1};
        const URL: any = this.baseURL + 'calendario.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
          respuesta => {
            if (respuesta !== null) {
              this.calendarioinfofinal = respuesta;
            } else {
              this.calendarioinfofinal = this.calendarEvents;
            }
          });
      }

    }
    if (this.usuariobuscador === '' && this.filtrarcot === ''){
      this.calendariocitas();
    }
    //alert(this.usuariobuscador + this.filtrarcot)
  }

  eventClicked(event) {
    this.idcita = event.event._def.publicId;
    if (this.idcita!=="") {
      this.router.navigate(["/Calendario_Cordinador/detalle_calendario/" + this.idcita]);
    }
  }

  obtenerpropectos(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 17, 'idUsuario': this.idcolaborador};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.prospectosid = respuesta;
      });
  }

  obtenerempresas(){
    this.obtenerpropectos();
    if (this.idcolaborador !== ''){
      this.clasecordinador = 'input form-control';
      this.clasecordinadorerror = '';
      this.prospecto = true;
      this.idprospecto = '';
      this.idsucursal = '';
    }

    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 1};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasid1 = respuesta;
        //this.obtenerempresascoordinador();
      });
  }
  obtenerempresascoordinador(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 19, 'idUsuario': this.idUsuario1};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasid2 = respuesta;
        this.empresasid = this.empresasid1.concat(this.empresasid2);
        console.log(this.empresasid);
      });
  }
  obtenerifoempresa($event){
    this.idDelSelect = $event;
    this.cprospecto = false;

    if (this.idempresa !== ''){
      this.clasesel = 'input form-control';
      this.claseerrorempresa = '';
    }
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 3, 'idEmpresa': this.idDelSelect};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasinfo = respuesta;
        this.direccion = this.empresasinfo[0].Direccion_Empresa;
        this.direccionprincipal = this.empresasinfo[0].Direccion_Empresa;
      });
    this.obtensucursal();
  }
  infoprospecto(){
    this.prospecto = false;
    this.idempresa = '';
    this.idsucursal = '0';
    if (this.idprospecto !== ''){
      this.clasesel = 'input form-control';
      this.claseerrorempresa = '';
    }
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 3, 'idEmpresa': this.idDelSelect};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasinfo = respuesta;
        this.direccion = this.empresasinfo[0].Direccion_Empresa;
      });
  }
  obtensucursal() {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 16, 'idEmp': this.idDelSelect};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucursales = respuesta;
        if (this.sucursales != null) {
          this.csuc = true;
        }else{
          this.csuc = false;
        }
      });
  }
  dimot(e){
    if (this.Motivo !== '') {
      this.clasemotivo = 'input form-control';
      this.claseerrormotivo = '';
    }
    if (this.Motivo === '') {
      this.clasemotivo = 'input form-control  is-invalid';
    }
  }
  onFileChanged(event){
    for  (var i =  0; i <  event.target.files.length; i++)  {
      this.archivos.push(event.target.files[i]);
      this.nombredearchivos.push(event.target.files[i].name);
      var ext = (event.target.files[i].name.substring(event.target.files[i].name.lastIndexOf('.') + 1)).toLowerCase();
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
    this.archivos.splice(i, 1);
    this.nombredearchivos.splice(i, 1);
    this.tipodearchivo.splice(i, 1);
    console.log(this.nombredearchivos);
    console.log(this.archivos);
    console.log(this.tipodearchivo);
    (<HTMLInputElement>document.getElementById('archivo')).value = '';
  }
  recordatorioevent(){
    // this.obtenerfechas();
    if (this.idrecordatorio !== ''){
      this.claserecor = 'input form-control';
      this.claseerrornot = '';
    }
  }
  fecha(){
    this.fechastatus = false;
    const fecha = new Date();
    const fechahoy = moment(fecha).format();
    const fechaelegida =  moment(this.fechainicio + ' ' + this.horainicial).format();
    console.log(fechahoy);
    console.log(fechaelegida);
    if (fechahoy > fechaelegida) {
      this.fechayhorainicial = '';
    } else {
      this.fechayhorainicial = (moment(this.fechainicio).format('dddd DD [de] MMMM [de] YYYY')) + ' ' + this.horainicial;
    }
    this.fecha1();
  }

  fecha1(){
    this.fechastatus1 = false;
    const fechainicio =  moment(this.fechainicio + ' ' + this.horainicial).format();
    const fechaelegida =  moment(this.fechafinal + ' ' + this.horafinal).format();
    if (fechainicio > fechaelegida) {
      this.fechayhorafinal = '';
    } else {
      this.fechayhorafinal = (moment(this.fechafinal).format('dddd DD [de] MMMM [de] YYYY')) + ' ' + this.horafinal;
    }
    this.obtenerfechas();
  }

  obtenerfechas(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = {
      'caso': 16, 'fechai': this.fechainicio, 'fechaf': this.fechafinal, 'horai': this.horainicial,
      'horaf': this.horafinal, 'idUsuario': this.idcolaborador};
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
  inicializarcariables(){
    this.empresasinfo = [''];
    this.idempresa = '';
    this.idrecordatorio = '';
    this.direccion = '';
    this.Motivo = '';
    this.archivos = [];
    this.nombredearchivos = [];
    this.tipodearchivo = [];
    this.claseerrormotivo = '';
    this.claseerrorempresa = '';
    this.claseerrornot = '';
    this.prospecto = true;
    this.cprospecto = true;
    this.csuc = true;
    this.idcolaborador = '';
    this.idprospecto = '';
    this.idsucursal = '';
    this.direccion = '';
    this.fechastatus = true;
    this.fechastatus1 = true;
    this.fechayhorainicial = '';
    this.fechayhorafinal = '';
    this.fechainicio = '';
    this.horainicial = '';
    this.fechafinal = '';
    this.horafinal = '';
    this.clasecordinadorerror = '';
    this.clasemotivo = 'input form-control';
    this.clasesel = 'input form-control';
    this.claserecor = 'input form-control';
    this.clasecordinador = 'input form-control';
    this.cerrarmodalcrear.nativeElement.click();
    this.direccionprincipal = '';

  }
  crearcita(){
    if (this.Motivo === '' && (this.idempresa === '' && this.idprospecto === '') && this.idrecordatorio === '' && this.idcolaborador !== ''){
      this.clasemotivo = 'input form-control is-invalid';
      this.clasesel = 'input form-control is-invalid';
      this.claseerrormotivo = 'invalid-feedback d-block';
      this.claseerrorempresa = 'invalid-feedback d-block';
      this.claserecor = 'input form-control is-invalid';
      this.claseerrornot = 'invalid-feedback d-block';
    }
    if (this.Motivo === '' && (this.idempresa !== '' || this.idprospecto !== '') && this.idrecordatorio === '' && this.idcolaborador !== ''){
      this.clasemotivo = 'input form-control is-invalid';
      this.claseerrormotivo = 'invalid-feedback d-block';
      this.claserecor = 'input form-control is-invalid';
      this.claseerrornot = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa === '' && this.idprospecto === '') && this.idrecordatorio === '' && this.idcolaborador !== ''){
      this.clasesel = 'input form-control is-invalid';
      this.claseerrorempresa = 'invalid-feedback d-block';
      this.claserecor = 'input form-control is-invalid';
      this.claseerrornot = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa !== '' || this.idprospecto !== '') && this.idrecordatorio === '' && this.idcolaborador !== ''){
      this.claserecor = 'input form-control is-invalid';
      this.claseerrornot = 'invalid-feedback d-block';
    }
    if (this.Motivo === '' && (this.idempresa === '' && this.idprospecto === '') && this.idrecordatorio !== '' && this.idcolaborador === ''){
      this.clasemotivo = 'input form-control is-invalid';
      this.clasesel = 'input form-control is-invalid';
      this.claseerrormotivo = 'invalid-feedback d-block';
      this.claseerrorempresa = 'invalid-feedback d-block';
      this.clasecordinador = 'input form-control is-invalid';
      this.clasecordinadorerror = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa === '' && this.idprospecto === '') && this.idrecordatorio !== '' && this.idcolaborador === ''){
      this.clasesel = 'input form-control is-invalid';
      this.claseerrorempresa = 'invalid-feedback d-block';
      this.clasecordinador = 'input form-control is-invalid';
      this.clasecordinadorerror = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa === '' && this.idprospecto === '') && this.idrecordatorio !== '' && this.idcolaborador !== ''){
      this.clasesel = 'input form-control is-invalid';
      this.claseerrorempresa = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa === '' && this.idprospecto === '')  && this.idrecordatorio === '' && this.idcolaborador === ''){
      this.clasesel = 'input form-control is-invalid';
      this.claseerrorempresa = 'invalid-feedback d-block';
      this.claserecor = 'input form-control is-invalid';
      this.claseerrornot = 'invalid-feedback d-block';
      this.clasecordinador = 'input form-control is-invalid';
      this.clasecordinadorerror = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa === '' && this.idprospecto === '')  && this.idrecordatorio === '' && this.idcolaborador !== ''){
      this.clasesel = 'input form-control is-invalid';
      this.claseerrorempresa = 'invalid-feedback d-block';
      this.claserecor = 'input form-control is-invalid';
      this.claseerrornot = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa === '' && this.idprospecto === '')  && this.idrecordatorio !== '' && this.idcolaborador !== ''){
      this.clasesel = 'input form-control is-invalid';
      this.claseerrorempresa = 'invalid-feedback d-block';
    }
    if (this.Motivo === '' && (this.idempresa === '' && this.idprospecto === '') && this.idrecordatorio === '' && this.idcolaborador === ''){
      this.clasemotivo = 'input form-control is-invalid';
      this.clasesel = 'input form-control is-invalid';
      this.claseerrormotivo = 'invalid-feedback d-block';
      this.claseerrorempresa = 'invalid-feedback d-block';
      this.claserecor = 'input form-control is-invalid';
      this.claseerrornot = 'invalid-feedback d-block';
      this.clasecordinador = 'input form-control is-invalid';
      this.clasecordinadorerror = 'invalid-feedback d-block';
    }
    if (this.Motivo !== '' && (this.idempresa !== '' || this.idprospecto !== '')
        && this.idrecordatorio !== '' && this.idcolaborador !== '' && this.fechayhorainicial !== ''
        && this.fechayhorafinal !== '') {
          console.log('direccion ' + this.direccion + 'Motivo ' + this.Motivo + 'fecha i' + this.fechainicio +
          ' hora i ' + this.horainicial + 'fecha f' + this.fechafinal + ' hora f' + this.horafinal +
          'usuario' + this.idcolaborador + 'recordatorio' + this.idrecordatorio + 'empresa' + (this.idempresa || this.idprospecto));

          const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
          const options: any = { 'caso': 15, 'direccion': this.direccion, 'motivo': this.Motivo,
          'fechai': this.fechainicio, 'fechaf': this.fechafinal, 'horai': this.horainicial,
          'horaf': this.horafinal, 'idSO': this.idsucursal, 'idUsuario': this.idcolaborador,
          'recordatorio': this.idrecordatorio, 'idEmpresa': (this.idDelSelect || this.idprospecto),
          'idusuarioenv' : this.idUsuario1};
          const URL: any = this.baseURL + 'calendario.php';
          this.http.post(URL, JSON.stringify(options), headers).subscribe(
            respuesta => {

              if (this.archivos.length > 0) {
                const idcita = respuesta.toString();
                this.servidorarchivo(idcita, 0);
              } else {

                this.cerrarmodalcrear.nativeElement.click();
                Swal.fire('Cita agregada correctamente', '', 'success');
                this.inicializarcariables();
                this.ngOnInit();
              }
            });
    }
  }

  servidorarchivo(idcita, idEmp) {
    const formData = new FormData();

    for  (var i =  0; i <  this.archivos.length; i++)  {
      formData.append("file[]",  this.archivos[i]);
  }
    formData.append('idcita', idcita);
    formData.append('idtarea', '0');
    formData.append('idEmp', idEmp);
    Swal.fire('Subiendo archivos');
    Swal.showLoading();
    this.subirarchivo.enviararchivo(formData).subscribe(
      resp => {
        if (resp.toString() !== '') {
          Swal.hideLoading();
          Swal.fire('Cita agregada correctamente', '', 'success');
          this.inicializarcariables();
          this.cerrarmodalcrear.nativeElement.click();
          this.ngOnInit();
        } else {
          console.log('ocurrio un error');
          this.archivos = [];
        }
      },
    );
  }

  infosuc(){
    console.log(this.idsucursal);
    if (this.idsucursal !== 'principal') {
      const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options: any = { 'caso': 6, 'sucursal': this.idsucursal };
      const URL: any = this.baseURL + 'check.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          this.direccion = respuesta[0].direccion;
        });

    } else {
      this.direccion = this.direccionprincipal;
      this.idsucursal = '0';
    }
  }

}

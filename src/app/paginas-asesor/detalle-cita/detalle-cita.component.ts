import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MapService } from 'src/app/services/map.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { GeocodingService } from 'src/app/services/geocoding.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent implements OnInit {

  @ViewChild('cerrarmodalcrear1', { static: false }) cerrarmodalcrear1: ElementRef;

  center: google.maps.LatLng;
  zoom: number;
  disableDefaultUI: boolean;
  disableDoubleClickZoom: boolean;
  mapTypeId: google.maps.MapTypeId;
  maxZoom: number;
  minZoom: number;
  styles: google.maps.MapTypeStyle[];
  position: google.maps.LatLng;
  title: string;
  content: string;
  address: string;
  warning: boolean;
  message: string;

  private baseURL = 'http://192.168.1.61/lum/'
  cita: any = [];
  citas: any = [];
  fechac
  idC = '';
  idE = '';
  fecha2 = new Date();

info = [];
idUsuario = '';
idempresa = '';
Motivo = '';
fechainicio;
fechafinal;
horainicial;
horafinal;
dia;
mes;
horaa: number;
minutoa: number;
horaa1 = '';
minutoa1 = '';
horainput = ''
horainput1 = ''
fechayhorainicial;
fechayhorafinal;
arrayfecha: any = [];
arrayfecha1: any = [];
idrecordatorio = '';
idcita = '';
direccion = ''; ;
archivofinal: any;
archivos: string  []  =  [];
nombredearchivos: any = [];
clasemotivo: string = "input form-control";
clasesel: string = "input form-control";
claserecor: string = "input form-control";
claseerrormotivo: string = '';
claseerrorempresa: string = '';
claseerrornot: string = '';
arreglodearchivosbase: any = [];
sucuO: any = [];
sucuO2: any = [];
idSO = '';
nombreSO = '';
idEmSel = '';
idSOseleccionado = '';
idSucuObraM = '';
empresabuscador = '';
empresasinfo: any = [''];
recordatorioinfO: any = [];
empresasid : any = [];
tipodearchivo: any = [];

  constructor(
    private http: HttpClient,
    public route: ActivatedRoute,
    private subirarchivo: SubirarchivoService,
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private map: MapService,
    private geolocation: GeolocationService,
    private geocoding: GeocodingService
    ) {
    this.route.params.subscribe(parametros => {
      this.idC = parametros['id_C'];
    });

    const info1 = localStorage.getItem('usuariolumi');

    const info2 = info1.replace("[", "").replace("]", "").replace("", "");

    this.info = info2.split(",");

    this.idUsuario = this.info[0];

    this.center = new google.maps.LatLng(19.0359107, -98.2276218);
    this.zoom = 16;

    // Other options.
    this.disableDefaultUI = true;
    this.disableDoubleClickZoom = false;
    this.mapTypeId = google.maps.MapTypeId.ROADMAP;
    this.maxZoom = 25;
    this.minZoom = 4;
    // Styled Maps: https://developers.google.com/maps/documentation/javascript/styling
    this.styles = [
      {
        featureType: 'landscape',
        stylers: [
          { color: '#ffffff' }
        ]
      }
    ];
    // this.address = "";
    this.warning = false;
    this.message = "";

  }


  ngOnInit(): void  {
    this.obtenercita();
    this.empresas();
    this.recordatorio();
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

  obtenercita() {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 0, 'idCitas': this.idC };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.cita = respuesta;
        this.idE = respuesta[0].idEmpresa;
        this.fechac = respuesta[0].FechaI;
        this.address = respuesta[0].Direccion;
        console.log(this.fechac);
        console.log(this.cita);
        this.obtenercitas();
        // setTimeout(() => {
        //   this.search(this.address);
        // }, 1000);
        this.search(this.address);
      });
  }

  obtenercitas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0.1, 'idCitas': this.idC, 'fecha': this.fechac, 'idEmp': this.idE };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.citas = respuesta;
      });
  }

  empresas(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 1, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasid = respuesta;
      });
  }

  obtnerinfocita(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 5, 'idCita': this.idC};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        const idemp = respuesta[0].idEmpresa;
        this.Motivo = respuesta[0].Motivo;
        this.fechainicio = respuesta[0].FechaI;
        this.horainicial = respuesta[0].HoraI;
        this.fechafinal = respuesta[0].FechaF;
        this.horafinal = respuesta[0].HoraF;
        this.idSucuObraM = respuesta[0].SucursalObra;
        this.nombreSO = respuesta[0].nombreSO;
        this.idrecordatorio = respuesta[0].Recordatorios_idRecordatorios;
        this.fechayhorainicial = (moment(this.fechainicio).format('dddd DD [de] MMMM [de] YYYY')) + ' ' + this.horainicial;

        this.fechayhorafinal = (moment(this.fechafinal).format('dddd DD [de] MMMM [de] YYYY')) + ' ' + this.horafinal;

        const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
        const options: any = { 'caso': 3, 'idEmpresa': idemp};
        const URL: any = this.baseURL + 'calendario.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
          respuesta => {
            this.empresasinfo = respuesta;
            this.direccion = this.empresasinfo[0].Direccion_Empresa;
            this.idEmSel = this.empresasinfo[0].idEmpresas;
          });
        this.obtenSucO2(idemp);
        this.obtenerinfoarchivos();
      });

  }

  obtenSucO2(idE) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 16, 'idEmp': idE};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucuO2 = respuesta;
      });
  }

  obtenerifoempresa(){
    if (this.idempresa !== ''){
      this.clasesel = 'input form-control';
      this.claseerrorempresa = '';
    }
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 3, 'idEmpresa': this.idempresa};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasinfo = respuesta;
        this.direccion = this.empresasinfo[0].Direccion_Empresa;
      });
    this.obtenSucO();

  }

  obtenSucO() {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 16, 'idEmp': this.idempresa};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucuO = respuesta;
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

  onFileChanged(event) {
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

  eliminararchivo(id){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar el archivo?',
      showCancelButton: true,
      confirmButtonColor: '#da0100',
      cancelButtonColor: '#6fb353',
      confirmButtonText: 'ELIMINAR',
      cancelButtonText: 'CANCELAR',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'Archivo eliminado.',
          'success'
        );
        const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
        const options: any = { 'caso': 7, 'idArchivo': id};
        const URL: any = this.baseURL + 'calendario.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          this.obtenerinfoarchivos();
        });
      }
    });
  }

  editarcita(){
    if (this.Motivo !== ''  && this.idrecordatorio !== '' && this.fechayhorafinal !== '' && this.fechayhorainicial !== ''){
      console.log('Motivo ' + this.Motivo + 'fecha i' + this.fechainicio +
      ' hora i ' + this.horainicial + 'fecha f' + this.fechafinal + ' hora f' + this.horafinal + 'recordatorio' + this.idrecordatorio);
      const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
      const options: any = { 'caso': 8, 'motivo': this.Motivo, 'fechai': this.fechainicio,
      'fechaf': this.fechafinal, 'horai': this.horainicial, 'horaf': this.horafinal,
      'recordatorio': this.idrecordatorio, 'idCita': this.idC, 'idSO2': this.idSucuObraM};
      const URL: any = this.baseURL + 'calendario.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {

          if (this.archivos.length > 0) {
            this.servidorarchivo1(this.idC, 0);
          } else {
            this.cerrarmodalcrear1.nativeElement.click();
            Swal.fire('Cita modificada correctamente', '', 'success');
            this.ngOnInit();
            this.inicializarcariables();
          }
        });
    }
  }

  obtenerinfoarchivos(){

    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 6, 'idCita': this.idC};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.arreglodearchivosbase = respuesta;
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
    this.idSO = '';
    this.arreglodearchivosbase = [];
    this.clasemotivo = "input form-control";
    this.clasesel = "input form-control";
    this.claserecor = "input form-control";
    this.claseerrormotivo = '';
    this.claseerrorempresa = '';
    this.claseerrornot = '';
  }

  servidorarchivo1(idcita, idEmp) {
    const formData = new FormData();

    for  (var i =  0; i <  this.archivos.length; i++)  {
      formData.append("file[]",  this.archivos[i]);
  }
    formData.append('idcita', idcita);
    formData.append('idtarea', '0');idEmp
    formData.append('idEmp', idEmp);
    Swal.fire('Modificando cita');
    Swal.showLoading();
    this.subirarchivo.enviararchivo(formData).subscribe(
      resp => {
        if (resp.toString() !== '') {
          Swal.hideLoading();
          Swal.fire('Cita modificada correctamente', '', 'success');
          this.inicializarcariables();
          this.cerrarmodalcrear1.nativeElement.click();
          this.ngOnInit();
        } else {
          console.log('ocurrio un error');
          this.archivos = [];
        }
      },
    );
  }

  fecha(){
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
    const fechainicio =  moment(this.fechainicio + ' ' + this.horainicial).format();
    const fechaelegida =  moment(this.fechafinal + ' ' + this.horafinal).format();
    if (fechainicio > fechaelegida) {
      this.fechayhorafinal = '';
    } else {
      this.fechayhorafinal = (moment(this.fechafinal).format('dddd DD [de] MMMM [de] YYYY')) + ' ' + this.horafinal;
    }

  }

  recordatorioevent(){
    if (this.idrecordatorio !== ''){
      this.claserecor = 'input form-control';
      this.claseerrornot = '';
    }
  }

  getCurrentPosition(): void {
    this.warning = false;
    this.message = "";

    if (navigator.geolocation) {
      this.geolocation.getCurrentPosition().subscribe(
        (position: Position) => {
          if (this.center.lat() != position.coords.latitude &&
            this.center.lng() != position.coords.longitude) {
            // New center object: triggers OnChanges.
            this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.zoom = 11;

            // Translates the location into address.
            this.geocoding.geocode(this.center).forEach(
              (results: google.maps.GeocoderResult[]) => {
                this.setMarker(this.center, "your locality", results[0].formatted_address);
              })
              .then(() => console.log('Geocoding service: completed.'))
              .catch((error: google.maps.GeocoderStatus) => {
                if (error === google.maps.GeocoderStatus.ZERO_RESULTS) {
                  this.message = "zero results";
                  this.warning = true;
                }
              });
          }
        },
        (error: PositionError) => {
          if (error.code > 0) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.message = 'permission denied';
                break;
              case error.POSITION_UNAVAILABLE:
                this.message = 'position unavailable';
                break;
              case error.TIMEOUT:
                this.message = 'position timeout';
                break;
            }
            this.warning = true;
          }
        },
        () => console.log('Geolocation service: completed.'));

    } else {
      this.message = "browser doesn't support geolocation";
      this.warning = true;
    }
  }

  search(address: string): void {
    if (address != "") {
      this.warning = false;
      this.message = "";
      // Converts the address into geographic coordinates.
      // Here 'forEach' resolves the promise faster than 'subscribe'.
      this.geocoding.codeAddress(address).forEach(
        (results: google.maps.GeocoderResult[]) => {
          if (!this.center.equals(results[0].geometry.location)) {
            // New center object: triggers OnChanges.
            this.center = new google.maps.LatLng(
              results[0].geometry.location.lat(),
              results[0].geometry.location.lng()
            );
            this.zoom = 18;

            this.setMarker(this.center, "search result", results[0].formatted_address);
          }
        })
        .then(() => {
          this.address = "";
          console.log('Geocoding service: completed.');
        })
        .catch((error: google.maps.GeocoderStatus) => {
          if (error === google.maps.GeocoderStatus.ZERO_RESULTS) {
            this.message = "zero results";
            this.warning = true;
          }
        });
    }
  }

  // Sets the marker & the info window.
  setMarker(latLng: google.maps.LatLng, title: string, content: string): void {
    this.map.deleteMarkers();
    // Sets the marker.
    this.position = latLng;
    this.title = title;
    // Sets the info window.
    this.content = content;
  }



}

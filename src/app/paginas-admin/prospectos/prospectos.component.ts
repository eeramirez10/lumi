import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import { EventInput } from '@fullcalendar/core';;
import * as moment from 'moment';
import Swal from 'sweetalert2';
moment.locale('es');

@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.css']
})
export class ProspectosComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lumr.dyndns.org/lum/';
  calendarPlugins = [dayGridPlugin,timeGridPlugin];
  calendarioinfo: any = [];
  localMx = esLocale;
  primerosdatos: any = [];
  calendarEvents: EventInput[] = [
    { title: '', start: '' }
  ];

  equipos: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.obtenerdatoscontador();
    this.calendario();
    this.equiposarreglo();
  }
  eventClicked(event) {
    console.log(event)
    Swal.fire({
      title:(moment(event.event.start).format('DD MMM YYYY HH:MM')) + '-' + (moment(event.event.end).format('HH:MM')) + ' \n'+
      event.event._def.title,
      confirmButtonText:'ACEPTAR'
    }

    )
  }
  obtenerdatoscontador(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 6};
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
    respuesta => {
      this.primerosdatos = respuesta;
    });
  }

  calendario(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 7};
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        if (respuesta !== null) {
          this.calendarioinfo = respuesta;
        } else {
          this.calendarioinfo = this.calendarEvents;
        }
      });
    }

  equiposarreglo(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 8};
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        if (respuesta !== null) {
          this.equipos = respuesta;
        } else {
          this.equipos = this.calendarEvents;
        }
      });
  }
}

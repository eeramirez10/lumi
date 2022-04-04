import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Chart} from 'chart.js';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-grafica1-rep-clientes',
  templateUrl: './grafica1-rep-clientes.component.html',
  styleUrls: ['./grafica1-rep-clientes.component.css']
})
export class Grafica1RepClientesComponent implements OnInit {
  private baseURL = "http://192.168.1.61/lumr.dyndns.org/lum/";
  chart:any;
  contadordevisita = '';
  datos: any = [];
  colores: any = [];
  nombres: any = [];
  idempresas: any = [];
  buscadorpormes = '';
  primerdia = '';
  ultimodia = '';
  fechafiltro = '';
  fechafiltro1 = '';

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenernumerodevistas();
  }

  obtenernumerodevistas(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0,'mes': this.buscadorpormes,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1 };
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.contadordevisita = respuesta.toString();
      });
      this.obtenernombres();
  }

  obtenernombres(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 3,'mes': this.buscadorpormes,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1 };
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.nombres = respuesta;
        this.obtenerdatos();
      });
  }

  obtenerdatos(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1,'mes': this.buscadorpormes,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1 };
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.datos = respuesta;
        this.obtenercolores();
      });
  }

  obtenercolores(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 2,'mes': this.buscadorpormes,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1 };
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.colores = respuesta;
        this.grafica();
        this.obteneridempresas();
      });
  }

  obteneridempresas(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 4,'mes': this.buscadorpormes,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1 };
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.idempresas = respuesta;
      });
  }

  grafica(){

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: this.nombres,
        datasets: [
          {
            // backgroundColor: this.colores,
            // borderColor: this.colores,
            backgroundColor: 'rgba(255, 216, 0)',
            borderColor: 'rgba(255, 216, 0)',
            data: this.datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'bottom',
          labels: {
            // fontSize: 15,
            // fontStyle: 'normal',
            // padding: 30,
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          // callbacks: {
          //   label: function(tooltipItem, data) {
          //     return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
          //   }
          // },
        },

      },
    });

  }

  filtrarpormes() {
    this.fechafiltro = '';
    this.fechafiltro1 = '';
    var fecha = '2020-'+this.buscadorpormes+'-01';
    this.primerdia = moment(fecha).startOf('month').format("YYYY-MM-DD");
    this.ultimodia = moment(fecha).endOf("month").format("YYYY-MM-DD");
    document.getElementById('fecha').setAttribute('min', this.primerdia);
    document.getElementById('fecha').setAttribute('max', this.ultimodia);
    document.getElementById('fecha1').setAttribute('min', this.primerdia);
    document.getElementById('fecha1').setAttribute('max', this.ultimodia);

    this.chart.destroy();
    this.obtenernumerodevistas();
  }

  filtroporrango(){
    if (this.fechafiltro !== '' && this.fechafiltro1 !=='') {
      this.chart.destroy();
      this.obtenernumerodevistas();
    }
  }

  infografica(evt: any) {

    var data = this.chart.getElementsAtEvent(evt);
    const sel = data[0]._index;
    const idemp = this.idempresas[sel];
    this.router.navigate(['/Rclientes_Admin/Detalle_Grafica/' + idemp]);
    console.log(idemp);
  }

}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {Chart} from 'chart.js';

@Component({
  selector: 'app-detalle-grafica-rep-clientes',
  templateUrl: './detalle-grafica-rep-clientes.component.html',
  styleUrls: ['./detalle-grafica-rep-clientes.component.css']
})
export class DetalleGraficaRepClientesComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lum/';
idempresa:number;
empresa: any =[];
contadordevisita = '';
contadordevisita1 = '';
visitas: any =[];
visitasxmes: any = [];
chart:any;
messel = '';

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
    ) {
    this.route.params.subscribe(parametros => {
      this.idempresa = parametros['idEmp'];
    });
   }

  ngOnInit() {
    this.empresas();
    this.obtenernumerodevistas('');
    this.obtenervisitas('');
    this.obtenervisitasxmes();
  }

  empresas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'idEmp': this.idempresa };
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresa = respuesta;
        console.log(this.empresa);
      });
  }

  obtenernumerodevistas(mes){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 5,'empresa':this.idempresa,'mes': mes};
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.contadordevisita = respuesta.toString();
        this.contadordevisita1 = respuesta.toString();
      });
  }

  obtenernumerodevistas1(mes){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 5,'empresa':this.idempresa,'mes': mes};
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.contadordevisita1 = respuesta.toString();
      });
  }

  obtenervisitas(mes){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 6,'empresa':this.idempresa,'mes': mes };
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.visitas = respuesta;
        console.log(this.visitas);
      });
  }

  obtenervisitasxmes(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 7,'empresa':this.idempresa };
    const URL: any = this.baseURL + 'graficasadministrador.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.visitasxmes = respuesta;
        this.grafica();
      });
  }

  grafica(){
    var densityData = [0,5,4,3,5,7,8,7,4,4,7,20];

    this.chart = new Chart('canvas', {
      type: 'horizontalBar',
      data: {
        labels: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"],
        datasets: [{
          label: '',
          data: this.visitasxmes,
          backgroundColor: [
            'rgba(111, 172, 83, 1)',
            'rgba(247, 224, 13, 1)',
            'rgba(222, 145, 47, 1)',
            'rgba(55, 167, 156, 1)',
            'rgba(255, 191, 166, 1)',
            'rgba(102, 168, 222, 1)',
            'rgba(203, 34, 40, 1)',
            'rgba(63, 63, 191, 1)',
            'rgba(221, 115, 207, .67)',
            'rgba(159, 69, 211, 1)',
            'rgba(51, 233, 167, 1)',
            'rgba(222, 16, 27, 0.38)',

          ],
          borderColor: [
            'rgba(111, 172, 83, 1)',
            'rgba(247, 224, 13, 1)',
            'rgba(222, 145, 47, 1)',
            'rgba(55, 167, 156, 1)',
            'rgba(255, 191, 166, 1)',
            'rgba(102, 168, 222, 1)',
            'rgba(203, 34, 40, 1)',
            'rgba(63, 63, 191, 1)',
            'rgba(221, 115, 207, .67)',
            'rgba(159, 69, 211, 1)',
            'rgba(51, 233, 167, 1)',
            'rgba(222, 16, 27, 0.38)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: false
        },
        legend: {
          display:false
        },
        label:{
          display: false
        },

        scales: {
          yAxes: [{
          }],
          xAxes: [{
           gridLines: {
            zeroLineWidth:0,
            zeroLineColor:'rgba(166, 197, 212, 1)'
        }
       }]
      },


      },


    });

  }

  infografica(evt: any) {

    var meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    var mes = ["01","02","03","04","05","06","07","08","09","10","11","12"];

    var data = this.chart.getElementsAtEvent(evt);
    const sel = data[0]._index;
    const mesn = mes[sel];
    this.messel = meses[sel]+ ' / ';
    this.obtenernumerodevistas1(mesn);
    this.obtenervisitas(mesn);
    console.log(mesn);
  }
}

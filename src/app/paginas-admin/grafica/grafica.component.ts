import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chart } from 'chart.js';
import * as moment from 'moment';
moment.locale('es');



@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaaComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lumr.dyndns.org/lum/';
  chart:any;
  idE: '';
  empresasany: any = [];
  idempresasany: any = [];
  citasany: any = [];
  tareasany: any = [];
  messelect = '';
  mesnombre = '';
  diaselect = '';
  verdia = true;
  returnUrl = '';
  idempresa = 1;
  empsel = '';
  @ViewChild('nommes', { static: false }) nommes: ElementRef;
  @ViewChild('abrirmodal', { static: false }) abrirmodal: ElementRef;
  usuariosE : any = [];
  info = [];
  idUsuario = '';
  usuariobuscador = '';
  primerdia = '';
  ultimodia = '';
  fechafiltro = '';
  fechafiltro1 = '';

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
    ) {
      this.route.params.subscribe(parametros => {
        this.idE = parametros['idEqui'];
        const info1 = localStorage.getItem('usuariolumi');

        const info2 = info1.replace("[", "").replace("]", "").replace("", "");

        this.info = info2.split(",");

        this.idUsuario = this.info[0];
        });
  }

  ngOnInit() {
    this.empresas();
    this.idempresas();
    this.usuariosequipo();
  }

  empresas(){
    this.diaselect = '';
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 0, 'idEquipoT': this.idE};
    const URL: any = this.baseURL + 'graficas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasany = respuesta;
        if (this.messelect === '') {
          this.datoscitas();
        } else {
          this.datoscitasmes();
        }

      });
    }

    idempresas(){
      const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
      const options: any = { 'caso': 5, 'idEquipoT': this.idE};
      const URL: any = this.baseURL + 'graficas.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          this.idempresasany = respuesta;
        });
      }

    datoscitas(){

      const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
      const options: any = { 'caso': 1, 'idEquipoT': this.idE,'idUsuario':this.usuariobuscador,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1 };
      const URL: any = this.baseURL + 'graficas.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          this.citasany = respuesta;
          this.datostareas();
        });

    }

    datostareas(){

      const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
      const options: any = { 'caso': 2, 'idEquipoT': this.idE,'idUsuario':this.usuariobuscador,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1 };
      const URL: any = this.baseURL + 'graficas.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          this.tareasany = respuesta;
          this.grafica();
        });

    }


  grafica(){

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.empresasany,
        datasets: [
          {
            label: 'Citas',
            data: this.citasany,
            backgroundColor: 'rgba(7,19,143)',
            borderColor: 'rgba(7,19,143)'
          },
          {
            label: 'Tareas',
            data: this.tareasany,
            backgroundColor: 'rgba(41,171,226)',
            borderColor: 'rgba(41,171,226)'
          }
        ]
      },
      options: {
        legend: {
          display: true,
          labels: {
            fontSize: 25,
            fontStyle: 'normal',
          }
        },
        scales: {
          yAxes: [{
              ticks: {
               fontSize: 25,
               fontStyle: 'normal',
               beginAtZero:true,
               lineWidth: 1,
               precision:0
              },
              gridLines: {
                zeroLineWidth:5,
                zeroLineColor:'rgba(128,128,128)'
            }
          }],
          xAxes: [{
           ticks: {
            autoSkip: false
           },
           gridLines: {
            zeroLineWidth:5,
            zeroLineColor:'rgba(128,128,128)'
        }
       }]
      },
      }
    });

  }

  valorselectmes(evt){
    this.chart.destroy();
    this.citasany = [];
    this.tareasany = [];
    this.fechafiltro = '';
    this.fechafiltro1 = '';
    var fecha = '2020-'+this.messelect+'-01';
    this.primerdia = moment(fecha).startOf('month').format("YYYY-MM-DD");
    this.ultimodia = moment(fecha).endOf("month").format("YYYY-MM-DD");
    document.getElementById('fecha').setAttribute('min', this.primerdia);
    document.getElementById('fecha').setAttribute('max', this.ultimodia);
    document.getElementById('fecha1').setAttribute('min', this.primerdia);
    document.getElementById('fecha1').setAttribute('max', this.ultimodia);
    if (this.messelect !== '') {
      this.diaselect = '';
      this.verdia = false;
      var selectnombremes = this.nommes.nativeElement;
      this.mesnombre = selectnombremes.options[selectnombremes.selectedIndex].text;
      if (this.usuariobuscador !== '') {

        const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
        const options: any = { 'caso': 30, 'idEquipoT': this.idE,'idUsuario':this.usuariobuscador};
        const URL: any = this.baseURL + 'graficas.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
          respuesta => {
            this.empresasany = respuesta;
            this.datoscitasmes();
        });

      } else {
        this.datoscitasmes();
      }

    }else{
      this.diaselect = '';
      this.verdia = true;
      this.datoscitas();
    }
  }

  valorselectdia(evt){
    this.chart.destroy();
    this.datoscitasmes();
  }

  datoscitasmes(){

    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 3, 'idEquipoT': this.idE,'mes': this.messelect,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1,'idUsuario':this.usuariobuscador};
    const URL: any = this.baseURL + 'graficas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.citasany = respuesta;
        this.datostareasmes();
      });

  }

  datostareasmes(){

    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 4, 'idEquipoT': this.idE,'mes': this.messelect,'fecha': this.fechafiltro,'fecha1':this.fechafiltro1,'idUsuario':this.usuariobuscador};
    const URL: any = this.baseURL + 'graficas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareasany = respuesta;
        this.grafica();
      });

  }

  infografica(evt: any) {

    var data = this.chart.getElementsAtEvent(evt);
    const sel = data[0]._index;
    var emp ='';
    for (let i = 0; i < this.idempresasany.length; i++) {

      emp =this.idempresasany[sel];

    }

    if (emp !== '') {
      this.empsel = emp;
      // this.abrirmodal.nativeElement.click();
      console.log(emp);
    }

    // if (sel === '') {
    //   this.abrirmodal.nativeElement.click();
    // } else {
    //   this.abrirmodal.nativeElement.click();
    // }

    // if (sel === 0) {
    //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Reportes_coordinador/detalle_colaborador/' + this.idE + '/' + this.idempresa+'/0';
    //   this.router.navigate([this.returnUrl]);
    // }
    // if (sel === 1) {
    //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Reportes_coordinador/detalle_colaborador/' + this.idE + '/' + this.idempresa +'/1';
    //   this.router.navigate([this.returnUrl]);
    // }

  }

  prueba(){
    // this.abrirmodal.nativeElement.click();
  }

  usuariosequipo(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 12, 'idEquipoT': this.idE, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuariosE = respuesta;
      });
  }

  filtrarporusuario(){
    this.diaselect = '';
    this.chart.destroy();
    if (this.usuariobuscador === '') {
      this.empresas();
    } else {
      const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
      const options: any = { 'caso': 30, 'idEquipoT': this.idE,'idUsuario':this.usuariobuscador};
      const URL: any = this.baseURL + 'graficas.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          this.empresasany = respuesta;
          if (this.messelect === '') {
            this.datoscitas();
          } else {
            this.datoscitasmes();
          }
      });
    }

  }

  filtroporrango(){
    if (this.fechafiltro !== '' && this.fechafiltro1 !=='') {
      this.chart.destroy();
      if (this.messelect = '') {
        this.datoscitas();
      }else{
        this.datoscitasmes();
      }
    } else {

    }
  }


}

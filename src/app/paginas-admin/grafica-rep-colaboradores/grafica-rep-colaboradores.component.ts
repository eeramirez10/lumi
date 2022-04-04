import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-grafica-rep-colaboradores',
  templateUrl: './grafica-rep-colaboradores.component.html',
  styleUrls: ['./grafica-rep-colaboradores.component.css']
})
export class GraficaRepColaboradoresComponent implements OnInit {
  private baseURL = "http://192.168.1.61/lumr.dyndns.org/lum/";
  chart:any;
  chart1:any;
  chart2:any;
  chart3:any;
  chart4:any;
  chart5:any;
  chart6:any;
  chart7:any;
  chart8:any;
  chart9:any;
  chart10:any;
  chart11:any;
  idEq = '';
  infousu: any = [];
  ver = false;
  ver1 = false;
  ver2 = false;
  ver3 = false;
  ver4 = false;
  ver5 = false;
  ver6 = false;
  ver7 = false;
  ver8 = false;
  ver9 = false;
  ver10 = false;
  ver11 = false;
  actividad = '';
  filtromes = false;
  messel = '';
  usuariosE : any = [];
  idUsuario = '';
  info = [];
  idUsu = '';


  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe((parametros) => {
      this.idUsu = parametros["idUs"];
    });
   }

  ngOnInit() {
    this.obtenerinfouser();
    this.llamargraficas(1,2,3,4,5,6,7,8,9,10,11,12);
  }

  llamargraficas(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12){
    this.infograficaene(c1);
    this.infograficafeb(c2);
    this.infograficamar(c3);
    this.infograficaabr(c4);
    this.infograficamay(c5);
    this.infograficajun(c6);
    this.infograficajul(c7);
    this.infograficaago(c8);
    this.infograficasep(c9);
    this.infograficaoct(c10);
    this.infograficanov(c11);
    this.infograficadic(c12);
  }

  obtenerinfouser() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 0, 'idUsuario': this.idUsu};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.infousu = respuesta;
      });
  }

  infograficaene(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver = true;
          this.grafica(respuesta);
        }
      });
  }

  infograficafeb(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver1 = true;
          this.grafica1(respuesta);
        }
      });
  }

  infograficamar(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver2 = true;
          this.grafica2(respuesta);
        }
      });
  }

  infograficaabr(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver3 = true;
          this.grafica3(respuesta);
        }
      });
  }

  infograficamay(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver4 = true;
          this.grafica4(respuesta);
        }
      });
  }

  infograficajun(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver5 = true;
          this.grafica5(respuesta);
        }
      });
  }

  infograficajul(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver6 = true;
          this.grafica6(respuesta);
        }
      });
  }

  infograficaago(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver7 = true;
          this.grafica7(respuesta);
        }
      });
  }

  infograficasep(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver8 = true;
          this.grafica8(respuesta);
        }
      });
  }

  infograficaoct(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver9 = true;
          this.grafica9(respuesta);
        }
      });
  }

  infograficanov(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver10 = true;
          this.grafica10(respuesta);
        }
      });
  }

  infograficadic(caso) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: caso, 'idUsuario': this.idUsu, 'act' : this.actividad};
    const URL: any = this.baseURL + "graficasadministradorgeneral.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (respuesta != null) {
          this.ver11 = true;
          this.grafica11(respuesta);
        }
      });
  }

  grafica(datos){

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica1(datos){

    this.chart1 = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica2(datos){

    this.chart2 = new Chart('canvas2', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica3(datos){

    this.chart3 = new Chart('canvas3', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica4(datos){

    this.chart4 = new Chart('canvas4', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica5(datos){

    this.chart5 = new Chart('canvas5', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica6(datos){

    this.chart6 = new Chart('canvas6', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica7(datos){

    this.chart7 = new Chart('canvas7', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica8(datos){

    this.chart8 = new Chart('canvas8', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica9(datos){

    this.chart9 = new Chart('canvas9', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica10(datos){

    this.chart10 = new Chart('canvas10', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  grafica11(datos){

    this.chart11 = new Chart('canvas11', {
      type: 'pie',
      data: {
        labels: ["COMPLETADAS", "NO COMPLETADAS"],
        datasets: [
          {
            backgroundColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            borderColor: ['rgba(7, 19, 143)','rgba(255, 216, 0)'],
            data: datos,

          },
        ]
      },
      options:{
        maintainAspectRatio: true,
        legend: {
          position: 'top',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
        }
        },

		animation: {
			animateScale: true,
			animateRotate: true
		},
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          },
        },

      },
    });

  }

  valorselectact(evt){
    if (this.chart){
      this.chart.destroy();
    }
    if (this.chart1){
      this.chart1.destroy();
    }
    if (this.chart2){
      this.chart2.destroy();
    }
    if (this.chart3){
      this.chart3.destroy();
    }
    if (this.chart4){
      this.chart4.destroy();
    }
    if (this.chart5){
      this.chart5.destroy();
    }
    if (this.chart6){
      this.chart6.destroy();
    }
    if (this.chart7){
      this.chart7.destroy();
    }
    if (this.chart8){
      this.chart8.destroy();
    }
    if (this.chart9){
      this.chart9.destroy();
    }
    if (this.chart10){
      this.chart10.destroy();
    }
    if (this.chart11){
      this.chart11.destroy();
    }
      this.llamargraficas(1,2,3,4,5,6,7,8,9,10,11,12);
  }

  valorselectmes(){
    if (this.messel === '0') {
      if (this.actividad === '' || this.actividad === ''){
        this.llamargraficas(1,2,3,4,5,6,7,8,9,10,11,12);
      }else{
        this.llamargraficas(1,2,3,4,5,6,7,8,9,10,11,12);
      }
    } else {
      if (this.actividad === '' || this.actividad === ''){
        this.llamargraficas(1,2,3,4,5,6,7,8,9,10,11,12);
      }else{
        this.llamargraficas(1,2,3,4,5,6,7,8,9,10,11,12);
      }
    }
  }

}


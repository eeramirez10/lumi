import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ctareas',
  templateUrl: './ctareas.component.html',
  styleUrls: ['./ctareas.component.css']
})
export class CtareasComponent implements OnInit {

  private baseURL = "http://192.168.1.61/lum/";
  tarea: any = [];
  tarea2: any = [];
  tarea3: any = [];
  empresa: any = [];
  idEmp: number;
  lider: any = [];
  equipo: any = [];
  idequipo:number;
  idUsuario = "";
  fecha = "";
  fecha2 = "";
  fecha3 = "";
  fecha4 = "";
  info = [];
  usuario: any = [];
  vista = 1;
  vista2 = 1;
  vista3 = 1;
  // Seleccionamos o iniciamos el valor '0' del <select>
  filtrofecha: string = "0";
  filtropersona: string = "0";
  filtroempresa: string = "0";
  filtroequipo: string = "0";

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe((parametros) => {
      this.idEmp = parametros["idE"];
    });
    const info1 = localStorage.getItem("usuariolumi");
    const info2 = info1.replace("[", "").replace("]", "").replace("", "");
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"', "").replace('"', "");
    console.log(this.idUsuario);
  }

  p: number = 1;
  p2: number = 1;
  p3: number = 1;

  ngOnInit() {

    this.fecha = moment().format("YYYY-MM-DD");
    this.fecha3 = moment().subtract(7, "d").format("YYYY-MM-DD");
    this.fecha2 = moment().subtract(1, 'months').format("YYYY-MM-DD");
    this.fecha4 = moment().subtract(2, 'months').format("YYYY-MM-DD");

    this.obtenertarea1();
    this.obtenertarea2();
    this.obtenertarea3();
    this.obtenerempresa();
    this.obteneridequipo(this.idUsuario);
    this.vista = 1;
    this.vista2 = 1;
    this.vista3 = 1;
  }

  obteneridequipo(idU) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0, 'idUsuario': idU };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.lider = respuesta;
        this.idequipo = this.lider[0].Equipos_idEquipos;
        this.obtenerintegrantes(this.idequipo);
        console.log(this.idequipo);
      });
  }
  obtenerintegrantes(idE) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 3, 'idEquipo': idE, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.equipo = respuesta;
        console.log(this.equipo);
      });
  }
  obtenerempresa() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 11 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.empresa = respuesta;
        console.log(this.empresa);
      });
  }

  obtenertarea1() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 2 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      });
  }
  obtenertarea2() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 3 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
  }
  obtenertarea3() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 4 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }

  //obtener tareas por empresa (pendientes,finalizadas, canceladas)
  obtenertareae1() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 17, 'idEmp': this.filtroempresa };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      });
  }
  obtenertareae2() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 18, 'idEmp': this.filtroempresa };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
  }
  obtenertareae3() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 19, 'idEmp': this.filtroempresa };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }
  //obtener hoy (pendientes,finalizadas, canceladas)
  obtenertareahoy() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 5, 'fecha': this.fecha };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      })
  }
  obtenertareahoy_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 5.1, 'fecha': this.fecha, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
  }
  obtenertareahoy_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 5.2, 'fecha': this.fecha, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }
  //obtener tarea hace 1 mes (pendientes,finalizadas, canceladas)
  obtenertareames() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6, 'fecha': this.fecha, 'fecha2': this.fecha2 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      });
  }
  obtenertareames_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.1, 'fecha': this.fecha, 'fecha2': this.fecha2 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
  }
  obtenertareames_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.2, 'fecha': this.fecha, 'fecha2': this.fecha2 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }
  //obtener tarea hace 2 mes (pendientes,finalizadas, canceladas)
  obtenertarea2meses() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6, 'fecha': this.fecha, 'fecha2': this.fecha4 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      });
  }
  obtenertarea2meses_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.1, 'fecha': this.fecha, 'fecha2': this.fecha4 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
  }
  obtenertarea2meses_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.2, 'fecha': this.fecha, 'fecha2': this.fecha4 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }
  //obtener hace una semana (pendientes,finalizadas, canceladas)
  obtenertareasemana() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 7,
      'fecha': this.fecha,
      'fecha2': this.fecha3
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      });
  }
  obtenertareasemana_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 7.1,
      'fecha': this.fecha,
      'fecha2': this.fecha3
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
  }
  obtenertareasemana_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 7.2,
      'fecha': this.fecha,
      'fecha2': this.fecha3
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }
  //obtener para mi (pendientes,finalizadas, canceladas)
  obtenertareaparami() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 8, 'idUs': this.filtropersona };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      });
  }
  obtenertareaparami_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 8.1, 'idUs': this.filtropersona };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2==null) {
          this.tarea2 = [];
          console.log(this.tarea2);
       }
      });
  }
  obtenertareaparami_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 8.2, 'idUs': this.filtropersona };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }
  //obtener para otro (pendientes,finalizadas, canceladas)
  obtenertareaparaotro() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 9, 'idUs': this.idequipo };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }
      });
  }
  obtenertareaparaotro_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 9.1, 'idUs': this.idequipo };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });

  }
  obtenertareaparaotro_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 9.2, 'idUs': this.idequipo };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
  }

//filtros combinados
  obtenertareahoyusuario() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 20, 'fecha': this.fecha,'idUs':this.filtropersona };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        });
    }
  obtenertareahoyusuario_f() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 21, 'fecha': this.fecha,'idUs':this.filtropersona };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        });
    }
  obtenertareahoyusuario_c() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 22, 'fecha': this.fecha,'idUs':this.filtropersona };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        });
    }
    obtenertareahoyempresa() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 23, 'fecha': this.fecha,'idEmp':this.filtroempresa };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        });
    }
    obtenertareahoyempresa_f() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 24, 'fecha': this.fecha,'idEmp':this.filtroempresa };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        });
    }
    obtenertareahoyempresa_c() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 25, 'fecha': this.fecha,'idEmp':this.filtroempresa };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        });
    }
    obtenertareahoyEquipo() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 26, 'fecha': this.fecha,'idUs': this.idequipo };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        });
    }
    obtenertareahoyEquipo_f() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 27, 'fecha': this.fecha,'idUs': this.idequipo };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        });
    }
    obtenertareahoyEquipo_c() {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 28, 'fecha': this.fecha,'idUs': this.idequipo };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyPersonaEmpresa(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 29, 'fecha': this.fecha,'idUs': this.filtropersona,'idEmp':this.filtroempresa };
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyPersonaEmpresa_f(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 30, 'fecha': this.fecha,'idUs': this.filtropersona,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyPersonaEmpresa_c(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 31, 'fecha': this.fecha,'idUs': this.filtropersona,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyPersonaEquipo(){
       const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {caso:32,'fecha': this.fecha,'idUs': this.filtropersona,'idRes':this.idequipo};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyPersonaEquipo_f(){
       const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {caso:33,'fecha': this.fecha,'idUs': this.filtropersona,'idRes':this.idequipo};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyPersonaEquipo_c(){
       const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso:34,'fecha': this.fecha,'idUs': this.filtropersona,'idRes':this.idequipo};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyEmpresaEquipo(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {caso:35, 'fecha':this.fecha,'idUs':this.idequipo,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyEmpresaEquipo_f(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso:36, 'fecha':this.fecha,'idUs':this.idequipo,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyEmpresaEquipo_c(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso:37, 'fecha':this.fecha,'idUs':this.idequipo,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyEmpresaPersonaEquipo(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {caso:38,'fecha':this.fecha,'idRes':this.idequipo,'idUs':this.filtropersona,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyEmpresaPersonaEquipo_f(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {caso:39,'fecha':this.fecha,'idRes':this.idequipo,'idUs':this.filtropersona,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }
    obtenerhoyEmpresaPersonaEquipo_c(){
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {caso:40,'fecha':this.fecha,'idRes':this.idequipo,'idUs':this.filtropersona,'idEmp':this.filtroempresa};
      const URL: any = this.baseURL + "detalle_cita1.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
      });
    }

  //filtro semana conbinado con los otros 3 filtros
obtenertareaSemanaUsuario(status,fecha1,fecha2) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 41,
      'fecha': fecha1,
      'fecha2': fecha2,
      'idUs':this.filtropersona,
      'status':status
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
obtenertareaSemanaEmpresa(status,fecha1,fecha2) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 42,
      'fecha': fecha1,
      'fecha2': fecha2,
      'idEmp':this.filtroempresa,
      'status':status
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
obtenertareaSemanaEquipo(status,fecha1,fecha2) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 43,
      'fecha': fecha1,
      'fecha2': fecha2,
      'idRes':this.idequipo,
      'status':status
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
obtenertareaSemanaPersonaEmpresa(status,fecha1,fecha2) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 44,
      'fecha': fecha1,
      'fecha2': fecha2,
      'idUs':this.filtropersona,
      'idEmp':this.filtroempresa,
      'status':status
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
obtenertareaSemanaPersonaEquipo(status,fecha1,fecha2) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 45,
      'fecha': fecha1,
      'fecha2': fecha2,
      'idUs':this.filtropersona,
      'idRes':this.idequipo,
      'status':status
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
obtenertareaSemanaEquipoEmpresa(status,fecha1,fecha2) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 46,
      'fecha': fecha1,
      'fecha2': fecha2,
      'idEmp':this.filtroempresa,
      'idRes':this.idequipo,
      'status':status
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
obtenertareaSemanaPersonaEmpresaEquipo(status,fecha1,fecha2) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 47,
      'fecha': fecha1,
      'fecha2': fecha2,
      'idEmp':this.filtroempresa,
      'idRes':this.idequipo,
      'idUs':this.filtropersona,
      'status':status
    };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }

  capturar(caso) {
    switch (caso) {
      case '0':
            this.ngOnInit();
        break;
      case '1':
          if (this.filtropersona=='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertareahoy();
            this.obtenertareahoy_f();
            this.obtenertareahoy_c();
            console.log('filtro solo hoy');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertareahoyusuario();
            this.obtenertareahoyusuario_f();
            this.obtenertareahoyusuario_c();
            console.log('filtro hoy y usuario');
          }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtroequipo=='0') {
            this.obtenertareahoyempresa();
            this.obtenertareahoyempresa_f();
            this.obtenertareahoyempresa_c();
            console.log('filtro hoy y empresa');
          }else if (this.filtroequipo!='0'&&this.filtropersona=='0'&&this.filtroempresa=='0') {
            this.obtenertareahoyEquipo();
            this.obtenertareahoyEquipo_f();
            this.obtenertareahoyEquipo_c();
            console.log('filtro hoy y equipo');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo=='0') {
            this.obtenerhoyPersonaEmpresa();
            this.obtenerhoyPersonaEmpresa_f();
            this.obtenerhoyPersonaEmpresa_c();
            console.log('filtro hoy, persona, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo!='0') {
            this.obtenerhoyPersonaEquipo();
            this.obtenerhoyPersonaEquipo_f();
            this.obtenerhoyPersonaEquipo_c();
            console.log('filtro hoy, persona, equipo');
          }else if (this.filtropersona=='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenerhoyEmpresaEquipo();
            this.obtenerhoyEmpresaEquipo_f();
            this.obtenerhoyEmpresaEquipo_c();
            console.log('filtro hoy, equipo, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenerhoyEmpresaPersonaEquipo();
            this.obtenerhoyEmpresaPersonaEquipo_f();
            this.obtenerhoyEmpresaPersonaEquipo_c();
            console.log('filtro hoy, persona, empresa, equipo');
          }
        break;
      case '2':
          if (this.filtropersona=='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertareasemana();
            this.obtenertareasemana_f();
            this.obtenertareasemana_c();
            console.log('filtro solo semana');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaUsuario(1,this.fecha,this.fecha3);
            this.obtenertareaSemanaUsuario(2,this.fecha,this.fecha3);
            this.obtenertareaSemanaUsuario(3,this.fecha,this.fecha3);
            console.log('filtro semana y usuario');
          }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaEmpresa(1,this.fecha,this.fecha3);
            this.obtenertareaSemanaEmpresa(2,this.fecha,this.fecha3);
            this.obtenertareaSemanaEmpresa(3,this.fecha,this.fecha3);
            console.log('filtro semana y empresa');
          }else if (this.filtroequipo!='0'&&this.filtropersona=='0'&&this.filtroempresa=='0') {
            this.obtenertareaSemanaEquipo(1,this.fecha,this.fecha3);
            this.obtenertareaSemanaEquipo(2,this.fecha,this.fecha3);
            this.obtenertareaSemanaEquipo(3,this.fecha,this.fecha3);
            console.log('filtro semana y equipo');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaPersonaEmpresa(1,this.fecha,this.fecha3);
            this.obtenertareaSemanaPersonaEmpresa(2,this.fecha,this.fecha3);
            this.obtenertareaSemanaPersonaEmpresa(3,this.fecha,this.fecha3);
            console.log('filtro semana, persona, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaPersonaEquipo(1,this.fecha,this.fecha3);
            this.obtenertareaSemanaPersonaEquipo(2,this.fecha,this.fecha3);
            this.obtenertareaSemanaPersonaEquipo(3,this.fecha,this.fecha3);
            console.log('filtro semana, persona, equipo');
          }else if (this.filtropersona=='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaEquipoEmpresa(1,this.fecha,this.fecha3);
            this.obtenertareaSemanaEquipoEmpresa(2,this.fecha,this.fecha3);
            this.obtenertareaSemanaEquipoEmpresa(3,this.fecha,this.fecha3);
            console.log('filtro semana, equipo, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaPersonaEmpresaEquipo(1,this.fecha,this.fecha3);
            this.obtenertareaSemanaPersonaEmpresaEquipo(2,this.fecha,this.fecha3);
            this.obtenertareaSemanaPersonaEmpresaEquipo(3,this.fecha,this.fecha3);
            console.log('filtro semana, persona, empresa, equipo');
          }
        break;
      case '3':
          if (this.filtropersona=='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertareames();
            this.obtenertareames_f();
            this.obtenertareames_c();
            console.log('filtro solo mes');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaUsuario(1,this.fecha,this.fecha2);
            this.obtenertareaSemanaUsuario(2,this.fecha,this.fecha2);
            this.obtenertareaSemanaUsuario(3,this.fecha,this.fecha2);
            console.log('filtro mes y usuario');
          }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaEmpresa(1,this.fecha,this.fecha2);
            this.obtenertareaSemanaEmpresa(2,this.fecha,this.fecha2);
            this.obtenertareaSemanaEmpresa(3,this.fecha,this.fecha2);
            console.log('filtro mes y empresa');
          }else if (this.filtroequipo!='0'&&this.filtropersona=='0'&&this.filtroempresa=='0') {
            this.obtenertareaSemanaEquipo(1,this.fecha,this.fecha2);
            this.obtenertareaSemanaEquipo(2,this.fecha,this.fecha2);
            this.obtenertareaSemanaEquipo(3,this.fecha,this.fecha2);
            console.log('filtro mes y equipo');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaPersonaEmpresa(1,this.fecha,this.fecha2);
            this.obtenertareaSemanaPersonaEmpresa(2,this.fecha,this.fecha2);
            this.obtenertareaSemanaPersonaEmpresa(3,this.fecha,this.fecha2);
            console.log('filtro mes, persona, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaPersonaEquipo(1,this.fecha,this.fecha2);
            this.obtenertareaSemanaPersonaEquipo(2,this.fecha,this.fecha2);
            this.obtenertareaSemanaPersonaEquipo(3,this.fecha,this.fecha2);
            console.log('filtro mes, persona, equipo');
          }else if (this.filtropersona=='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaEquipoEmpresa(1,this.fecha,this.fecha2);
            this.obtenertareaSemanaEquipoEmpresa(2,this.fecha,this.fecha2);
            this.obtenertareaSemanaEquipoEmpresa(3,this.fecha,this.fecha2);
            console.log('filtro mes, equipo, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaPersonaEmpresaEquipo(1,this.fecha,this.fecha2);
            this.obtenertareaSemanaPersonaEmpresaEquipo(2,this.fecha,this.fecha2);
            this.obtenertareaSemanaPersonaEmpresaEquipo(3,this.fecha,this.fecha2);
            console.log('filtro mes, persona, empresa, equipo');
          }
        break;
      case '4':
          if (this.filtropersona=='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertarea2meses();
            this.obtenertarea2meses_f();
            this.obtenertarea2meses_c();
            console.log('filtro solo 2meses');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaUsuario(1,this.fecha,this.fecha4);
            this.obtenertareaSemanaUsuario(2,this.fecha,this.fecha4);
            this.obtenertareaSemanaUsuario(3,this.fecha,this.fecha4);
            console.log('filtro 2meses y usuario');
          }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaEmpresa(1,this.fecha,this.fecha4);
            this.obtenertareaSemanaEmpresa(2,this.fecha,this.fecha4);
            this.obtenertareaSemanaEmpresa(3,this.fecha,this.fecha4);
            console.log('filtro 2meses y empresa');
          }else if (this.filtroequipo!='0'&&this.filtropersona=='0'&&this.filtroempresa=='0') {
            this.obtenertareaSemanaEquipo(1,this.fecha,this.fecha4);
            this.obtenertareaSemanaEquipo(2,this.fecha,this.fecha4);
            this.obtenertareaSemanaEquipo(3,this.fecha,this.fecha4);
            console.log('filtro 2meses y equipo');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo=='0') {
            this.obtenertareaSemanaPersonaEmpresa(1,this.fecha,this.fecha4);
            this.obtenertareaSemanaPersonaEmpresa(2,this.fecha,this.fecha4);
            this.obtenertareaSemanaPersonaEmpresa(3,this.fecha,this.fecha4);
            console.log('filtro 2meses, persona, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa=='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaPersonaEquipo(1,this.fecha,this.fecha4);
            this.obtenertareaSemanaPersonaEquipo(2,this.fecha,this.fecha4);
            this.obtenertareaSemanaPersonaEquipo(3,this.fecha,this.fecha4);
            console.log('filtro 2meses, persona, equipo');
          }else if (this.filtropersona=='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaEquipoEmpresa(1,this.fecha,this.fecha4);
            this.obtenertareaSemanaEquipoEmpresa(2,this.fecha,this.fecha4);
            this.obtenertareaSemanaEquipoEmpresa(3,this.fecha,this.fecha4);
            console.log('filtro 2meses, equipo, empresa');
          }else if (this.filtropersona!='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
            this.obtenertareaSemanaPersonaEmpresaEquipo(1,this.fecha,this.fecha4);
            this.obtenertareaSemanaPersonaEmpresaEquipo(2,this.fecha,this.fecha4);
            this.obtenertareaSemanaPersonaEmpresaEquipo(3,this.fecha,this.fecha4);
            console.log('filtro 2meses, persona, empresa, equipo');
          }
        break;
      default:
        this.ngOnInit();
        break;
    }
    // if (this.opcionSeleccionado == "0"&&this.filtropersona=='0'&&this.filtroempresa=='0') {
    //   this.ngOnInit();
    // }else if (this.opcionSeleccionado == "1") {
    //   this.obtenertareahoy();
    //   this.obtenertareahoy_f();
    //   this.obtenertareahoy_c();
    //   console.log("Consultar hoy");
    // }else if (this.opcionSeleccionado == "2") {
    //   this.obtenertareasemana();
    //   this.obtenertareasemana_f();
    //   this.obtenertareasemana_c();
    //   console.log("Consultar semana");
    // }else if (this.opcionSeleccionado == "3") {
    //   this.obtenertareames();
    //   this.obtenertareames_f();
    //   this.obtenertareames_c();
    //   console.log("Consultar mes");
    // }else if (this.opcionSeleccionado == "4") {
    //   this.obtenertarea2meses();
    //   this.obtenertarea2meses_f();
    //   this.obtenertarea2meses_c();
    //   console.log("Consultar 60 dias");
    // }
  }
  //metodos combinados filtro persona
  obtenertareaPersonaEmpresa(status) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 48, 'idUs': this.filtropersona,'idEmp':this.filtroempresa };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
  obtenertareaPersonaEquipo(status) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 49, 'idUs': this.filtropersona,'idRes':this.idequipo };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }

  capturar2() {
    if (this.filtropersona == '0'&&this.filtrofecha=='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
      this.ngOnInit();
      console.log('todos');
    }else if (this.filtropersona != '0'&&this.filtrofecha=='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
      this.obtenertareaparami();
      this.obtenertareaparami_f();
      this.obtenertareaparami_c();
      console.log('solo persona');
    }else if (this.filtropersona != '0'&&this.filtrofecha!='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtropersona != '0'&&this.filtrofecha=='0'&&this.filtroempresa!='0'&&this.filtroequipo=='0') {
      this.obtenertareaPersonaEmpresa(1);
      this.obtenertareaPersonaEmpresa(2);
      this.obtenertareaPersonaEmpresa(3);
      console.log('persona y empresa');
    }else if (this.filtropersona != '0'&&this.filtrofecha=='0'&&this.filtroempresa=='0'&&this.filtroequipo!='0') {
      this.obtenertareaPersonaEquipo(1);
      this.obtenertareaPersonaEquipo(2);
      this.obtenertareaPersonaEquipo(3);
      console.log('persona y equipo');
    }else if (this.filtropersona != '0'&&this.filtrofecha!='0'&&this.filtroempresa!='0'&&this.filtroequipo=='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtropersona != '0'&&this.filtrofecha!='0'&&this.filtroempresa=='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtropersona != '0'&&this.filtrofecha=='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
      this.obtenertareaPersonaEmpresaEquipo(1);
      this.obtenertareaPersonaEmpresaEquipo(2);
      this.obtenertareaPersonaEmpresaEquipo(3);
      console.log('persona, empresa, equipo');
    }else if (this.filtropersona != '0'&&this.filtrofecha!='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }
  }

  obtenertareaPersonaEmpresaEquipo(status) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 51, 'idEmp': this.filtroequipo,'idRes':this.idequipo,'idUs':this.filtropersona };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }
  obtenertareaEmpresaEquipo(status) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 50, 'idEmp': this.filtroequipo,'idRes':this.idequipo };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        if (status==1) {
          this.tarea = respuesta;
          if (this.tarea == null) {
            this.tarea = [];
            console.log(this.tarea);
          }
        }else if (status==2) {
          this.tarea2 = respuesta;
          if (this.tarea2 == null) {
            this.tarea2 = [];
            console.log(this.tarea2);
          }
        }else if (status==3) {
          this.tarea3 = respuesta;
          if (this.tarea3 == null) {
            this.tarea3 = [];
            console.log(this.tarea3);
          }
        }
      });
  }

  capturar3() {
    if (this.filtroempresa=='0'&&this.filtropersona=='0'&&this.filtrofecha=='0'&&this.filtroequipo=='0') {
      this.ngOnInit();
      console.log('todos');
    }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtrofecha=='0'&&this.filtroequipo=='0') {
      this.obtenertareae1();
      this.obtenertareae2();
      this.obtenertareae3();
      console.log('solo empresa');
    }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtrofecha!='0'&&this.filtroequipo=='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtroempresa!='0'&&this.filtropersona!='0'&&this.filtrofecha=='0'&&this.filtroequipo=='0') {
      this.obtenertareaPersonaEmpresa(1);
      this.obtenertareaPersonaEmpresa(2);
      this.obtenertareaPersonaEmpresa(3);
      console.log('persona y empresa');
    }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtrofecha=='0'&&this.filtroequipo!='0') {
      this.obtenertareaEmpresaEquipo(1);
      this.obtenertareaEmpresaEquipo(2);
      this.obtenertareaEmpresaEquipo(3);
      console.log('empresa y equipo');
    }else if (this.filtroempresa!='0'&&this.filtropersona!='0'&&this.filtrofecha!='0'&&this.filtroequipo=='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtrofecha!='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtropersona != '0'&&this.filtrofecha=='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
      this.obtenertareaPersonaEmpresaEquipo(1);
      this.obtenertareaPersonaEmpresaEquipo(2);
      this.obtenertareaPersonaEmpresaEquipo(3);
      console.log('empresa, persona, equipo');
    }else if (this.filtroempresa!='0'&&this.filtropersona!='0'&&this.filtrofecha!='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }
  }
  capturar4() {
    if (this.filtroempresa=='0'&&this.filtropersona=='0'&&this.filtrofecha=='0'&&this.filtroequipo=='0') {
      this.ngOnInit();
      console.log('todos');
    }else if (this.filtroempresa=='0'&&this.filtropersona=='0'&&this.filtrofecha=='0'&&this.filtroequipo!='0') {
      this.obtenertareae1();
      this.obtenertareae2();
      this.obtenertareae3();
      console.log('solo equipo');
    }else if (this.filtroempresa=='0'&&this.filtropersona=='0'&&this.filtrofecha!='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtroempresa=='0'&&this.filtropersona!='0'&&this.filtrofecha=='0'&&this.filtroequipo!='0') {
      this.obtenertareaPersonaEquipo(1);
      this.obtenertareaPersonaEquipo(2);
      this.obtenertareaPersonaEquipo(3);
      console.log('persona y equipo');
    }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtrofecha=='0'&&this.filtroequipo!='0') {
      this.obtenertareaEmpresaEquipo(1);
      this.obtenertareaEmpresaEquipo(2);
      this.obtenertareaEmpresaEquipo(3);
      console.log('empresa y equipo');
    }else if (this.filtroempresa=='0'&&this.filtropersona!='0'&&this.filtrofecha!='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtroempresa!='0'&&this.filtropersona=='0'&&this.filtrofecha!='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }else if (this.filtropersona != '0'&&this.filtrofecha=='0'&&this.filtroempresa!='0'&&this.filtroequipo!='0') {
      this.obtenertareaPersonaEmpresaEquipo(1);
      this.obtenertareaPersonaEmpresaEquipo(2);
      this.obtenertareaPersonaEmpresaEquipo(3);
      console.log('equipo, persona, empresa');
    }else if (this.filtroempresa!='0'&&this.filtropersona!='0'&&this.filtrofecha!='0'&&this.filtroequipo!='0') {
      this.capturar(this.filtrofecha);
    }
  }

  filtrar(){
    if (this.filtrofecha!=='0'){
      this.capturar(this.filtrofecha);
    }else if (this.filtropersona!=='0') {
      this.capturar2();
    }else if (this.filtroempresa!=='0') {
      this.capturar3();
    }else if (this.filtroequipo!=='0') {
      this.capturar4();
    }else if (this.filtrofecha=='0'&&this.filtropersona=='0'&&this.filtroempresa=='0'&&this.filtroequipo=='0') {
      this.obtenertarea1();
      this.obtenertarea2();
      this.obtenertarea3();
    }
  }

  resetEquipo(){
    this.filtroequipo = "0";
  }

  resetPersona(){
    this.filtropersona = "0";
  }

}
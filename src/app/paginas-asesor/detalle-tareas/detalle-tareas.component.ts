import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: "app-detalle-tareas",
  templateUrl: "./detalle-tareas.component.html",
  styleUrls: ["./detalle-tareas.component.css"],
})
export class DetalleTareasComponent implements OnInit {
  private baseURL = "http://192.168.1.61/lum/";
  empresasid: any = [];
  empresasid1: any = [];
  empresasid2: any = [];
  tarea: any = [];
  tarea2: any = [];
  tarea3: any = [];
  tareaemp: any = [];
  tarea2emp: any = [];
  tarea3emp: any = [];
  empresa: any = [];
  idEmp: number;
  idUsuario = "";
  fecha = "";
  fecha2 = "";
  fecha3 = "";
  fecha4 = "";
  filtrofecha1: any = [];
  filtrofecha1_f: any = [];
  filtrofecha1_c: any = [];
  filtrofecha2: any = [];
  filtrofecha2_f: any = [];
  filtrofecha2_c: any = [];
  filtrofecha3: any = [];
  filtrofecha3_f: any = [];
  filtrofecha3_c: any = [];
  filtrofecha4: any = [];
  filtrofecha4_f: any = [];
  filtrofecha4_c: any = [];
  filtroparami: any = [];
  filtroparami_f: any = [];
  filtroparami_c: any = [];
  filtroparaotro: any = [];
  filtroparaotro_f: any = [];
  filtroparaotro_c: any = [];
  info = [];
  usuario: any = [];
  vista = 1;
  vista2 = 1;
  vista3 = 1;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string = "0";
  verSeleccion: string = "";

  opcionSeleccionado2: string = "0";
  verSeleccion2: string = "";
  opcionSeleccionado3: string = "0";
  verSeleccion3: string = "";

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    const info1 = localStorage.getItem("usuariolumi");

    const info2 = info1.replace("[", "").replace("]", "").replace("", "");

    this.info = info2.split(",");

    const idUsuario = this.info[0];

    const rol = this.info[2];

    if (rol.toString() === '"0"') {
      this.router.navigate(["/Prospectar_Asesor"]);
    }
    this.route.params.subscribe((parametros) => {
      this.idEmp = parametros["idE"];
    });
  }

  p: number = 1;
  p2: number = 1;
  p3: number = 1;

  ngOnInit() {
    const info1 = localStorage.getItem("usuariolumi");
    const info2 = info1.replace("[", "").replace("]", "").replace("", "");
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"', "").replace('"', "");
    console.log(this.idUsuario);

    this.fecha = moment().format("YYYY-MM-DD");
    this.fecha2 = moment().subtract(1, 'months').format("YYYY-MM-DD");
    this.fecha3 = moment().subtract(7, "d").format("YYYY-MM-DD");
    this.fecha4 = moment().subtract(2, 'months').format("YYYY-MM-DD");
    this.obtenertarea1();
    this.obtenertarea2();
    this.obtenertarea3();
    this.empresas();
    this.vista = 1;
    this.vista2 = 1;
    this.vista3 = 1;
  }

  obtenerempresa() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 11 };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.empresa = respuesta;
        if (this.empresa == null) {
          this.empresa = [];
          console.log(this.empresa);
        }
      });
  }

  empresas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'idUsuario': this.idUsuario };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasid1 = respuesta;
        this.obtenerempresascoordinador();
      });
  }

  obtenerempresascoordinador() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 19, 'idUsuario': this.idUsuario };
    const URL: any = this.baseURL + 'calendario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresasid2 = respuesta;
        this.empresasid = this.empresasid1.concat(this.empresasid2);
      });
  }


  obtenertarea1() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 2, 'idUs':this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];
          console.log(this.tarea);
        }

      });
    this.vista = 1;
  }
  obtenertarea2() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 3, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 1;
  }
  obtenertarea3() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 4, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 1;
  }
  //obtener tareas por empresa (pendientes,finalizadas, canceladas)
  obtenertareae1() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 17, 'idEmp': this.verSeleccion3, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];

        }

      });
    this.vista = 7;
  }
  obtenertareae2() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 18, 'idEmp': this.verSeleccion3, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 7;
  }

  obtenertareae3() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 19, 'idEmp': this.verSeleccion3, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 7;
  }
  //obtener hoy (pendientes,finalizadas, canceladas)
  obtenertareahoy() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 5, 'fecha': this.fecha, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];

        }

      });
    this.vista = 2;
    console.log(this.vista);
  }

  obtenertareahoy_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 5.1, 'fecha': this.fecha, 'idEmp': this.idEmp, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 2;
    console.log(this.vista);
  }
  obtenertareahoy_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 5.2, 'fecha': this.fecha, 'idEmp': this.idEmp, 'idUs': this.idUsuario };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 2;
    console.log(this.vista);
  }
  //obtener tarea hace 1 mes (pendientes,finalizadas, canceladas)
  obtenertareames() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6, 'fecha': this.fecha, 'fecha2': this.fecha2, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];

        }

      });
    this.vista = 3;
  }
  obtenertareames_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.1, 'fecha': this.fecha, 'fecha2': this.fecha2, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 3;
  }
  obtenertareames_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.2, 'fecha': this.fecha, 'fecha2': this.fecha2, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 3;
  }


  //obtener tarea hace 2 mes (pendientes,finalizadas, canceladas)
  obtenertarea2meses() {
    console.log(this.fecha,this.fecha4);
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6, 'fecha': this.fecha, 'fecha2': this.fecha4, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];

        }

      });
    this.vista = 8;
  }
  obtenertarea2meses_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.1, 'fecha': this.fecha, 'fecha2': this.fecha4, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 8;
  }
  obtenertarea2meses_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6.2, 'fecha': this.fecha, 'fecha2': this.fecha4, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 8;
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
      , 'idUs': this.idUsuario
    };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];

        }

      });
    this.vista = 4;
  }
  obtenertareasemana_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 7.1,
      'fecha': this.fecha,
      'fecha2': this.fecha3
      , 'idUs': this.idUsuario
    };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 4;
  }
  obtenertareasemana_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 7.2,
      'fecha': this.fecha,
      'fecha2': this.fecha3
      , 'idUs': this.idUsuario
    };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 4;
  }
  //obtener para mi (pendientes,finalizadas, canceladas)
  obtenertareaparami() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 8, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];

        }

      });
    this.vista = 5;
  }
  obtenertareaparami_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 8.1, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 5;
  }
  obtenertareaparami_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 8.2, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 5;
  }
  //obtener para otro (pendientes,finalizadas, canceladas)
  obtenertareaparaotro() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 9, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea = respuesta;
        if (this.tarea == null) {
          this.tarea = [];

        }

      });
    this.vista = 6;
  }
  obtenertareaparaotro_f() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 9.1, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea2 = respuesta;
        if (this.tarea2 == null) {
          this.tarea2 = [];
          console.log(this.tarea2);
        }
      });
    this.vista2 = 6;
  }
  obtenertareaparaotro_c() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 9.2, 'idUs': this.idUsuario};
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tarea3 = respuesta;
        if (this.tarea3 == null) {
          this.tarea3 = [];
          console.log(this.tarea3);
        }
      });
    this.vista3 = 6;
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    if (this.verSeleccion == "0") {
      this.ngOnInit();
    }
    if (this.verSeleccion == "1") {
      this.obtenertareahoy();
      this.obtenertareahoy_f();
      this.obtenertareahoy_c();
      console.log("Consultar hoy");
    }
    if (this.verSeleccion == "2") {
      this.obtenertareasemana();
      this.obtenertareasemana_f();
      this.obtenertareasemana_c();
      console.log("Consultar semana");

    }
    if (this.verSeleccion == "3") {
      this.obtenertareames();
      this.obtenertareames_f();
      this.obtenertareames_c();
      console.log("Consultar mes");
    }
    if (this.verSeleccion == "4") {
      this.obtenertarea2meses();
      this.obtenertarea2meses_f();
      this.obtenertarea2meses_c();
      console.log("Consultar 60 dias");
    }
  }

  capturar2() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion2 = this.opcionSeleccionado2;
    if (this.verSeleccion2 == "0") {
      this.ngOnInit();
    }
    if (this.verSeleccion2 == "1") {
      this.obtenertareaparami();
      this.obtenertareaparami_f();
      this.obtenertareaparami_c();
      console.log("Consultar para mi");
    }
    if (this.verSeleccion2 == "2") {
      this.obtenertareaparaotro();
      this.obtenertareaparaotro_f();
      this.obtenertareaparaotro_c();
      console.log("Consultar para otros");
    }
  }

  capturar3() {
    this.verSeleccion3 = this.opcionSeleccionado3;
    if (this.verSeleccion3 == "0") {
      this.ngOnInit();
    }else{
      console.log(this.verSeleccion3);
      this.obtenertareae1();
      this.obtenertareae2();
      this.obtenertareae3();
    }
  }
}

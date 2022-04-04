import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-reportes-c',
  templateUrl: './reportes-c.component.html',
  styleUrls: ['./reportes-c.component.css']
})
export class ReportesCComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  private baseURL = 'http://192.168.1.61/lum/'
  idEmp = '';
  idUs = '';
  tipo: number;
  mes: number;
  tareas: any = [];
  empresa: any = [];
  idresponsable: number;
  citas: any = [];
  usuario: any = [];
  usuario2: any = [];
  actividades: any = [];
  opcionSeleccionado: number = 0;
  opcionSeleccionado2: string = "2";
  verSeleccion2: string = "";

  constructor(public route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.params.subscribe(parametros => {
      this.idUs = parametros['idEq'];
      this.idEmp = parametros['idEmp'];
      this.tipo = parametros['tipo'];
    });
   }

  ngOnInit() {
    if (this.tipo == 0) {
      this.obtenertareas();
    } else {
      this.obtenercitas();
    }
    this.obtenerempresa();
  }

  obtenerempresa() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresa = respuesta;
      });
  }
  obtenertareas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 12, 'idEquipo': this.idUs, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }
  obtenercitas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 13, 'idEquipo': this.idUs, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }
  capturar() {
    this.mes = this.opcionSeleccionado;
    if (this.tipo == 0) {
      if (this.mes == 0) {
        this.obtenertareas();
      } else {
        this.obtenertareasmes();
        console.log('tareas');
      }
    } else {
      if (this.mes == 0) {
        this.obtenercitas();
      } else {
        this.obtenercitasmes();
        console.log('citas');
      }
    }
  }

  capturar2() {
    this.verSeleccion2=this.opcionSeleccionado2;
    if (this.verSeleccion2=="1") {
     this.tipo=1;
     console.log(this.tipo);
     this.ngOnInit();
    } if (this.verSeleccion2=="0") {
     this.tipo=0;
     console.log(this.tipo);
     this.ngOnInit();
   }
  }


  obtenertareasmes() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 14, 'idEquipo': this.idUs, 'mes': this.mes };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }
  obtenercitasmes() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 15, 'idEquipo': this.idUs, 'mes': this.mes };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Graficas.xlsx');
   }

}

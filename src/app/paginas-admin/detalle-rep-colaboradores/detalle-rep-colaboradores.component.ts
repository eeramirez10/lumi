import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-detalle-rep-colaboradores',
  templateUrl: './detalle-rep-colaboradores.component.html',
  styleUrls: ['./detalle-rep-colaboradores.component.css']
})
export class DetalleRepColaboradoresComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  private baseURL = 'http://192.168.1.61/lum/';
  idEmp = '1';
  idUs = '';
  tipo: number = 1;
  mes: number;
  tareas: any = [];
  idresponsable: number;
  citas: any = [];
  usuario: any = [];
  usuario2: any = [];
  actividades: any = [];
  opcionSeleccionado: number = 0;
  opcionSeleccionado1: number = 1;

  constructor(public route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.params.subscribe(parametros => {
      this.idUs = parametros['idUs'];
    });
  }

  ngOnInit() {
    if (this.tipo == 0) {
      this.obtenertareas();
    } else {
      this.obtenercitas();
    }
    this.obtenerusuario();
  }
  obtenerusuario() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0, 'idUsuario': this.idUs };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuario = respuesta;
      });
  }

  obtenertareas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 8.2, 'idUsuario': this.idUs };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

  obtenerresponsable(id) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0, 'idUsuario': id };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuario2 = respuesta;
        console.log(this.usuario2);
      });
  }

  obtenercitas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 9.2, 'idUsuario': this.idUs};
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

  capturar() {
    this.mes = this.opcionSeleccionado;
    if (this.mes == 0) {
      this.ngOnInit();
    }else
    if (this.tipo == 0) {
      this.obtenertareasmes();
    } else if (this.tipo ==1) {
      this.obtenercitasmes();
    }
  }

  capturar1() {
    this.tipo = this.opcionSeleccionado1;
    if (this.tipo == 0) {
     this.obtenertareas();
    } else if (this.tipo == 1) {
      this.obtenercitas();
    }
  }

  obtenertareasmes() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 8.3, 'idUsuario': this.idUs, 'idEmp': this.idEmp, 'mes': this.mes };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

  obtenercitasmes() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 9.3, 'idUsuario': this.idUs, 'idEmp': this.idEmp, 'mes': this.mes };
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

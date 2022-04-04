import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-detalle-grafica',
  templateUrl: './detalle-grafica.component.html',
  styleUrls: ['./detalle-grafica.component.css']
})
export class DetalleGraficaComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  private baseURL = 'http://192.168.1.61/lum/';
  idEmp = '';
  idUs = '';
  tipo :number;
  mes: number;
  tareas: any = [];
  empresa: any = [];
  idresponsable:number;
  citas: any = [];
  usuario: any = [];
  usuario2: any = [];
  actividades: any = [];
  opcionSeleccionado: number = 0;

  constructor(public route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.params.subscribe(parametros => {
      this.idUs = parametros['idUs'];
      this.idEmp = parametros['idEmp'];
      this.tipo = parametros['tipo'];
    });
  }

  ngOnInit() {
    if (this.tipo == 0) {
      this.obtenertareas();
    }else{
      this.obtenercitas();
    }
    this.obtenerusuario();
    this.obtenerempresa();
  }

  obtenerempresa(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'idEmp': this.idEmp};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresa = respuesta;
      });
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
    const options: any = { 'caso': 8, 'idUsuario': this.idUs, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

  obtenerresponsable(id){
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
    const options: any = { 'caso': 9, 'idUsuario': this.idUs, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

  capturar(){
    this.mes = this.opcionSeleccionado;
    if (this.tipo == 0) {
      if (this.mes == 0) {
        this.obtenertareas();
      }else{
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

  obtenertareasmes(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 8.1, 'idUsuario': this.idUs, 'idEmp': this.idEmp, 'mes':this.mes};
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }
  obtenercitasmes(){
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 9.1, 'idUsuario': this.idUs, 'idEmp': this.idEmp, 'mes': this.mes};
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

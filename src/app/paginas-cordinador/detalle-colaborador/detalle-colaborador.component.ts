import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-colaborador',
  templateUrl: './detalle-colaborador.component.html',
  styleUrls: ['./detalle-colaborador.component.css']
})
export class DetalleColaboradorComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lum/';
  idEmp = '';
  idUs = '';
  tipo = '';
  idUsuariogeneral = '';
  tareas: any = [];
  citas: any = [];
  actividades: any = [];
  opcionSeleccionado: string = "0";
  verSeleccion: string = "";
  filtroguardias = '';
  p = '';


  constructor(public route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.params.subscribe(parametros => {
      this.idUsuariogeneral = localStorage.getItem('usuariografica');
      this.idUs = parametros['idEq'];
      this.idEmp = parametros['idEmp'];
      this.tipo = parametros['tipo'];
    });
  }
  ngOnInit() {
    if (this.tipo == '0') {
      this.obtenertareas();
    } else {
      if (Number(this.idUsuariogeneral) > 0) {
        this.obtenercitas1();
      } else {
        this.obtenercitas();
      }
    }
  }

  obtenertareas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 10, 'idEquipo': this.idUs, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

  obtenercitas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 11, 'idEquipo': this.idUs, 'idEmp': this.idEmp };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

  obtenercitas1() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 17, 'idEquipo': this.idUs, 'idEmp': this.idEmp, 'idUsuario': this.idUsuariogeneral };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tareas = respuesta;
        console.log(this.tareas);
      });
  }

}

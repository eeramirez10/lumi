import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-detalle-tarea-cfco',
  templateUrl: './detalle-tarea-cfco.component.html',
  styleUrls: ['./detalle-tarea-cfco.component.css']
})
export class DetalleTareaCFCOComponent implements OnInit {

  private baseURL = 'http://192.168.1.61/lum/';
  idT = '';
  tarea: any = [];
  com: any = [];
  rem: any = [];
  arch: any = [];
  Tarea = '';
  Comentario = '';
  status = '1';
  idUsuario = '';
  cancel = '';
  info = [];
  idEmpresas = '';
  archivos: string  []  =  [];
  nombredearchivos: any = [];
  constructor(public route: ActivatedRoute,private http:HttpClient,private router: Router,private subirarchivo: SubirarchivoService) {
    this.route.params.subscribe(parametros => {
      this.idT = parametros['idT'];
    });
    const info1 = localStorage.getItem('usuariolumi');
    const info2 = info1.replace("[","").replace("]","").replace("","");
    this.info = info2.split(",");
    this.idUsuario = this.info[0];
   }
  ngOnInit() {
    this.obtenertarea(this.idT);
    this.obtenerComentarios(this.idT);
    this.obtenerRemitente(this.idT);
    this.obtenerArchivos(this.idT);
  }
  obtenertarea(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 0, idT : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tarea = respuesta;
        for (let i = 0; i < this.tarea.length; i++) {
          const element = this.tarea[i];
          this.Tarea = this.tarea[0].Tarea;
          this.idEmpresas = this.tarea[0].idEmpresas;
          console.log(this.Tarea);
        }
        // console.log(this.tarea);
      });
  }
  obtenerComentarios(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 1, idT : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.com = respuesta;
      });
  }
  decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }
  obtenerRemitente(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 2, idT : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.rem = respuesta;
      });
  }


  obtenerArchivos(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 4, idT : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.arch = respuesta;
      });
  }
}

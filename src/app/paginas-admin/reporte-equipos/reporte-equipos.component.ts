import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-reporte-equipos',
  templateUrl: './reporte-equipos.component.html',
  styleUrls: ['./reporte-equipos.component.css']
})
export class ReporteEquiposComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lum/'
  integrantes: any = [];
  equipos: any = [];
  equipospush: any = [];

  constructor(public route: ActivatedRoute, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.obtenerlideres();
  }

  obtenerlideres() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 2 };
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.equipos = respuesta;
        for (let index = 0; index < this.equipos.length; index++) {
          const ideq = this.equipos[index].Equipos_idEquipos;
          this.equipospush.push(ideq);
        }
        this.obtenerintegrantes(this.equipospush);
        console.log(this.equipospush)
      });
  }

  obtenerintegrantes(ide) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 5, 'idEquipo': ide };
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.integrantes = respuesta;
        console.log(this.integrantes);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reporte-colaboradores',
  templateUrl: './reporte-colaboradores.component.html',
  styleUrls: ['./reporte-colaboradores.component.css']
})
export class ReporteColaboradoresComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lum/';
  colaboradores: any = [];
  seleccionado: string = "0";
  verseleccion: string = "";

  constructor(private http: HttpClient) { }

    p : number = 1;
  filterTarea = '';

  ngOnInit() {
    this.obtenerprospectos();
  }

  obtenerprospectos() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 3 };
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.colaboradores=respuesta;
        // console.log(this.prospectos);
      });
  }

  obtenerasesores() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 3.1 };
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.colaboradores = respuesta;
        // console.log(this.prospectos);
      });
  }

  obtenercoordinadores() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 3.2 };
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.colaboradores = respuesta;
        // console.log(this.prospectos);
      });
  }

  capturar() {
    this.verseleccion = this.seleccionado;
    if (this.verseleccion == '0') {
      this.ngOnInit();
    }else  if (this.verseleccion == '1') {
      console.log("consultar asesores");
      this.obtenerasesores();
    } else if (this.verseleccion == '2') {
      console.log("consultar coordinadores");
      this.obtenercoordinadores();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['./reporte-clientes.component.css']
})
export class ReporteClientesComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lumr.dyndns.org/lum/';
  prospectos: any = [];
  p: number = 1;
  filterTarea = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerprospectos();
  }

  obtenerprospectos() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0 };
    const URL: any = this.baseURL + 'admin.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.prospectos = respuesta;
        // console.log(this.prospectos);
      });
  }

}

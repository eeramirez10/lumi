import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Chart } from 'chart.js';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-detalle2-rclientes',
  templateUrl: './detalle2-rclientes.component.html',
  styleUrls: ['./detalle2-rclientes.component.css']
})
export class Detalle2RclientesComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  idempresa: number;
  fecha='';
  private baseURL = 'http://192.168.1.61/lum/';
  citas: any = [];
  empresa: any = [];

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe(parametros => {
      this.idempresa = parametros['idEmp'];
      this.fecha = parametros['Fecha'];
    });
   }

  ngOnInit() {
    this.obtenercitas();
    this.obtenerempresa();
  }

  obtenercitas() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0.2, 'fecha': this.fecha, 'idEmp': this.idempresa };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.citas = respuesta;
      });
  }

  obtenerempresa() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'fecha': this.fecha, 'idEmp': this.idempresa };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.empresa = respuesta;
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

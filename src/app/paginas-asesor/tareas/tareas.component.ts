import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lum/'
  tarea: any = [];
  tienetarea: any = [];
  idE = "";


  constructor(private http:HttpClient,public route: ActivatedRoute,
    private router: Router) {

     }

  p : number = 1;
  filterTarea = '';
  ngOnInit() {
    this.obtenertarea();
    this.empresatarea();
  }
  obtenertarea() {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 1 };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tarea = respuesta;
        // console.log(this.tarea);
      });
  }

  empresatarea() {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 10 };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tienetarea = respuesta;
        // console.log(this.tienetarea);
      });
  }

}

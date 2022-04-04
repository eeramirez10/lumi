import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tareas-canceladas',
  templateUrl: './tareas-canceladas.component.html',
  styleUrls: ['./tareas-canceladas.component.css']
})
export class TareasCanceladasComponent implements OnInit {
  tareacancel: any = [];
  p: number = 1;
  private baseURL = "http://192.168.1.61/lum/";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.tareascanceladas();
  }

  tareascanceladas() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 4 };
    const URL: any = this.baseURL + "detalle_cita1.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.tareacancel = respuesta;
        console.log(this.tareacancel);

        // if (this.tareacancel == null) {
        //   this.tareacancel = [];
        //   console.log(this.tareacancel);
        // }
      });
  }

}

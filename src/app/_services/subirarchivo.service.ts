import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })

  export class SubirarchivoService {
    nombres: any = [];

    public url_servidor = "http://192.168.1.61/lum/uploadarchivo.php";
    public url_servidor1 = "http://192.168.1.61/lum/uploadimagenes.php";

  constructor(private http: HttpClient) {
  }

  public enviararchivo(form) {
  return this.http.post(this.url_servidor, form);
  }
  public enviarimagen(form) {
    return this.http.post(this.url_servidor1, form);
    }
  }

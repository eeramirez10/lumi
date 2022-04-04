import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ServicesService {


  public url_servidor = "http://192.168.1.61/lum/uploadfoto.php";

constructor(private http: HttpClient) {

}


public postFileImagen(imagenParaSubir: File, nombre: string) {
const formData = new FormData();
formData.append('imagenPropia', imagenParaSubir, nombre);
return this.http.post(this.url_servidor, formData);
}
}

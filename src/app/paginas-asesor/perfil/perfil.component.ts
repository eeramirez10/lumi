import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lum/';
  usuario: any = [];
  equipo: any = [];
  equipo2: any = [];
  ide = '';
  idUsuario = '';
  info = [];
  selectedFile: null;
  nombrefoto: any;
  visible = false;
  shown: boolean;
  foto = '';
  submitted = false;
  returnUrl: string;
  fotoFinal: any;
  fileData: File = null;
  previewUrl: any = null;
  public respuestaImagenEnviada;
  public resultadoCarga;

  constructor(private enviandoImagen: ServicesService,public route: ActivatedRoute,private http:HttpClient,private router: Router) {
    const info1 = localStorage.getItem('usuariolumi');
    const info2 = info1.replace("[",'').replace("]",'').replace("",'');
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"','').replace('"','');
    const rol = this.info[2];
    if (rol.toString() === '"0"') {
      this.router.navigate(["/Prospectar_Asesor"]);
    }
    console.log(this.idUsuario);
   }

  ngOnInit() {
    this.obtenerusuario();
    this.obteneridequipo();
  }


   // Previsualiza la imagen
preview() {
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
  var reader = new FileReader();
  reader.readAsDataURL(this.fileData);
  reader.onload = (_event) => {
    this.previewUrl = reader.result;
  }
}

// Obtiene el nombre y cambia el mismo de la foto subida
onFileChanged(event, files: FileList, fileInput: any) {
  const Numero1 = Math.floor(Math.random() * 10001).toString();
  const Numero2 = Math.floor(Math.random() * 1001).toString();
  // Nombre del archivo
  this.selectedFile = event.target.files[0];
  this.nombrefoto = event.target.files[0].name;
  this.foto = Numero1 + Numero2 + this.nombrefoto.replace(/ /g, "");
  console.log(this.foto);
  this.fotoFinal = files;
  this.fileData = <File>fileInput.target.files[0];
  this.preview();
  this.cargandoImagen(this.fotoFinal, this.foto);
  this.updatefoto();
}
// Sube imagen a servidor
public cargandoImagen(files: FileList, nombre: string) {
  this.enviandoImagen.postFileImagen(files[0] , nombre).subscribe(
  response => {
  this.respuestaImagenEnviada = response;
  if(this.respuestaImagenEnviada <= 1) {
  console.log("Error en el servidor");
  } else {
  if (this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success"){
  this.resultadoCarga = 1;
  } else {
  this.resultadoCarga = 2;
  }
  }
  },
  error => {
  console.log(<any>error);
  }

  ); // FIN DE METODO SUBSCRIBE
  }

  obtenerusuario(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 0, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuario = respuesta;
      });
  }

  obteneridequipo(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 1, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.equipo = respuesta;
        this.ide = this.equipo.length ? this.equipo[0].Equipos_idEquipos : null;
        console.log(this.ide);
        setTimeout(() => {
          this.obtenerequipo()
         }, 3000);
      });
  }

  obtenerequipo(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 3, 'idEquipo': this.ide, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.equipo2 = respuesta;
        console.log(this.equipo2);
      });
  }

  updatefoto(){
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso': 2, 'foto': this.foto, 'idUsuario': this.idUsuario};
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        console.log( 'Done' );
      });
  }

}



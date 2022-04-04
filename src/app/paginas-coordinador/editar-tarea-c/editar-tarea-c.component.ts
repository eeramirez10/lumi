import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-editar-tarea-c',
  templateUrl: './editar-tarea-c.component.html',
  styleUrls: ['./editar-tarea-c.component.css']
})
export class EditarTareaCComponent implements OnInit {
  @ViewChild("myModal", { static: false }) myModal: ElementRef;
  private baseURL = 'http://192.168.1.61/lum/';
  idT = '';
  usersS: any = [];
  sucusS: any = [];
  sucusSE: any = [];
  tarea: any = [];
  com: any = [];
  rem: any = [];
  arch: any = [];
  Tarea = '';
  Comentario = '';
  status = '1';
  idUsuario = '';
  idUsuario1 = '';
  idUsuarioI: number;
  responsable = '';
  responsableARealizar = '';
  sucu = '';
  sucursal = '';
  cancel = '';
  info = [];
  idEmpresasS = '';
  archivos:string  []  =  [];
  nombredearchivos: any = [];
  tipodearchivo: any = [];
  constructor(public route: ActivatedRoute,private http:HttpClient,private router: Router,private subirarchivo: SubirarchivoService) {
    this.route.params.subscribe(parametros => {
      this.idT = parametros['idT'];
    });
    const info1 = localStorage.getItem('usuariolumi');
    const info2 = info1.replace("[","").replace("]","").replace("","");
    this.info = info2.split(",");
    this.idUsuario = this.info[0];
    this.idUsuario1 = this.idUsuario.replace(/['"]+/g, '');
    this.idUsuarioI = this.info[0];
   }

  ngOnInit() {
    this.obtenertarea(this.idT);
    this.obtenerComentarios(this.idT);
    this.obtenerRemitente(this.idT);
    this.obtenerArchivos(this.idT);
    this.obtenerUsuarios(this.idUsuario1);
    console.log(this.idUsuario);
    console.log(this.idUsuario1);
    console.log(this.idUsuarioI);
  }
  obtenertarea(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 0, idT : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.tarea = respuesta;
        for (let i = 0; i < this.tarea.length; i++) {
          this.Tarea = this.tarea[0].Tarea;
          this.responsable = this.tarea[0].Users_idUsers;
          this.responsableARealizar = this.tarea[0].idResponsable;
          this.idEmpresasS = this.tarea[0].idEmpresas;
          this.sucursal = this.tarea[0].Sucursal;
          console.log(this.Tarea);
          console.log(this.responsable);
        }
        console.log(this.idEmpresasS);
        this.obtenerSucursales(this.idEmpresasS);
        this.obtenerSucursalE(this.sucursal);
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

  InsertaPregunta(){
    // tslint:disable-next-line:one-variable-per-declaration
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {'caso': 3, 'tarea': this.Tarea,'idR': this.responsableARealizar, 'idS': this.sucursal,
     'idT': this.idT, 'comentario': this.Comentario,'idU':this.idUsuario
    , 'status' : this.status},
        URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe( respuesta => {
      this.obtenerComentarios(this.idT);
        });
    if (this.archivos.length > 0) {
          this.servidorarchivo(this.idT, 0);
        } else {
          this.obtenerComentarios(this.idT);
          //this.ngOnInit();
          this.Comentario = '';
          this.cancel = '';
          this.nombredearchivos = [];
          this.archivos = [];
        }
        Swal.fire("Se ha modificado la tarea correctamente.")
        .then((value) => {
          this.obtenerComentarios(this.idT);
        });
      }

      InsertaPregunta2(){
        // tslint:disable-next-line:one-variable-per-declaration
        const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = {'caso': 3, 'tarea': this.Tarea,'idR': this.responsableARealizar, 'idS': this.sucursal,
         'idT': this.idT, 'comentario': this.Comentario,'idU':this.idUsuario
        , 'status' : 2},
            URL: any = this.baseURL + 'tareas.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe( respuesta => {
          this.obtenerComentarios(this.idT);
            });
        if (this.archivos.length > 0) {
              this.servidorarchivo(this.idT, 0);
            } else {
              this.obtenerComentarios(this.idT);
              //this.ngOnInit();
              this.Comentario = '';
              this.cancel = '';
              this.nombredearchivos = [];
              this.archivos = [];
            }
        Swal.fire("Se ha finalizado la tarea correctamente.")
        .then((value) => {
          setTimeout(() => {
            this.router.navigate(['/Tareas_Cordinador']);
          }, 2); // Activate after 2 seconds.
        });
          }
  CancelaPregunta(){
        // tslint:disable-next-line:one-variable-per-declaration
        const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = {'caso': 3, 'tarea': this.Tarea, 'idT': this.idT,'idU':this.idUsuario
        , 'status' : 3, 'cancel' : this.cancel, 'idR': this.responsableARealizar, 'idS': this.sucursal},
            URL: any = this.baseURL + 'tareas.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe( respuesta => {
            });
        this.ngOnInit();
        this.Comentario = '';
        this.cancel = '';
        Swal.fire("Se ha cancelado la tarea correctamente.")
      .then((value) => {
        this.myModal.nativeElement.click();
        setTimeout(() => {
          this.router.navigate(['/Tareas_Cordinador']);
        }, 2); // Activate after 2 seconds.
      });
          }

  onFileChanged(event) {
            for  (var i =  0; i <  event.target.files.length; i++)  {
              this.archivos.push(event.target.files[i]);
              this.nombredearchivos.push(event.target.files[i].name);
              var ext= (event.target.files[i].name.substring(event.target.files[i].name.lastIndexOf('.')+1)).toLowerCase();
              this.tipodearchivo.push(ext);
          }
          // for (let index = 0; index < event.target.files[0].name.length; index++) {
          //   this.nombredearchivos.push(event.target.files[0].name[index]);
          // }
          console.log(this.nombredearchivos);
          console.log(this.archivos);
          }
  quitararchivo(i){
    this.archivos.splice(i,1);
    this.nombredearchivos.splice(i,1);
    this.tipodearchivo.splice(i,1);
    console.log(this.nombredearchivos);
    console.log(this.archivos);
    (<HTMLInputElement>document.getElementById('archivo')).value = '';
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
  eliminaArchivos(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 5, idA : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.arch = respuesta;
      });
      this.ngOnInit();
  }

  servidorarchivo(idT, idEmp) {
    const formData = new FormData();
    for  (var i =  0; i <  this.archivos.length; i++)  {
      formData.append("file[]",  this.archivos[i]);
  }
    formData.append('idtarea', idT);
    formData.append('idcita', '0');
    formData.append('idEmp', idEmp);
    Swal.fire('Verificando Archivos');
    Swal.showLoading();
    this.subirarchivo.enviararchivo(formData).subscribe(
      resp => {
        if (resp.toString() !== '') {
          Swal.hideLoading();
          Swal.fire('Agregado correctamente', '', 'success');
          this.obtenerComentarios(this.idT);
          this.obtenerArchivos(this.idT)
          //this.ngOnInit();
          this.Comentario = '';
          this.cancel = '';
          this.nombredearchivos = [];
          this.archivos = [];
        } else {
          console.log('ocurrio un error');
          this.nombredearchivos = [];
          this.archivos = [];
        }
      },
    );
  }

  obtenerUsuarios(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 6, idU : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usersS = respuesta;
        // console.log(this.tarea);
      });
  }
  obtenerSucursales(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 8, 'idE' : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucusS = respuesta;
        // console.log(this.tarea);
      });
  }
  obtenerSucursalE(id) {
    const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
    const options: any = { 'caso' : 7, 'idS' : id };
    const URL: any = this.baseURL + 'tareas.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.sucusSE = respuesta;
        // console.log(this.tarea);
      });
  }
  enviarpreguntaenter (keyEvent) {
    if (keyEvent.shiftKey != 1) {
      if (keyEvent.keyCode == 13) {
        this.InsertaPregunta();
      }
    }
}
}

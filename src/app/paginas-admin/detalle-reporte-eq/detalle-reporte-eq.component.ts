import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
// jQuery Sign $
declare let $: any;

@Component({
  selector: 'app-detalle-reporte-eq',
  templateUrl: './detalle-reporte-eq.component.html',
  styleUrls: ['./detalle-reporte-eq.component.css']
})
export class DetalleReporteEqComponent implements OnInit {
  private baseURL = "http://192.168.1.61/lum/";
  idU = "";
  idEq = "";
  idUsuario = "";
  info = [];
  lider: any = [];
  equipo: any = [];
  empresas: any = [];
  selectemp: any = [];
  prospectos: any = [];
  id = "";
  idequipo: number;
  loginForm1: FormGroup;
  error = '';
  error2 = '';
  password_type: string = 'password';
  password_type1: string = 'password';
  password_type2: string = 'password';
  visible = false;
  vercontrasena = false;
  visible1 = false;
  visible2 = false;
  vercontrasena1 = false;
  vercontrasena2 = false;
  cambio: any = [];
  submitted = false;
  submitted1 = false;
  usuario: any = [];

  @ViewChild("myModal", { static: false }) myModal: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {
    const info1 = localStorage.getItem("usuariolumi");
    const info2 = info1.replace("[", "").replace("]", "").replace("", "");
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"', "").replace('"', "");
    console.log(this.idUsuario);
    this.route.params.subscribe(parametros => {
      this.idequipo = parametros['idEq'];
    });
     }

  ngOnInit() {
    this.obtenerlider(this.idequipo);
    this.loginForm1 = this.formBuilder.group({
      password2: ['', [Validators.required]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  get ff() { return this.loginForm1.controls; }

  onSubmit1() {
    console.log(this.ff.password.value, this.ff.password1.value, this.ff.password2.value);
    this.submitted1 = true;
    // stop here if form is invalid
    if (this.loginForm1.invalid) {
      console.log('invalido');
      return;
    } else {
      if (this.ff.password.value === this.ff.password1.value) {
        const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options: any = { 'caso': 4.1, 'Password': this.ff.password.value, 'idUsuario': this.id };
        const URL: any = this.baseURL + 'perfil.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
          respuesta => {
            this.cambio = respuesta;
            console.log(this.cambio);
            if (this.cambio !== 0) {
              Swal.hideLoading();
              Swal.fire('Constraseña actualizada Correctamente', '', 'success');
            } else {
              Swal.hideLoading();
              Swal.fire('Ocurrio un error intentelo nuevamente', '', 'error');
            }
          });
      } else {
        Swal.hideLoading();
        Swal.fire('Las contraseñas no coiciden', '', 'warning');
      }

    }
    this.myForm.resetForm();
    this.submitted1 = false;
  }

  vercontra() {
    if (this.visible === false) {
      this.password_type = this.password_type === 'text' ? 'password' : 'text';
      this.visible = true;
    } else {
      this.password_type = this.password_type === 'password' ? 'password' : 'password';
      this.visible = false;
    }

  }

  vercontra2() {
    if (this.visible2 === false) {
      this.password_type2 = this.password_type2 === 'text' ? 'password' : 'text';
      this.visible2 = true;
    } else {
      this.password_type2 = this.password_type2 === 'password' ? 'password' : 'password';
      this.visible2 = false;
    }
  }

  vercontra1() {
    if (this.visible1 === false) {
      this.password_type1 = this.password_type1 === 'text' ? 'password' : 'text';
      this.visible1 = true;
    } else {
      this.password_type1 = this.password_type1 === 'password' ? 'password' : 'password';
      this.visible1 = false;
    }
  }

  dataChanged(newObj) {
    this.vercontrasena = true;
  }
  dataChanged1(newObj) {
    this.vercontrasena1 = true;
  }
  dataChanged2(newObj) {
    this.vercontrasena2 = true;
  }
  borrar() {
    this.error = '';
  }
  borrar2() {
    this.error2 = '';
  }

  // obteneridequipo(idU) {
  //   const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const options: any = { 'caso': 0, 'idUsuario': idU };
  //   const URL: any = this.baseURL + 'perfil.php';
  //   this.http.post(URL, JSON.stringify(options), headers).subscribe(
  //     respuesta => {
  //       this.lider = respuesta;
  //       this.idequipo = this.lider[0].Equipos_idEquipos;

  //       console.log(this.idequipo);
  //     });
  // }
  obtenerlider(idE) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 0.1, 'idEquipo': idE };
    const URL: any = this.baseURL + "perfil.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.lider = respuesta;
        this.idU = this.lider[0].idLider;
        this.obtenerintegrantes(this.idequipo, this.idU);
        this.obtenerempresa(this.idU);
        this.obtenerprospecto(this.idU);
        this.obtenerusuario(this.idU)
      });
  }

  obtenerusuario(idU) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 0, 'idUsuario': idU };
    const URL: any = this.baseURL + 'perfil.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.usuario = respuesta;
      });
  }

  obtenerempresa(idU) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 6, 'idUsuario': idU };
    const URL: any = this.baseURL + "perfil.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.empresas = respuesta;
      });
  }

  obtenerprospecto(idU) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 7, idUsuario: idU };
    const URL: any = this.baseURL + "perfil.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.prospectos = respuesta;
      });
  }

  obtenerintegrantes(idE,idU) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 3, idEquipo: idE, idUsuario: idU };
    const URL: any = this.baseURL + "perfil.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.equipo = respuesta;
        console.log(this.equipo);
      });
  }

  desactivar(id, idE) {
    console.log(id);
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 2, idUsuario: id };
    const URL: any = this.baseURL + "usuario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.obtenerintegrantes(this.idequipo, this.idU);
      });
  }

  activar(id) {
    console.log(id);
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 1, 'idUsuario': id };
    const URL: any = this.baseURL + 'usuario.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.obtenerintegrantes(this.idequipo, this.idU);
      });
  }

  obtenerselect(id) {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 2, 'idEmp': id };
    const URL: any = this.baseURL + 'prospectos.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.selectemp = respuesta;
      });
  }

  openModel(idU) {
    this.id = idU;
    $(this.myModal.nativeElement).modal("show");
  }
  closeModel() {
    this.myModal.nativeElement.className = "modal hide";
  }

  @ViewChild('regForm', { static: false }) myForm: NgForm;

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.component.html',
  styleUrls: ['./cambiar-contra.component.css']
})
export class CambiarContraComponent implements OnInit {

  private baseURL = 'http://192.168.1.61/lum/'

  loginForm: FormGroup;
  loginForm1: FormGroup;
  loading = false;
  submitted = false;
  submitted1 = false;
  returnUrl: string;
  returnUrl1: string;
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
  vista = 1;
  idUsuario = '';
  info = [];
  cambio: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient) {
    const info1 = localStorage.getItem('usuariolumi');
    const info2 = info1.replace("[", '').replace("]", '').replace("", '');
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"', '').replace('"', '');
    console.log(this.idUsuario);
  }



  ngOnInit() {
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
        const options: any = { 'caso': 4, 'Password': this.ff.password.value, 'Password2': this.ff.password2.value, 'idUsuario': this.idUsuario };
        const URL: any = this.baseURL + 'perfil.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
          respuesta => {
            this.cambio = respuesta;
            console.log(this.cambio);
            if (this.cambio == 0) {
              this.error = 'su contraseña actual no es correcta';
              setTimeout(() => {
                this.error = '';
              }, 5000);
            } else {
              this.error2 = 'contraseña actualizada correctamente';
              setTimeout(() => {
                this.error2 = '';
              }, 5000);
            }
          });
      } else {
        this.error = 'las contraseñas no coiciden';
        setTimeout(() => {
          this.error = '';
        }, 5000);
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


  @ViewChild('regForm', { static: false }) myForm: NgForm;

}

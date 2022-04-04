import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {


  private baseURL = 'http://192.168.1.61/lum/';

  loginForm: FormGroup;
  loginForm1: FormGroup;
  loading = false;
  submitted = false;
  submitted1 = false;
  returnUrl: string;
  returnUrl1: string;
  error = '';
  password_type: string = 'password';
  password_type1: string = 'password';
  visible = false;
  vercontrasena = false;
  visible1 = false;
  vercontrasena1 = false;
  vista = 1;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/Inicio']);
    }
  }

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
    this.vista = 1;
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]],
  });

  this.loginForm1 = this.formBuilder.group({
    password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
});

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'Inicio';

  }

  get f() { return this.loginForm.controls; }

  get ff() { return this.loginForm1.controls; }

  onSubmit() {
    console.log(this.f.username.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }else{
      const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
      const options: any = { 'caso': 1, 'email': this.f.username.value };
      const URL: any = this.baseURL + 'acceso.php';
      this.http.post(URL, JSON.stringify(options), headers).subscribe(
        respuesta => {
          if (respuesta.toString() === '0')
          {
                this.error = 'El usuario ' + this.f.username.value + ' no esta registrado';
          }
           if (respuesta.toString() === '1')
           {
            this.vista = 2;
            this.error = '';
           }
        });
    }
}

onSubmit1() {
  console.log(this.ff.password.value,this.ff.password1.value);
  this.submitted1 = true;


  // stop here if form is invalid
  if (this.loginForm1.invalid) {
      return;
  }else{
    if (this.ff.password.value === this.ff.password1.value) {
        const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
        const options: any = { 'caso': 2, 'email': this.f.username.value, 'Password1' : this.ff.password.value };
        const URL: any = this.baseURL + 'acceso.php';
        this.http.post(URL, JSON.stringify(options), headers).subscribe(
          respuesta => {
            if (respuesta.toString() === '0')
            {
                  this.error = 'Intente mas tarde';
            }
             if (respuesta.toString() === '1')
             {
               this.iniciar(this.f.username.value,this.ff.password.value);
             }
          });
    } else {
      this.error = 'Las contraseñas no coinciden';
    }


  }

}

iniciar(user,pass) {
  this.loading = true;
  this.authenticationService.login(user, pass)
      .pipe(first())
      .subscribe(
          data => {
              var info = data.toString();
              if(info !== '0' && info !== 'El usuario no esta registrado'){

                this.router.navigate([this.returnUrl]);
                this.authenticationService.setUser(data);
                const token = data;

              }

          });
}

vercontra(){
  if(this.visible === false) {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
    this.visible = true;
  } else {
    this.password_type = this.password_type === 'password' ? 'password' : 'password';
    this.visible   = false;
  }

}

vercontra1(){
  if(this.visible1 === false) {
    this.password_type1 = this.password_type1 === 'text' ? 'password' : 'text';
    this.visible1 = true;
  } else {
    this.password_type1 = this.password_type1 === 'password' ? 'password' : 'password';
    this.visible1   = false;
  }

}

dataChanged(newObj) {
  this.vercontrasena = true;
}

dataChanged1(newObj) {
  this.vercontrasena1 = true;
}

borrar(){
  this.error = '';
}



}

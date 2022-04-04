import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private baseURL = 'https://animatiomx.com/keller/';

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  returnUrl1: string;
  error = '';
  password_type: string = 'password';
  visible = false;
  vercontrasena = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/Sel-Perfil']);
  }
   }

    emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['andres@lumi.com', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]],
      password: ['Asdf1234!', Validators.required]
  });

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'Sel-Perfil';

  console.log(this.returnUrl)

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.f.username.value, this.f.password.value);
    this.submitted = true;
    

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                var info = data.toString();
                if (info === '0') {
                  this.error = 'La contraseña es incorrecta';
                  this.loading = false;
                }
                if (info === 'El usuario no esta registrado') {
                  this.error = 'El usuario ' + this.f.username.value +  ' no esta registrado';
                  this.loading = false;
                }
                if(info !== '0' && info !== 'El usuario no esta registrado'){

                  this.router.navigate([this.returnUrl]);
                  this.authenticationService.setUser(data);
                 
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

dataChanged(newObj) {
  this.vercontrasena = true;
}



}

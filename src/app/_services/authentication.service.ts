import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private baseURL = 'https://animatiomx.com/keller/acceso.php';
    info: any = [];

    token;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('usuariolumi')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const url_api = 'http://192.168.1.61/lum/acceso.php';
        return this.http.post<any>(url_api, { 'email': username, 'password': password, 'caso':0 })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let info = user.toString();
                if (info > '0' && info !== 'El usuario no esta registrado') {
                    localStorage.setItem('usuariolumi', user.toke);
                    this.currentUserSubject.next(user);
                    return user;

                } else {
                    localStorage.setItem('usuariolumi', '0');
                    this.currentUserSubject.next(user);
                    return user;
                }

            }));
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('usuariolumi');
        localStorage.removeItem("accessToken");
        this.currentUserSubject.next(null);
    }

    setUser(user: User): void {
        
        this.info = JSON.stringify([user[0],user[2],user[3]]);
        console.log(this.info)
        localStorage.setItem("usuariolumi", this.info);
    }

    setToken(token): void {
        localStorage.setItem("accessToken", token);
      }

      getToken() {
        return localStorage.getItem("accessToken");
      }
}

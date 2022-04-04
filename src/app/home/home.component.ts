import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private baseURL = 'http://192.168.1.61/lum/';
  calendarPlugins = [dayGridPlugin, timeGridPlugin];
  localMx = esLocale;
  info = [];
  rol = '';
  idUsuario = '';
  usuario: any = [];
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    const info1 = localStorage.getItem('usuariolumi');

    const info2 = info1.replace("[","").replace("]","").replace("","");

    this.info = info2.split(",");

    this.idUsuario = this.info[0];

    this.rol = this.info[2];

    if (this.rol.toString() !== '"1"') {
      this.router.navigate(['/Sel-Perfil']);
    }

   }

  ngOnInit() {
    this.infouser();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

infouser(){
  const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
  const options: any = { 'caso': 0, 'idUsuario': this.idUsuario};
  const URL: any = this.baseURL + 'usuario.php';
  this.http.post(URL, JSON.stringify(options), headers).subscribe(
    respuesta => {
      this.usuario = respuesta;
    });
}

}

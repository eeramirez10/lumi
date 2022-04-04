import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seleccionar-perfil',
  templateUrl: './seleccionar-perfil.component.html',
  styleUrls: ['./seleccionar-perfil.component.css']
})
export class SeleccionarPerfilComponent implements OnInit {

  info = [];
  rol = '';
  idUsuario = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const info1 = localStorage.getItem('usuariolumi');

    const info2 = info1.replace("[","").replace("]","").replace("","");

    this.info = info2.split(",");

    this.idUsuario = this.info[0];

    this.rol = this.info[2];

    if (this.rol.toString() === '"1"') {
      this.router.navigate(['/Citas_Asesor']);
    }
    if (this.rol.toString() === '"0"') {
      this.router.navigate(['/Prospectar_Asesor']);
    }
    if (this.rol.toString() === '"2"') {
      this.router.navigate(['/Calendario_Cordinador']);
    }
    if (this.rol.toString() === '"3"') {
      this.router.navigate(['/Prospectos_Admin']);
    }
   }

  ngOnInit() {
  }

}

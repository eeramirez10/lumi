// / <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
// import {}  from 'googlemaps';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import * as moment from 'moment'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-prospectar',
  templateUrl: './prospectar.component.html',
  styleUrls: ['./prospectar.component.css']
})
export class ProspectarComponent implements OnInit, AfterViewInit {
  private baseURL = 'http://192.168.1.61/lum/';
  autocompleteInput: string;
  queryWait: boolean;
  prospectForm: FormGroup;
  submitted1 = false;
  fecha = "";
  error2 = '';
  error = '';
  info = [];
  idUsuario = '';
  idtarea: any = [];
  archivos: string[] = [];
  nombredearchivos: any = [];
  idarchivo: any = [];
  tipodearchivo: any = [];
  nombrear = '';
  previewUrl: any = [];
  validar: any = [];
  public mdlSampleIsOpen: boolean = false;
  public mdlSampleIsOpen2: boolean = false;

  @ViewChild('content', { static: false }) content: any;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', { static: false }) addresstext: any;
  @ViewChild('nombremp', { static: false }) nombremp: any;

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'MX' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

  constructor(private formBuilder: FormBuilder, public route: ActivatedRoute, private http: HttpClient, private router: Router, private subirarchivo: SubirarchivoService ) {
    const info1 = localStorage.getItem('usuariolumi');
    const info2 = info1.replace("[", '').replace("]", '').replace("", '');
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"', '').replace('"', '');
    console.log(this.idUsuario);
   }

  ngOnInit() {
    this.fecha = moment().format("YYYY-MM-DD hh:mm:ss");
    console.log(this.fecha);

    this.prospectForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      rfc: ['', [Validators.required, Validators.maxLength(13)]],
      contacto: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  get ff() { return this.prospectForm.controls; }

  onSubmit() {
    this.submitted1 = true;
    if (this.prospectForm.invalid) {
      console.log('invalido');
      return;
    } else {
      this.validarbasededatos();
    }
  }

  validarbasededatos() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 11, 'nomE': this.ff.nombre.value, 'dirE': this.addresstext.nativeElement.value, 'rfc': this.ff.rfc.value };
    const URL: any = this.baseURL + 'prospectos.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.validar = respuesta;

        if (this.validar == null) {
          console.log('guardar');
          this.guardarprospecto();
        } else {
          var Seguimiento = this.validar[0].Nombre;
          console.log('este registro ya existe');
          Swal.fire(
            "El prospecto ya existe le esta dando seguimiento:\n" +
              Seguimiento +
              "",
            "",
            "error"
          );
        }
      });
  }

  validarbasededatos2() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 10, 'nomE': this.ff.nombre.value, 'dirE': this.addresstext.nativeElement.value };
    const URL: any = this.baseURL + 'prospectos.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        this.validar = respuesta;
        if (this.validar == null) {
          console.log('guardar');
          this.guardarprospecto2();
        } else {
          var Seguimiento = this.validar[0].Nombre;
          Swal.fire(
            "El prospecto ya existe le esta dando seguimiento:\n" +
              Seguimiento +
              "",
            "",
            "error"
          );
        }
      });
  }

  guardarprospecto() {
    console.log(this.ff.nombre.value, this.addresstext.nativeElement.value, this.ff.contacto.value, this.ff.telefono.value);
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 15, 'idUs': this.idUsuario, 'Namepros': this.ff.nombre.value, 'Dirpros': this.addresstext.nativeElement.value, 'rfc': this.ff.rfc.value, 'Contacpros': this.ff.contacto.value,'Correopros': this.ff.correo.value, 'Telpros': this.ff.telefono.value, 'fecha': this.fecha, 'asigno':null};
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        if (this.archivos.length > 0) {
          const idtarea = respuesta.toString();
          this.servidorarchivo(idtarea);
        } else {
          Swal.fire('El prospecto se envio correctamente', '', 'success')
            .then((value) => {
              setTimeout(() => {
                this.router.navigate(['/Prospectar_Asesor']);
              }, 2); // Activate after 2 seconds.
            });
          this.inicializarcariables();
          this.myForm.resetForm();
          this.submitted1 = false;
        }
      });
  }

  guardarprospecto2() {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 15.1, 'idUs': this.idUsuario, 'Namepros': this.ff.nombre.value, 'Dirpros': this.addresstext.nativeElement.value, 'fecha': this.fecha };
    const URL: any = this.baseURL + 'detalle_cita.php';
    this.http.post(URL, JSON.stringify(options), headers).subscribe(
      respuesta => {
        if (this.archivos.length > 0) {
          const idtarea = respuesta.toString();
          this.servidorarchivo(idtarea);
        } else {
          Swal.fire("El prospecto se envio correctamente", "", "success")
            .then((value) => {
              setTimeout(() => {
                this.router.navigate(['/Prospectar_Asesor']);
              }, 2); // Activate after 2 seconds.
            });
          this.inicializarcariables();
          this.myForm.resetForm();
          this.submitted1 = false;
        }
      });
  }

  public openModal(open: boolean): void {
    this.mdlSampleIsOpen = open;
  }
  public openModal2(open: boolean): void {
    this.mdlSampleIsOpen2 = open;
  }

  borrar() {
    this.error = '';
  }

  borrar2() {
    this.error2 = '';
  }

  inicializarcariables() {
    this.archivos = [];
    this.previewUrl=[];
    this.nombredearchivos = [];
    this.tipodearchivo = [];
  }

  onFileChanged(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewUrl.push(event.target.result);
      }
      reader.readAsDataURL(event.target.files[i]);
      this.archivos.push(event.target.files[i]);
      this.nombredearchivos.push(event.target.files[i].name);
      var ext = (event.target.files[i].name.substring(event.target.files[i].name.lastIndexOf('.') + 1)).toLowerCase();
      this.tipodearchivo.push(ext);

    }
    // for (let index = 0; index < event.target.files[0].name.length; index++) {
    //   this.nombredearchivos.push(event.target.files[0].name[index]);
    // }
    console.log(this.nombredearchivos);
    console.log(this.archivos);
    console.log(this.tipodearchivo);
  }

  quitararchivo(i) {
    this.archivos.splice(i, 1);
    this.previewUrl.splice(i, 1);
    this.nombredearchivos.splice(i, 1);
    this.tipodearchivo.splice(i, 1);
    console.log(this.nombredearchivos);
    console.log(this.archivos);
    console.log(this.tipodearchivo);
    (<HTMLInputElement>document.getElementById('archivo')).value = '';
  }

  servidorarchivo(idtarea) {
    const formData = new FormData();
    for (var i = 0; i < this.archivos.length; i++) {
      formData.append("file[]", this.archivos[i]);
    }
    formData.append('idEmp', idtarea);
    formData.append('idtarea', '0');
    formData.append('idcita', '0');
    Swal.fire('Guardando prospecto');
    Swal.showLoading();
    this.subirarchivo.enviarimagen(formData).subscribe(
      resp => {
        if (resp.toString() !== '') {
          Swal.hideLoading();
          Swal.fire('El prospecto se envio correctamente', '', 'success')
            .then((value) => {
              setTimeout(() => {
                this.router.navigate(['/Prospectar_Asesor']);
              }, 2); // Activate after 2 seconds.
            });
          this.archivos = [];
          this.previewUrl = [];
          this.nombredearchivos = [];
          this.tipodearchivo = [];
          this.myForm.resetForm();
          this.submitted1 = false;
        } else {
          Swal.hideLoading();
          Swal.fire('Ocurrio un Error intentelo de nuevo', '', 'error');
          this.archivos = [];
          this.previewUrl = [];
          this.nombredearchivos = [];
          this.tipodearchivo = [];
          this.myForm.resetForm();
          this.submitted1 = false;
        }
      },
    );
  }
  @ViewChild('regForm', { static: false }) myForm: NgForm;
}

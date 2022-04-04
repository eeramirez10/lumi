
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicesService } from '../../services/services.service';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: "app-detalle-prospectos",
  templateUrl: "./detalle-prospectos.component.html",
  styleUrls: ["./detalle-prospectos.component.css"],
})
export class DetalleProspectosComponent implements OnInit {
  private baseURL = "http://192.168.1.61/lum/";
  lider: any = [];
  idequipo: number;
  idUs = "";
  idAsigno = "";
  prospectos: any = [];
  sucursales: any = [];
  misprospectos: any = [];
  equipo: any = [];
  aceptados: any = [];
  selectemp: any = [];
  asigno: any = [];
  fotoFinal: any;
  fileData: File = null;
  previewUrl: any = null;
  p = "";
  public respuestaImagenEnviada;
  public resultadoCarga;
  foto = "";
  selectedFile: null;
  nombrefoto: any;

  autocompleteInput: string;
  queryWait: boolean;
  prospectForm: FormGroup;
  submitted1 = false;
  fecha = "";
  error2 = "";
  error = "";
  info = [];
  idUsuario = "";
  idtarea: any = [];
  reasignar = "";
  imagenes: any = [];
  public mdlSampleIsOpen: boolean = false;
  public mdlSampleIsOpen2: boolean = false;

  @ViewChild("closeModal", { static: false }) closeModal: ElementRef;
  @ViewChild("closeModal1", { static: false }) closeModal1: ElementRef;
  @ViewChild("nombre", { static: false }) nombre: ElementRef;
  @ViewChild("dir", { static: false }) dir: ElementRef;
  @ViewChild("contacto", { static: false }) contacto: ElementRef;
  @ViewChild("telefono", { static: false }) telefono: ElementRef;
  @ViewChild("correo", { static: false }) correo: ElementRef;
  @ViewChild("comentario", { static: false }) comentario: ElementRef;
  @ViewChild("Nombresuc", { static: false }) Nombresuc: ElementRef;
  @ViewChild("Direccionsuc", { static: false }) Direccionsuc: ElementRef;

  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild("addresstext", { static: false }) addresstext: any;

  ngAfterViewInit() {
    // this.getPlaceAutocomplete();
  }

  // private getPlaceAutocomplete() {
  //   const autocomplete = new google.maps.places.Autocomplete(
  //     this.addresstext.nativeElement,
  //     {
  //       componentRestrictions: { country: "MX" },
  //       types: [this.adressType], // 'establishment' / 'address' / 'geocode'
  //     }
  //   );
  //   google.maps.event.addListener(autocomplete, "place_changed", () => {
  //     const place = autocomplete.getPlace();
  //     this.invokeEvent(place);
  //   });
  // }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

  constructor(
    private formBuilder: FormBuilder,
    private enviandoImagen: ServicesService,
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    const info1 = localStorage.getItem("usuariolumi");
    const info2 = info1.replace("[", "").replace("]", "").replace("", "");
    this.info = info2.split(",");
    this.idUsuario = this.info[0].replace('"', "").replace('"', "");
    console.log(this.idUsuario + " Es el id de este usuario");
  }

  ngOnInit() {
    this.obtenermisprospectos();
    this.obtenerprospectos();
    this.obteneraceptados();
    this.fecha = moment().format("YYYY-MM-DD hh:mm:ss");
    this.prospectForm = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      rfc: ["", [Validators.required]],
      contacto: ["", [Validators.required]],
      telefono: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    this.obteneridequipo(this.idUsuario);
  }

  get ff() {
    return this.prospectForm.controls;
  }

  onSubmit() {
    this.submitted1 = true;
    if (this.prospectForm.invalid) {
      console.log("invalido");
      return;
    } else {
      this.guardarprospecto();
    }
  }

  obtenersucursales(id) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 7, idEmp: id };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.sucursales = respuesta;
        console.log(this.sucursales);
      });
  }

  guardarprospecto() {
    console.log(
      this.ff.nombre.value,
      this.addresstext.nativeElement.value,
      this.ff.contacto.value,
      this.ff.telefono.value
    );
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 15,
      idUs: this.idUsuario,
      Namepros: this.ff.nombre.value,
      Dirpros: this.addresstext.nativeElement.value,
      rfc: this.ff.rfc.value,
      Contacpros: this.ff.contacto.value,
      Telpros: this.ff.telefono.value,
    };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.idtarea = respuesta;
        console.log(this.idtarea);
        if (this.idtarea > 0 && this.idtarea != null) {
          console.log("abrir modal");
        } else {
          this.error = "hubo un error por favor intente de nuevo";
          setTimeout(() => {
            this.error = "";
          }, 4000);
        }
      });
    this.myForm.resetForm();
    this.submitted1 = false;
  }

  guardarprospecto2() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 15.1,
      idUs: this.idUsuario,
      Namepros: this.ff.nombre.value,
      Dirpros: this.addresstext.nativeElement.value,
    };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.myForm.resetForm();
      });
  }

  obtenerprospectos() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 0 };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.prospectos = respuesta;
        console.log(this.prospectos);
      });
  }

  obtenermisprospectos() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 12, idUsuario: this.idUsuario };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.misprospectos = respuesta;
        console.log(this.misprospectos);
      });
  }

  obteneraceptados() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 1 };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.aceptados = respuesta;
        console.log(this.aceptados);
      });
  }

  obtenerselect(id) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 2, idEmp: id };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.selectemp = respuesta;
        this.idAsigno = this.selectemp[0].Asignada_por;
        console.log(this.selectemp);
        this.obtenerasigno(this.idAsigno);
        this.obtenerimagenes(id);
        this.obtenersucursales(id);
      });
  }

  obtenerimagenes(idE) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 13, idEmp: idE };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.imagenes = respuesta;
      });
  }

  obtenerasigno(id) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 9, idUsuario: id };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.asigno = respuesta;
        console.log(this.asigno);
      });
  }

  dataChanged() {
    console.log(this.reasignar);
  }

  async eliminarsuc(id, idE) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 7.1, idEmp: id };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => { });
    await this.obtenersucursales(idE);
  }

  async agregarsuc(idEmpre) {
    //alert(this.Nombresuc.nativeElement.value)
    if (this.Nombresuc.nativeElement.value == "") {
      Swal.hideLoading();
      Swal.fire("El nombre no puede estar vacio", "", "error");
      return;
    } else {
      if (this.Direccionsuc.nativeElement.value == "") {
        Swal.hideLoading();
        Swal.fire("La dirección no pueden estar vacia", "", "error");
        return;
      } else {
        console.log(
          this.Nombresuc.nativeElement.value,
          this.Direccionsuc.nativeElement.value
        );
        const headers: any = new HttpHeaders({
          "Content-Type": "application/json",
        });
        const options: any = {
          caso: 8,
          idEmp: idEmpre,
          nomE: this.Nombresuc.nativeElement.value,
          dirE: this.Direccionsuc.nativeElement.value,
        };
        const URL: any = this.baseURL + "prospectos.php";
        this.http
          .post(URL, JSON.stringify(options), headers)
          .subscribe((respuesta) => { this.obtenersucursales(idEmpre); });
        await this.obtenersucursales(idEmpre);
        Swal.hideLoading();
        Swal.fire("sucursal agregada Exitosamente", "", "success");
        this.Nombresuc.nativeElement.value = "";
        this.Direccionsuc.nativeElement.value = "";
      }
    }
  }

  aceptar(ida) {
    if (this.reasignar != "") {
      console.log("reasignar" + this.reasignar);
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {
        caso: 3,
        idEmp: ida,
        fecha: this.fecha,
        idUsuario: this.reasignar,
      };
      const URL: any = this.baseURL + "prospectos.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          Swal.hideLoading();
          Swal.fire("Su prospecto se envio a Empresas", "", "success");
          this.ngOnInit();
        });
      this.closeModal.nativeElement.click();
    } else {
      console.log("no reasignar");
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = {
        caso: 3.1,
        idEmp: ida,
        fecha: this.fecha,
      };
      const URL: any = this.baseURL + "prospectos.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          Swal.hideLoading();
          Swal.fire("Su prospecto se envio a Empresas", "", "success");
          this.ngOnInit();
        });
      this.closeModal.nativeElement.click();
    }
  }
  rechazar(idr) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 4, idEmp: idr, fecha: this.fecha };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        Swal.hideLoading();
        Swal.fire("Empresa a sido rechazada", "", "error");
        this.closeModal.nativeElement.click();
        this.ngOnInit();
      });
  }

  guardar(idE) {
    console.log(
      this.nombre.nativeElement.value,
      this.dir.nativeElement.value,
      this.contacto.nativeElement.value,
      this.telefono.nativeElement.value,
      this.correo.nativeElement.value,
      this.comentario.nativeElement.value
    );
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 6,
      idEmp: idE,
      nomE: this.nombre.nativeElement.value,
      dirE: this.dir.nativeElement.value,
      conE: this.contacto.nativeElement.value,
      telE: this.telefono.nativeElement.value,
      correoE: this.correo.nativeElement.value,
      comentE: this.comentario.nativeElement.value,
    };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        Swal.hideLoading();
        Swal.fire("Cambios guardados Exitosamente", "", "success");
        this.closeModal1.nativeElement.click();
        this.ngOnInit();
      });
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
    };
  }

  // Obtiene el nombre y cambia el mismo de la foto subida
  onFileChanged(event, files: FileList, fileInput: any, idE) {
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
    this.updatefoto(idE);
  }
  // Sube imagen a servidor
  public cargandoImagen(files: FileList, nombre: string) {
    this.enviandoImagen.postFileImagen(files[0], nombre).subscribe(
      (response) => {
        this.respuestaImagenEnviada = response;
        if (this.respuestaImagenEnviada <= 1) {
          console.log("Error en el servidor");
        } else {
          if (
            this.respuestaImagenEnviada.code == 200 &&
            this.respuestaImagenEnviada.status == "success"
          ) {
            this.resultadoCarga = 1;
          } else {
            this.resultadoCarga = 2;
          }
        }
      },
      (error) => {
        console.log(<any>error);
      }
    ); // FIN DE METODO SUBSCRIBE
  }
  obteneridequipo(idU) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 0, idUsuario: idU };
    const URL: any = this.baseURL + "perfil.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.lider = respuesta;
        this.idequipo = this.lider[0].Equipos_idEquipos;
        this.obtenerintegrantes(this.idequipo);
        console.log(this.idequipo);
      });
  }
  obtenerintegrantes(idE) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 16, idEquipo: idE, idUsuario: this.idUsuario };
    const URL: any = this.baseURL + "perfil.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.equipo = respuesta;
        console.log(this.equipo);
      });
  }

  obtenerprospectosU() {
    if (this.idUs !== "") {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 0.1, idUsuario: this.idUs };
      const URL: any = this.baseURL + "prospectos.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          if (respuesta !== null) {
            this.prospectos = respuesta;
            console.log(this.prospectos);
          } else {
            this.prospectos = [];
            console.log("no se hizo nada");
          }
        });
    } else {
      this.obtenerprospectos();
    }
  }

  obteneraceptadosU() {
    if (this.idUs !== "") {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
      });
      const options: any = { caso: 1.1, idUsuario: this.idUs };
      const URL: any = this.baseURL + "prospectos.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          if (respuesta !== null) {
            this.aceptados = respuesta;
            console.log(this.aceptados);
          } else {
            this.aceptados = [];
          }
        });
    } else {
      this.obteneraceptados();
    }
  }

  updatefoto(idE) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 5, foto: this.foto, idEmp: idE };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        console.log("Done");
      });
  }

  borrar() {
    this.error = "";
  }

  borrar2() {
    this.error2 = "";
  }
  @ViewChild("regForm", { static: false }) myForm: NgForm;
}

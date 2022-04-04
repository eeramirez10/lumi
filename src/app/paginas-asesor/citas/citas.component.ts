import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SubirarchivoService } from 'src/app/_services/subirarchivo.service';
import { EventInput } from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import Swal from 'sweetalert2'
moment.locale('es');

@Component({
  selector: "app-citas",
  templateUrl: "./citas.component.html",
  styleUrls: ["./citas.component.css"],
})
export class CitasComponent implements OnInit {

  @HostListener('obtenerifoempresa', ['$event']) 
  @ViewChild("abrirmodal", { static: false }) abrirmodal: ElementRef;
  @ViewChild("abrirmodalmodificar", { static: false })
  abrirmodalmodificar: ElementRef;
  empresasS: ElementRef;
  @ViewChild("abrirdetalle", { static: false }) abrirdetalle: ElementRef;
  @ViewChild("cerrarmodalcrear", { static: false })
  cerrarmodalcrear: ElementRef;
  @ViewChild("cerrarmodalcrear1", { static: false })
  cerrarmodalcrear1: ElementRef;
  private baseURL = "http://192.168.1.61/lum/";
  calendarPlugins = [dayGridPlugin, timeGrigPlugin];
  localMx = esLocale;
  info = [];
  idDelSelect = '';
  rol = "";
  idUsuario = "";
  usuario: any = [];
  calendarEvents: EventInput[] = [{ title: "", start: "" }];
  calendarioinfo: any = [];
  empresasid: any = [];
  empresasid1: any = [];
  empresasid2: any = [];
  empresasinfo: any = [""];
  recordatorioinfO: any = [];
  idempresa = "";
  Motivo = "";
  fechainicio;
  fechafinal;
  horainicial;
  horafinal;
  dia;
  mes;
  horaa: number;
  minutoa: number;
  horaa1 = "";
  minutoa1 = "";
  horainput = "";
  horainput1 = "";
  fechayhorainicial;
  fechayhorafinal;
  arrayfecha: any = [];
  arrayfecha1: any = [];
  idrecordatorio = "";
  idcita = "";
  direccion = "";
  archivofinal: any;
  archivos: string[] = [];
  nombredearchivos: any = [];
  clasemotivo: string = "input form-control";
  clasesel: string = "input form-control";
  claserecor: string = "input form-control";
  claseerrormotivo: string = "";
  claseerrorempresa: string = "";
  claseerrornot: string = "";
  arreglodearchivosbase: any = [];
  sucuO: any = [];
  sucuO2: any = [];
  idSO = "";
  nombreSO = "";
  idEmSel = "";
  idSOseleccionado = "";
  idSucuObraM = "";
  empresabuscador = "";
  tipodearchivo: any = [];
  prospecto = true;
  cprospecto = true;
  csuc = true;
  idUsuario1 = "";
  direccionprincipal = "";
  prospectosid: any = [];
  fechas: any = [];
  config = {
    displayKey: "Nombre_Empresa", // Selecciona quese mostrara en el select
    search: true, // activa la busqueda en el select
    height: '300px', // la altura del select
    placeholder: 'Selecciona una opción', // placeholder
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se hayaron resultados!', // Texto cuando no haya resultados
    searchPlaceholder: 'Selecciona una opción', // placeholder
    searchOnKey: 'Nombre_Empresa', // define con que elemento realizaras la busqueda
    };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private subirarchivo: SubirarchivoService
  ) {
    const info1 = localStorage.getItem("usuariolumi");

    const info2 = info1.replace("[", "").replace("]", "").replace("", "");

    this.info = info2.split(",");

    this.idUsuario = this.info[0];

    console.log(this.idUsuario)

    this.rol = this.info[2];

    if (this.rol.toString() !== '"1"') {
      this.router.navigate(["/Sel-Perfil"]);
    }
    if (this.rol.toString() === '0') {
      this.router.navigate(["/Prospectar_Asesor"]);
    }
  }

  ngOnInit() {
    this.idempresa = "";
    this.Motivo = "";
    this.direccion = "";
    this.idrecordatorio = "";
    this.infouser();
    this.calendario();
    this.recordatorio();
 }
 @HostListener('window:resize', [])
 public onResize(): void {
   
 }

  logout() {
    this.router.navigate(["/login"]);
  }

  infouser() {

    const options: any = { caso: 0, idUsuario: this.idUsuario };
    const URL: any = this.baseURL + "usuario.php";
    this.http
      .post(URL, options)
      .subscribe((respuesta) => {
        this.usuario = respuesta;
        const et = this.usuario[0].Equipos_idEquipos;
        //this.obtenercordinador(et);
        this.empresas();
        this.prospectos();
      });
  }

  // obtenercordinador(EquipoT){
  //   const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
  //   const options: any = { 'caso': 20, 'idEquipoT': EquipoT};
  //   const URL: any = this.baseURL + 'calendario.php';
  //   this.http.post(URL, JSON.stringify(options), headers).subscribe(
  //     respuesta => {
  //       var arr = respuesta;
  //       this.idUsuario1 =arr[0].idUsers;
  //       this.empresas();
  //     });
  // }

  calendario() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      
      
    });
    const options: any = { caso: 0, idUsuario: this.idUsuario };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options))
      .subscribe((respuesta) => {

        console.log(respuesta)
        if (respuesta !== null) {
          this.calendarioinfo = respuesta;
        } else {
          this.calendarioinfo = this.calendarEvents;
        }
      });
  }

  empresas() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
     
    });
    const options: any = { caso: 1, idUsuario: this.idUsuario };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.empresasid1 = respuesta;
      });
  }

  prospectos() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 22, idUsuario: this.idUsuario };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.prospectosid = respuesta;
      });
  }

  // obtenerempresascoordinador(){
  //   const headers: any = new HttpHeaders({'Content-Type' : 'application/json'});
  //   const options: any = { 'caso': 19, 'idUsuario': this.idUsuario1};
  //   const URL: any = this.baseURL + 'calendario.php';
  //   this.http.post(URL, JSON.stringify(options), headers).subscribe(
  //     respuesta => {
  //       this.empresasid2 = respuesta;
  //       this.empresasid = this.empresasid1.concat(this.empresasid2);
  //       console.log(this.empresasid);
  //     });
  // }

  recordatorio() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 2 };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.recordatorioinfO = respuesta;
      });
  }

  @HostListener('change') obtenerifoempresa(event) {

    console.log(event)
  
    this.idDelSelect = event;
    this.cprospecto = false;
    if (this.idempresa !== "") {
      this.clasesel = "input form-control";
      this.claseerrorempresa = "";
    }
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 3, idEmpresa: event };
   
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {

        console.log(respuesta)
        if(!respuesta) return
        this.empresasinfo = respuesta;
        this.direccion = this.empresasinfo[0].Direccion_Empresa;
        this.direccionprincipal = this.empresasinfo[0].Direccion_Empresa;
      });
    this.obtenSucO(event);
  }

  obtenerifoempresa1(objeto) {
    console.log(objeto)
    this.idDelSelect = objeto;
    this.prospecto = false;
    this.idSO = "0";
    if (this.idempresa !== "") {
      this.clasesel = "input form-control";
      this.claseerrorempresa = "";
    }
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 3, idEmpresa: objeto };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.empresasinfo = respuesta;
        this.direccion = this.empresasinfo[0].Direccion_Empresa;
      });
    this.obtenSucO(objeto);
  }

  eventClicked(event) {
    const fecha = new Date();
    const fechahoy = moment().format("YYYY-MM-DD");
    const fechaevento = moment(event.event.start).format("YYYY-MM-DD");
    this.idcita = event.event._def.publicId;
    const status = event.event._def.extendedProps.status;
    console.log(this.idcita);
    console.log(fechahoy);
    console.log(fechaevento);
    console.log(status);
    if (fechaevento >= fechahoy && status === '1') {
      this.abrirmodal.nativeElement.click();
    } else {
      this.router.navigate(["/Citas_Asesor/Detalle_Cita/" + this.idcita]);
    }
  }
  cerrarmodalpagina(abrir) {
    if (abrir === 1) {
      setTimeout(() => {
        this.obtnerinfocita();
        this.obtenerinfoarchivos();
        this.abrirmodalmodificar.nativeElement.click();
      }, 500);
    } else {
      this.abrirdetalle.nativeElement.click();
    }
  }
  decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }
  obtnerinfocita() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 5, idCita: this.idcita };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        const idemp = respuesta[0].idEmpresa;
        this.Motivo = respuesta[0].Motivo;
        this.fechainicio = respuesta[0].FechaI;
        this.horainicial = respuesta[0].HoraI;
        this.fechafinal = respuesta[0].FechaF;
        this.horafinal = respuesta[0].HoraF;
        this.idSucuObraM = respuesta[0].SucursalObra;
        this.nombreSO = respuesta[0].nombreSO;
        this.idrecordatorio = respuesta[0].Recordatorios_idRecordatorios;
        this.fechayhorainicial =
          moment(this.fechainicio).format("dddd DD [de] MMMM [de] YYYY") +
          " " +
          this.horainicial;

        this.fechayhorafinal =
          moment(this.fechafinal).format("dddd DD [de] MMMM [de] YYYY") +
          " " +
          this.horafinal;

        const headers: any = new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        });
        const options: any = { caso: 3, idEmpresa: idemp };
        const URL: any = this.baseURL + "calendario.php";
        this.http
          .post(URL, JSON.stringify(options), headers)
          .subscribe((respuesta) => {
            this.empresasinfo = respuesta;
            this.direccion = this.empresasinfo[0].Direccion_Empresa;
            this.idEmSel = this.empresasinfo[0].idEmpresas;
          });
        this.obtenSucO2(idemp);
      });
  }
  obtenerinfoarchivos() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 6, idCita: this.idcita };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.arreglodearchivosbase = respuesta;
      });
  }

  fecha() {
    const fecha = new Date();
    const fechahoy = moment(fecha).format();
    const fechaelegida = moment(
      this.fechainicio + " " + this.horainicial
    ).format();
    console.log(fechahoy);
    console.log(fechaelegida);
    if (fechahoy > fechaelegida) {
      this.fechayhorainicial = "";
    } else {
      this.fechayhorainicial =
        moment(this.fechainicio).format("dddd DD [de] MMMM [de] YYYY") +
        " " +
        this.horainicial;
    }

    this.fecha1();
  }

  fecha1() {
    const fechainicio = moment(
      this.fechainicio + " " + this.horainicial
    ).format();
    const fechaelegida = moment(
      this.fechafinal + " " + this.horafinal
    ).format();
    if (fechainicio > fechaelegida) {
      this.fechayhorafinal = "";
    } else {
      this.fechayhorafinal =
        moment(this.fechafinal).format("dddd DD [de] MMMM [de] YYYY") +
        " " +
        this.horafinal;
    }
    this.obtenerfechas();
  }

  obtenerfechas() {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = {
      caso: 16,
      fechai: this.fechainicio,
      fechaf: this.fechafinal,
      horai: this.horainicial,
      horaf: this.horafinal,
      idUsuario: this.idUsuario,
    };
    const URL: any = this.baseURL + "calendario.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.fechas = respuesta;
        console.log(this.fechas);
        if (this.fechas !== null) {
          Swal.hideLoading();
          Swal.fire(
            "El colaborador no esta disponible en este horario",
            "",
            "warning"
          );
          this.fechayhorainicial = "";
          this.fechayhorafinal = "";
          this.fechainicio = "";
          this.horainicial = "";
          this.fechafinal = "";
          this.horafinal = "";
          this.idrecordatorio = "";
        }
      });
  }
  inicializarcariables() {
    this.empresasinfo = [""];
    this.idempresa = "";
    this.idrecordatorio = "";
    this.direccion = "";
    this.Motivo = "";
    this.archivos = [];
    this.nombredearchivos = [];
    this.tipodearchivo = [];
    this.idSO = "";
    this.arreglodearchivosbase = [];
    this.clasemotivo = "input form-control";
    this.clasesel = "input form-control";
    this.claserecor = "input form-control";
    this.claseerrormotivo = "";
    this.claseerrorempresa = "";
    this.claseerrornot = "";
    this.prospecto = true;
    this.cprospecto = true;
    this.csuc = true;
    this.empresabuscador = "";
    this.idSucuObraM = "";
    this.direccionprincipal = "";
    this.fechainicio = "";
    this.horainicial = "";
    this.fechafinal = "";
    this.horafinal = "";
    this.fechayhorainicial = "";
    this.fechayhorafinal = "";
  }

  crearcita() {
    if (
      this.Motivo === "" &&
      this.idempresa !== "" &&
      this.idrecordatorio !== ""
    ) {
      this.clasemotivo = "input form-control is-invalid";
      this.claseerrormotivo = "invalid-feedback d-block";
    }
    if (
      this.Motivo !== "" &&
      this.idempresa === "" &&
      this.idrecordatorio !== ""
    ) {
      this.clasesel = "input form-control is-invalid";
      this.claseerrorempresa = "invalid-feedback d-block";
    }
    if (
      this.Motivo !== "" &&
      this.idempresa !== "" &&
      this.idrecordatorio === ""
    ) {
      this.claserecor = "input form-control is-invalid";
      this.claseerrornot = "invalid-feedback d-block";
    }
    if (
      this.Motivo === "" &&
      this.idempresa === "" &&
      this.idrecordatorio === ""
    ) {
      this.clasemotivo = "input form-control is-invalid";
      this.clasesel = "input form-control is-invalid";
      this.claseerrormotivo = "invalid-feedback d-block";
      this.claseerrorempresa = "invalid-feedback d-block";
      this.claserecor = "input form-control is-invalid";
      this.claseerrornot = "invalid-feedback d-block";
    }
    if (
      this.Motivo !== "" &&
      this.idempresa !== "" &&
      this.idrecordatorio !== "" &&
      this.fechayhorafinal !== "" &&
      this.fechayhorainicial !== ""
    ) {
      console.log(
        "direccion " +
          this.direccion +
          "Motivo " +
          this.Motivo +
          "fecha i" +
          this.fechainicio +
          " hora i " +
          this.horainicial +
          "fecha f" +
          this.fechafinal +
          " hora f" +
          this.horafinal +
          "usuario" +
          this.idUsuario +
          "recordatorio" +
          this.idrecordatorio +
          "empresa" +
          this.idempresa
      );

      console.log(this.idempresa);


  
      console.log(this.idDelSelect);

      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      const options: any = {
        caso: 4,
        direccion: this.direccion,
        motivo: this.Motivo,
        fechai: this.fechainicio,
        fechaf: this.fechafinal,
        horai: this.horainicial,
        horaf: this.horafinal,
        idSO: this.idSO,
        idUsuario: this.idUsuario,
        recordatorio: this.idrecordatorio,
        idEmpresa: this.idempresa['idEmpresas']
      }

      const URL: any = this.baseURL + "calendario.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {

          console.log(respuesta)

          if (this.archivos.length > 0) {
            const idcita = respuesta.toString();
            this.servidorarchivo(idcita, this.idDelSelect);
          } else {
            this.cerrarmodalcrear.nativeElement.click();
            Swal.fire("Cita agregada correctamente", "", "success");
            this.inicializarcariables();
            this.ngOnInit();
          }
        });
    }
  }

  onFileChanged(event) {
    console.log(event.target.files);
    for (var i = 0; i < event.target.files.length; i++) {
      this.archivos.push(event.target.files[i]);
      this.nombredearchivos.push(event.target.files[i].name);
      var ext = event.target.files[i].name
        .substring(event.target.files[i].name.lastIndexOf(".") + 1)
        .toLowerCase();
      this.tipodearchivo.push(ext);
    }
    console.log(this.nombredearchivos);
    console.log(this.archivos);
    console.log(this.tipodearchivo);
  }

  quitararchivo(i) {
    this.archivos.splice(i, 1);
    this.nombredearchivos.splice(i, 1);
    this.tipodearchivo.splice(i, 1);
    console.log(this.nombredearchivos);
    console.log(this.archivos);
    console.log(this.tipodearchivo);
    (<HTMLInputElement>document.getElementById("archivo")).value = "";
  }

  servidorarchivo(idcita, idemp) {
    const formData = new FormData();

    for (var i = 0; i < this.archivos.length; i++) {
      formData.append("file[]", this.archivos[i]);
    }
    formData.append("idcita", idcita);
    formData.append("idtarea", "0");
    formData.append("idEmp", idemp);
    Swal.fire("Subiendo archivos");
    Swal.showLoading();
    this.subirarchivo.enviararchivo(formData).subscribe((resp) => {
      if (resp.toString() !== "") {
        Swal.hideLoading();
        Swal.fire("Cita agregada correctamente", "", "success");
        this.inicializarcariables();
        this.cerrarmodalcrear.nativeElement.click();
        this.ngOnInit();
      } else {
        console.log("ocurrio un error");
        this.archivos = [];
      }
    });
  }

  servidorarchivo1(idcita, idEmp) {
    const formData = new FormData();

    for (var i = 0; i < this.archivos.length; i++) {
      formData.append("file[]", this.archivos[i]);
    }
    formData.append("idcita", idcita);
    formData.append("idtarea", "0");
    formData.append("idEmp", idEmp);
    Swal.fire("Subiendo archivos");
    Swal.showLoading();
    this.subirarchivo.enviararchivo(formData).subscribe((resp) => {
      if (resp.toString() !== "") {
        Swal.hideLoading();
        Swal.fire("Cita modificada correctamente", "", "success");
        this.inicializarcariables();
        this.cerrarmodalcrear1.nativeElement.click();
        this.ngOnInit();
      } else {
        console.log("ocurrio un error");
        this.archivos = [];
      }
    });
  }

  dimot(e) {
    if (this.Motivo !== "") {
      this.clasemotivo = "input form-control";
      this.claseerrormotivo = "";
    }
    if (this.Motivo === "") {
      this.clasemotivo = "input form-control  is-invalid";
    }
  }
  recordatorioevent() {
    if (this.idrecordatorio !== "") {
      this.claserecor = "input form-control";
      this.claseerrornot = "";
    }
  }

  eliminararchivo(id) {
    Swal.fire({
      title: "¿Estas seguro que deseas eliminar el archivo?",
      showCancelButton: true,
      confirmButtonColor: "#da0100",
      cancelButtonColor: "#6fb353",
      confirmButtonText: "ELIMINAR",
      cancelButtonText: "CANCELAR",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        Swal.fire("Eliminado!", "Archivo eliminado.", "success");
        const headers: any = new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        });
        const options: any = { caso: 7, idArchivo: id };
        const URL: any = this.baseURL + "calendario.php";
        this.http
          .post(URL, JSON.stringify(options), headers)
          .subscribe((respuesta) => {
            this.obtenerinfoarchivos();
          });
      }
    });
  }

  editarcita() {
    if (
      this.Motivo !== "" &&
      this.idrecordatorio !== "" &&
      this.fechayhorafinal !== "" &&
      this.fechayhorainicial !== ""
    ) {
      console.log(
        "Motivo " +
          this.Motivo +
          "fecha i" +
          this.fechainicio +
          " hora i " +
          this.horainicial +
          "fecha f" +
          this.fechafinal +
          " hora f" +
          this.horafinal +
          "recordatorio" +
          this.idrecordatorio
      );
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      const options: any = {
        caso: 8,
        motivo: this.Motivo,
        fechai: this.fechainicio,
        fechaf: this.fechafinal,
        horai: this.horainicial,
        horaf: this.horafinal,
        recordatorio: this.idrecordatorio,
        idCita: this.idcita,
        idSO2: this.idSucuObraM,
      };
      const URL: any = this.baseURL + "calendario.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          if (this.archivos.length > 0) {
            this.servidorarchivo1(this.idcita, 0);
          } else {
            this.cerrarmodalcrear1.nativeElement.click();
            Swal.fire("Cita modificada correctamente", "", "success");
            this.inicializarcariables();
            this.ngOnInit();
          }
        });
    }
  }

  obtenSucO($event) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 16, idEmp: $event };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.sucuO = respuesta;
        if (this.sucuO != null) {
          this.csuc = true;
        } else {
          this.csuc = false;
        }
      });
  }
  obtenSucO2(idE) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    const options: any = { caso: 16, idEmp: idE };
    const URL: any = this.baseURL + "detalle_cita.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        this.sucuO2 = respuesta;
        if (this.sucuO2 != null) {
          this.csuc = true;
        } else {
          this.csuc = false;
        }
      });
  }

  filtrarporempresa(event) {

    console.log(event)

    if (this.empresabuscador !== "") {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      const options: any = {
        caso: 9,
        idUsuario: this.idUsuario,
        EmpresaB: this.empresabuscador,
      };

      console.log(options)
      const URL: any = this.baseURL + "calendario.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          if (respuesta !== null) {
            console.log(respuesta)
            this.calendarioinfo = respuesta;
          } else {
            this.calendarioinfo = this.calendarEvents;
          }
        });
    } else {
      this.calendario();
    }
  }

  infosuc() {
    console.log(this.idSO);
    // if (this.idSO = 'principal') {
    //   this.direccion = this.direccionprincipal;
    // }
    if (this.idSO !== "principal") {
      const headers: any = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      const options: any = { caso: 6, sucursal: this.idSO };
      const URL: any = this.baseURL + "check.php";
      this.http
        .post(URL, JSON.stringify(options), headers)
        .subscribe((respuesta) => {
          this.direccion = respuesta[0].direccion;
        });
    } else {
      this.direccion = this.direccionprincipal;
      this.idSO = "0";
    }
  }
}

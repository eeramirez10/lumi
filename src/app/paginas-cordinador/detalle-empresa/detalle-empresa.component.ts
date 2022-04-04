import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Output, AfterViewInit, Input, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { utf8Encode } from '@angular/compiler/src/util';
import { ServicesService } from 'src/app/services/services.service';
//<reference types="@types/googlemaps" />
//import {}  from 'googlemaps';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.css']
})
export class DetalleEmpresaComponent implements OnInit, AfterViewInit {
  private baseURL = "http://192.168.1.61/lum/";
  selectemp: any = [];
  idAsigno = "";
  sucursales: any = [];
  imagenes: any = [];
  asigno: any = [];
  idE;
  autocompleteInput: string;
  nombremp = '';
  closeModal = '';
  closeModal1 = '';
  nombre = '';
  dir = '';
  contacto = '';
  telefono = '';
  correo = '';
  foto = '';
  comentario = '';
  rfc = '';
  fileData: File = null;
  previewUrl: any = null;
  public respuestaImagenEnviada;
  public resultadoCarga;
  selectedFile: null;
  nombrefoto: any;
  fotoFinal: any;
  editar:boolean=false;
  idSucursal;

  @ViewChild('content', { static: false }) content: any;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', { static: false }) addresstext: any;

  @ViewChild("Nombresuc", { static: false }) Nombresuc: ElementRef;
  @ViewChild("Direccionsuc", { static: false }) Direccionsuc: any;

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
    this.getPlaceAutocomplete2();
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

  private getPlaceAutocomplete2() {
    const autocomplete = new google.maps.places.Autocomplete(this.Direccionsuc.nativeElement,
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

  constructor(public route: ActivatedRoute,private http: HttpClient,private enviandoImagen: ServicesService,) {
    this.route.params.subscribe(parametros => {
      this.idE = parametros['idEmp'];
      this.obtenerselect(this.idE);
      this.obtenersucursales(this.idE);
    });
  }

  ngOnInit() {

  }

  obtenerselect(id) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 2, idEmp: id };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta:any) => {
        this.selectemp = respuesta;
        this.foto = this.selectemp[0].Foto;
        this.nombremp = this.selectemp[0].Nombre_Empresa;
        this.nombre = this.selectemp[0].Nombre;
        this.dir = this.selectemp[0].Direccion_Empresa;
        this.contacto = this.selectemp[0].NomContacto;

        console.log(this.selectemp);
        this.idAsigno = this.selectemp[0].Asignada_por;
        this.obtenerasigno(this.idAsigno);
        this.obtenerimagenes(id);
      });
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

  async agregarsuc(idEmpre){
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
          .subscribe((respuesta:any) => {
            if (respuesta==="se inserto") {
              this.obtenersucursales(this.idE);
              Swal.hideLoading();
              Swal.fire("Sucursal agregada exitosamente", "", "success");
            }else{
              console.log(respuesta);
            }
          });
      }
    }
    this.Nombresuc.nativeElement.value = "";
    this.Direccionsuc.nativeElement.value = "";
  }

  guardar(idE) {
    console.log(
      utf8Encode(this.nombre),
      utf8Encode(this.dir),
      utf8Encode(this.contacto),
      this.telefono,
      this.correo,
      this.comentario,
      this.rfc
    );
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = {
      caso: 6,
      idEmp: idE,
      nomE: this.nombremp,
      dirE: this.dir,
      conE: this.contacto,
      telE: this.telefono,
      correoE: this.correo,
      comentE: this.comentario,
      rfc: this.rfc
    };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta) => {
        console.log(respuesta);
        Swal.hideLoading();
        Swal.fire("Cambios guardados Exitosamente", "", "success");
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

  paraEditarSuc(idSuc,nomSuc,dirSuc){
    this.editar=true;
    this.idSucursal=idSuc;
    this.Nombresuc.nativeElement.value = nomSuc;
    this.Direccionsuc.nativeElement.value = dirSuc;
  }

  editarSuc(){
    if (this.idSucursal!=undefined) {
       const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 14, idsuc: this.idSucursal,nombresuc: this.Nombresuc.nativeElement.value,
    direccionsuc:this.Direccionsuc.nativeElement.value};
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta:any) => {
        if (respuesta==='Se modifico') {
          this.obtenersucursales(this.idE);
          Swal.hideLoading();
        Swal.fire("Sucursal editada exitosamente", "", "success");
        }else{
          Swal.hideLoading();
        Swal.fire("Ocurrio un Error intente nuevamente", "", "error");
        }
      });
    }
    this.Nombresuc.nativeElement.value = "";
    this.Direccionsuc.nativeElement.value = "";
    this.editar=false;
  }

  eliminarsuc(id) {
    const headers: any = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options: any = { caso: 7.1, 'idsuc': id };
    const URL: any = this.baseURL + "prospectos.php";
    this.http
      .post(URL, JSON.stringify(options), headers)
      .subscribe((respuesta:any) => {
        if (respuesta==="se elimino") {
          this.obtenersucursales(this.idE);
        Swal.fire("Se elimino correctamente la sucursal", "", "success");
        }else{
        Swal.fire("Ocurrio un error intentelo de nuevo", "", "error");
        console.log(respuesta);
        }
      });
  }

}

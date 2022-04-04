import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { SeleccionarPerfilComponent } from './seleccionar-perfil/seleccionar-perfil.component';
import { HomeCoordinadorComponent } from './home-coordinador/home-coordinador.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { CitasComponent } from './paginas-asesor/citas/citas.component';
import { TareasComponent } from './paginas-asesor/tareas/tareas.component';
import { PerfilComponent } from './paginas-asesor/perfil/perfil.component';
import { CalendarioComponent } from './paginas-cordinador/calendario/calendario.component';
import { ActividadesComponent } from './paginas-cordinador/actividades/actividades.component';
import { ProspectosComponent } from './paginas-admin/prospectos/prospectos.component';
import { ReporteEquiposComponent } from './paginas-admin/reporte-equipos/reporte-equipos.component';
import { ReporteClientesComponent } from './paginas-admin/reporte-clientes/reporte-clientes.component';
import { ReporteColaboradoresComponent } from './paginas-admin/reporte-colaboradores/reporte-colaboradores.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CtareasComponent } from './paginas-cordinador/ctareas/ctareas.component';
import { CperfilComponent } from './paginas-cordinador/cperfil/cperfil.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { DetalleCitaComponent } from './paginas-asesor/detalle-cita/detalle-cita.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from './pipes/filter.pipe';
import localePy from '@angular/common/locales/es-PY';
import { DetalleTareasComponent } from './paginas-asesor/detalle-tareas/detalle-tareas.component';
import { MenucComponent } from './componentes/menuc/menuc.component';
import { MenuaComponent } from './componentes/menua/menua.component';
import { CambiarpassComponent } from './paginas-asesor/cambiarpass/cambiarpass.component';
import { EditarTareaComponent } from './paginas-asesor/editar-tarea/editar-tarea.component';
import { AgregarTareaComponent } from './paginas-asesor/agregar-tarea/agregar-tarea.component';
import { EditActividadComponent } from './paginas-cordinador/edit-actividad/edit-actividad.component';
import { CambiarContraComponent } from './paginas-cordinador/cambiar-contra/cambiar-contra.component';
import { ProspectarComponent } from './paginas-asesor/prospectar/prospectar.component';
import { DetalleTareaCFComponent } from './paginas-asesor/detalle-tarea-cf/detalle-tarea-cf.component';
import { EditarTareaCComponent } from './paginas-coordinador/editar-tarea-c/editar-tarea-c.component';
import { NuevaTareaComponent } from './paginas-cordinador/nueva-tarea/nueva-tarea.component';
import { DetalleTareaCFCOComponent } from './paginas-coordinador/detalle-tarea-cfco/detalle-tarea-cfco.component';
import { ProspectosCComponent } from './paginas-cordinador/prospectos-c/prospectos-c.component';
import { ReportesCComponent } from './paginas-cordinador/reportes-c/reportes-c.component';
import { GoogleMapComponent } from '../app/components/google-map.component';
import { GoogleMapMarkerDirective } from '../app/directives/google-map-marker.directive';

import { MapService } from '../app/services/map.service';
import { GeolocationService } from '../app/services/geolocation.service';
import { GeocodingService } from '../app/services/geocoding.service';
import { DetalleReporteComponent } from './paginas-cordinador/detalle-reporte/detalle-reporte.component';
import { DetalleGraficaComponent } from './paginas-cordinador/detalle-grafica/detalle-grafica.component';
import { EmpresasComponent } from './paginas-cordinador/empresas/empresas.component';
import { ReportesClientesComponent } from './paginas-cordinador/reportes-clientes/reportes-clientes.component';
import { NuevoProspectoComponent } from './paginas-cordinador/nuevo-prospecto/nuevo-prospecto.component';
import { GraficaComponent } from './paginas-cordinador/grafica/grafica.component';
import { DetalleColaboradorComponent } from './paginas-cordinador/detalle-colaborador/detalle-colaborador.component';
import { NombreREPipe } from './nombre-re.pipe';
import { GraficageneralComponent } from './paginas-cordinador/graficageneral/graficageneral.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { DetalleReporteEqComponent } from './paginas-admin/detalle-reporte-eq/detalle-reporte-eq.component';
import { GraficaaComponent } from './paginas-admin/grafica/grafica.component';
import { Detalle_GraficaComponent } from './paginas-admin/detalle-grafica/detalle-grafica.component';
import { Filter2Pipe } from './pipes/filter2.pipe';
import { Grafica1RepClientesComponent } from './paginas-admin/grafica1-rep-clientes/grafica1-rep-clientes.component';
import { Grafica2RepClientesComponent } from './paginas-admin/grafica2-rep-clientes/grafica2-rep-clientes.component';
import { DetalleGraficaRepClientesComponent } from './paginas-admin/detalle-grafica-rep-clientes/detalle-grafica-rep-clientes.component';
import { GraficaRepColaboradoresComponent } from './paginas-admin/grafica-rep-colaboradores/grafica-rep-colaboradores.component';
import { DetalleRepColaboradoresComponent } from './paginas-admin/detalle-rep-colaboradores/detalle-rep-colaboradores.component';
import { TareasCanceladasComponent } from './paginas-admin/tareas-canceladas/tareas-canceladas.component';
import { DetalleProspectosComponent } from './paginas-admin/detalle-prospectos/detalle-prospectos.component';
import { DetalleTareaCancelComponent } from './paginas-admin/detalle-tarea-cancel/detalle-tarea-cancel.component';
import { Detalle2RclientesComponent } from './paginas-admin/detalle2-rclientes/detalle2-rclientes.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DetalleCalendarioComponent } from './paginas-cordinador/detalle-calendario/detalle-calendario.component';
import { DetalleEmpresaComponent } from './paginas-cordinador/detalle-empresa/detalle-empresa.component';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CambiarContrasenaComponent,
    SeleccionarPerfilComponent,
    HomeCoordinadorComponent,
    HomeAdministradorComponent,
    CitasComponent,
    TareasComponent,
    PerfilComponent,
    CalendarioComponent,
    ActividadesComponent,
    ProspectosComponent,
    ReporteEquiposComponent,
    ReporteClientesComponent,
    ReporteColaboradoresComponent,
    HeaderComponent,
    CtareasComponent,
    CperfilComponent,
    MenuComponent,
    DetalleCitaComponent,
    FilterPipe,
    DetalleTareasComponent,
    MenucComponent,
    MenuaComponent,
    CambiarpassComponent,
    EditarTareaComponent,
    AgregarTareaComponent,
    EditActividadComponent,
    CambiarContraComponent,
    ProspectarComponent,
    DetalleTareaCFComponent,
    DetalleTareaCFCOComponent,
    NuevaTareaComponent,
    EditarTareaCComponent,
    ProspectosCComponent,
    ReportesCComponent,
    GoogleMapComponent,
    GoogleMapMarkerDirective,
    DetalleReporteComponent,
    DetalleGraficaComponent,
    EmpresasComponent,
    ReportesClientesComponent,
    NuevoProspectoComponent,
    GraficaComponent,
    DetalleColaboradorComponent,
    NombreREPipe,
    GraficageneralComponent,
    FooterComponent,
    DetalleReporteEqComponent,
    Filter2Pipe,
    GraficaaComponent,
    Detalle_GraficaComponent,
    Grafica1RepClientesComponent,
    Grafica2RepClientesComponent,
    DetalleGraficaRepClientesComponent,
    GraficaRepColaboradoresComponent,
    DetalleRepColaboradoresComponent,
    TareasCanceladasComponent,
    DetalleProspectosComponent,
    DetalleTareaCancelComponent,
    Detalle2RclientesComponent,
    DetalleCalendarioComponent,
    DetalleEmpresaComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    SelectDropDownModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    MapService,
    GeolocationService,
    GeocodingService, { provide: LOCALE_ID, useValue: 'es' }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

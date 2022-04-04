import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../app/_helpers/';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { SeleccionarPerfilComponent } from './seleccionar-perfil/seleccionar-perfil.component';
import { HomeCoordinadorComponent } from './home-coordinador/home-coordinador.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { CitasComponent } from './paginas-asesor/citas/citas.component';
import { TareasComponent } from './paginas-asesor/tareas/tareas.component';
import { PerfilComponent } from './paginas-asesor/perfil/perfil.component';
import { CalendarioComponent } from './paginas-cordinador/calendario/calendario.component';
import { ActividadesComponent } from './paginas-cordinador/actividades/actividades.component';
import { CtareasComponent } from './paginas-cordinador/ctareas/ctareas.component';
import { CperfilComponent } from './paginas-cordinador/cperfil/cperfil.component';
import { ProspectosComponent } from './paginas-admin/prospectos/prospectos.component';
import { ReporteEquiposComponent } from './paginas-admin/reporte-equipos/reporte-equipos.component';
import { ReporteClientesComponent } from './paginas-admin/reporte-clientes/reporte-clientes.component';
import { ReporteColaboradoresComponent } from './paginas-admin/reporte-colaboradores/reporte-colaboradores.component';
import { DetalleCitaComponent } from './paginas-asesor/detalle-cita/detalle-cita.component';
import { DetalleTareasComponent } from './paginas-asesor/detalle-tareas/detalle-tareas.component';
import { CambiarpassComponent } from './paginas-asesor/cambiarpass/cambiarpass.component';
import { EditarTareaComponent } from './paginas-asesor/editar-tarea/editar-tarea.component';
import { AgregarTareaComponent } from './paginas-asesor/agregar-tarea/agregar-tarea.component';
import { ProspectarComponent } from './paginas-asesor/prospectar/prospectar.component';
import { DetalleTareaCFComponent } from './paginas-asesor/detalle-tarea-cf/detalle-tarea-cf.component';
import { EditarTareaCComponent } from './paginas-coordinador/editar-tarea-c/editar-tarea-c.component';
import { CambiarContraComponent } from './paginas-cordinador/cambiar-contra/cambiar-contra.component';
import { NuevaTareaComponent } from './paginas-cordinador/nueva-tarea/nueva-tarea.component';
import { DetalleTareaCFCOComponent } from './paginas-coordinador/detalle-tarea-cfco/detalle-tarea-cfco.component';
import { ProspectosCComponent } from './paginas-cordinador/prospectos-c/prospectos-c.component';
import { ReportesCComponent } from './paginas-cordinador/reportes-c/reportes-c.component';
import { DetalleReporteComponent } from './paginas-cordinador/detalle-reporte/detalle-reporte.component';
import { DetalleGraficaComponent } from './paginas-cordinador/detalle-grafica/detalle-grafica.component';
import { EmpresasComponent } from './paginas-cordinador/empresas/empresas.component';
import { ReportesClientesComponent } from './paginas-cordinador/reportes-clientes/reportes-clientes.component';
import { GraficaComponent } from './paginas-cordinador/grafica/grafica.component';
import { NuevoProspectoComponent } from './paginas-cordinador/nuevo-prospecto/nuevo-prospecto.component';
import { DetalleColaboradorComponent } from './paginas-cordinador/detalle-colaborador/detalle-colaborador.component';
import { GraficageneralComponent } from './paginas-cordinador/graficageneral/graficageneral.component';
import { DetalleReporteEqComponent } from './paginas-admin/detalle-reporte-eq/detalle-reporte-eq.component';
import { GraficaaComponent } from './paginas-admin/grafica/grafica.component';
import { Detalle_GraficaComponent } from './paginas-admin/detalle-grafica/detalle-grafica.component';
import { DetalleGraficaRepClientesComponent } from './paginas-admin/detalle-grafica-rep-clientes/detalle-grafica-rep-clientes.component';
import { Grafica1RepClientesComponent } from './paginas-admin/grafica1-rep-clientes/grafica1-rep-clientes.component';
import { DetalleRepColaboradoresComponent } from './paginas-admin/detalle-rep-colaboradores/detalle-rep-colaboradores.component';
import { DetalleProspectosComponent } from './paginas-admin/detalle-prospectos/detalle-prospectos.component';
import { TareasCanceladasComponent } from './paginas-admin/tareas-canceladas/tareas-canceladas.component';
import { DetalleTareaCancelComponent } from './paginas-admin/detalle-tarea-cancel/detalle-tarea-cancel.component';
import { GraficaRepColaboradoresComponent } from './paginas-admin/grafica-rep-colaboradores/grafica-rep-colaboradores.component';
import { Detalle2RclientesComponent } from './paginas-admin/detalle2-rclientes/detalle2-rclientes.component';
import { DetalleCalendarioComponent } from './paginas-cordinador/detalle-calendario/detalle-calendario.component';
import { DetalleEmpresaComponent } from './paginas-cordinador/detalle-empresa/detalle-empresa.component';

const routes: Routes = [
  {
    path: "Login",
    component: LoginComponent,
  },
  {
    path: "Cambiar_Contraseña",
    component: CambiarContrasenaComponent,
  },
  {
    path: "Sel-Perfil",
    component: SeleccionarPerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Inicio_Asesor",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Inicio_Coordinador",
    component: HomeCoordinadorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Inicio_Administrador",
    component: HomeAdministradorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Citas_Asesor",
    children: [
      {
        path: "",
        component: CitasComponent,
      },
      {
        path: "Detalle_Cita",
        component: DetalleCitaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Detalle_Cita/:id_C",
        component: DetalleCitaComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Detalle_Tareas",
    children: [
      {
        path: "",
        component: DetalleTareasComponent,
      },
      {
        path: "Crear_Tarea",
        component: AgregarTareaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Editar_Tarea/:idT",
        component: EditarTareaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detalleTareaCF/:idT",
        component: DetalleTareaCFComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: "Pefil_Asesor",
    children: [
      {
        path: "",
        component: PerfilComponent,
      },
      {
        path: "Cambiar_Contra",
        component: CambiarpassComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Calendario_Cordinador",
    children:[
    {
      path:"",
      component: CalendarioComponent,
    },
    {
      path:"detalle_calendario/:idCi",
      component: DetalleCalendarioComponent,
    },

    ],
  },
  {
    path: "detalleTareaCFCO",
    component: DetalleTareaCFCOComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Actividades_Cordinador",
    component: ActividadesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Tareas_Cordinador",
    children: [
      {
        path: "",
        component: CtareasComponent,
      },
      {
        path: "Editar_TareaC/:idT",
        component: EditarTareaCComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Nueva_TareaC",
        component: NuevaTareaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detalleTareaCFCO/:idT",
        component: DetalleTareaCFCOComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Pefil_Cordinador",
    children: [
      {
        path: "",
        component: CperfilComponent,
      },
      {
        path: "Cambiar_Pass",
        component: CambiarContraComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Prospectos_Admin",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ProspectosComponent,
      },
      {
        path: "Detalle_Prospectos",
        component: DetalleProspectosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Tareas_Canceladas",
        component: TareasCanceladasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Detalle_Tarea_Cancelada/:idT",
        component: DetalleTareaCancelComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Rclientes_Admin",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ReporteClientesComponent,
      },
      {
        path: "Detalle_Grafica/:idEmp",
        component: DetalleGraficaRepClientesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ReporteEmpresas",
        component: Grafica1RepClientesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Reporte_Detallado/:Fecha/:idEmp",
        component: Detalle2RclientesComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Rcolaboradores_Admin",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ReporteColaboradoresComponent,
      },
      {
        path: "Detalle_Colaboradores/:idUs",
        component: DetalleRepColaboradoresComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Grafica_Detalle_Colaborador/:idUs",
        component: GraficaRepColaboradoresComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Requipos_Admin",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ReporteEquiposComponent,
      },
      {
        path: "Detalle_equipos/:idEq",
        component: DetalleReporteEqComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Grafica_equipo/:idEqui",
        component: GraficaaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Detalle_Grafica/:idEq/:idEmp/:tipo",
        component: Detalle_GraficaComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: "Editar_Tarea",
    component: EditarTareaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Prospectar_Asesor",
    component: ProspectarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "detalleTareaCF",
    component: DetalleTareaCFComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "detalleTareaCF/:idT",
    component: DetalleTareaCFComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Prospectos_coordinador",
    children: [
      {
        path: "",
        component: ProspectosCComponent,
      },
      {
        path: "Nuevo_prospecto",
        component: NuevoProspectoComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Empresas_coordinador",
    children: [
      {
        path: "",
        component: EmpresasComponent,
      },
      {
        path: "Nuevo_prospecto",
        component: NuevoProspectoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detalle-empresa/:idEmp",
        component: DetalleEmpresaComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "Reportes_clientes",
    component: ReportesClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "detalle_reporte",
    children: [
      {
        path: "",
        component: DetalleReporteComponent,
      },
      {
        path: "grafica/:idE",
        component: GraficaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "graficageneral/:idE",
        component: GraficageneralComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detalle_colaborador/:idEq/:idEmp/:tipo",
        component: DetalleColaboradorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detalle_grafica/:idUs/:idEmp/:tipo",
        component: DetalleGraficaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detalle_grafica_equipo/:idEq/:idEmp/:tipo",
        component: ReportesCComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "**",
    redirectTo: "Login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

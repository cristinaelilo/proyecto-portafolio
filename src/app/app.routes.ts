import { Routes } from '@angular/router';
import { authGuard, programmerGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomePage),
    title: 'C&D Studio'
  },

  {
    path: 'programadoras',
    loadComponent: () => import('./pages/programadoras/programadoras').then(m => m.ProgramadorasPage),
    title: 'Programadoras — C&D Studio'
  },

  {
    path: 'programadoras/:id',
    loadComponent: () => import('./pages/perfil/perfil').then(m => m.PerfilPage),
    title: 'Perfil — C&D Studio'
  },

  {
    path: 'proyectos',
    loadComponent: () => import('./pages/proyectos/proyectos').then(m => m.ProyectosPage),
    title: 'Proyectos — C&D Studio'
  },

  {
    path: 'servicios',
    loadComponent: () => import('./pages/servicios/servicios').then(m => m.ServiciosPage),
    title: 'Servicios — C&D Studio'
  },

  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactoPage),
    title: 'Contacto — C&D Studio'
  },

  // Requiere autenticación
  {
    path: 'solicitud',
    loadComponent: () => import('./pages/solicitud/solicitud').then(m => m.SolicitudPage),
    canActivate: [authGuard],
    title: 'Solicitar proyecto — C&D Studio'
  },

  // Accesible para todos los usuarios autenticados (filtra internamente)
  {
    path: 'mis-solicitudes',
    loadComponent: () => import('./pages/mis-solicitudes/mis-solicitudes').then(m => m.MisSolicitudesPage),
    canActivate: [authGuard],
    title: 'Mis solicitudes — C&D Studio'
  },

  // Solo programadoras
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.AdminPage),
    canActivate: [programmerGuard],
    title: 'Panel — C&D Studio'
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginPage),
    title: 'Iniciar sesión — C&D Studio'
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterPage),
    title: 'Crear cuenta — C&D Studio'
  },

  { path: '**', redirectTo: '' }

];

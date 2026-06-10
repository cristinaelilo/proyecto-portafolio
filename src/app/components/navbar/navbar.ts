import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  auth   = inject(AuthService);
  router = inject(Router);

  open = false;

  // computed() es reactivo: se recalcula automáticamente cuando currentUser cambia
  isProgrammer = computed(() => this.auth.isProgrammer());
  isLoggedIn   = computed(() => !!this.auth.currentUser());
  isLoading    = computed(() => this.auth.currentUser() === undefined);
  userEmail    = computed(() => this.auth.currentUser()?.email ?? '');

  baseLinks = [
    { path: '/',             label: 'Home',          exact: true },
    { path: '/programadoras',label: 'Programadoras', exact: false },
    { path: '/proyectos',    label: 'Proyectos',     exact: false },
    { path: '/servicios',    label: 'Servicios',     exact: false },
    { path: '/contacto',     label: 'Contacto',      exact: false },
  ];

  userLinks = [
    { path: '/solicitud',     label: 'Solicitar proyecto', exact: false },
    { path: '/mis-solicitudes', label: 'Mis solicitudes',  exact: false },
  ];

  programmerLinks = [
    { path: '/admin', label: '⚙ Panel admin', exact: false },
  ];

  get links() {
    if (!this.isLoggedIn())    return this.baseLinks;
    if (this.isProgrammer())   return [...this.baseLinks, ...this.programmerLinks];
    return [...this.baseLinks, ...this.userLinks];
  }

  toggleMenu() { this.open = !this.open; }
  closeMenu()  { this.open = false; }

  async logout() {
    await this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }
}

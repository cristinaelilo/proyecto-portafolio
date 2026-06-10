import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PROGRAMMERS, SERVICES } from '../../data/data';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './solicitud.html',
})
export class SolicitudPage implements OnInit {

  firestore = inject(FirestoreService);
  auth = inject(AuthService);
  router = inject(Router);
  strapi = new StrapiService();

  programmers: any[] = [...PROGRAMMERS];
  services: any[] = [...SERVICES];

  // Formulario
  name = '';
  email = '';
  idea = '';
  programmer = PROGRAMMERS[0].name;
  servicio = SERVICES[0].title;

  sent = signal(false);
  loading = signal(false);
  error = signal('');

  async ngOnInit() {

    const u = this.auth.currentUser();

    if (u?.email) {
      this.email = u.email;
    }

    // Recuperar servicio seleccionado desde la página Servicios
    const selectedService = localStorage.getItem('selectedService');

    if (selectedService) {
      try {
        const service = JSON.parse(selectedService);

        if (service?.title) {
          this.servicio = service.title;
        }

        localStorage.removeItem('selectedService');
      } catch (e) {
        console.error(e);
      }
    }

    try {

      const [progs, servs] = await Promise.all([
        this.strapi.getProgramadores(),
        this.strapi.getServicios()
      ]);

      if (progs.length) {
        this.programmers = progs.map((d: any) => {
          const a = d.attributes ?? d;

          return {
            id: a.slug ?? String(d.id),
            name: a.nombre ?? a.name,
            role: a.especialidad ?? ''
          };
        });

        this.programmer = this.programmers[0].name;
      }

      if (servs.length) {
        this.services = servs.map((d: any) => {
          const a = d.attributes ?? d;

          return {
            id: String(d.id),
            title: a.titulo ?? a.title,
            description: '',
            icon: a.icono ?? ''
          };
        });

        // Mantener servicio seleccionado si vino desde Servicios
        const existe = this.services.find(
          s => s.title === this.servicio
        );

        if (!existe) {
          this.servicio = this.services[0].title;
        }
      }

    } catch {
      // Si Strapi no está disponible, usar datos locales
    }
  }

  async submit() {

    const u = this.auth.currentUser();

    if (!u) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.name.trim() || !this.idea.trim()) {
      this.error.set('Completa todos los campos obligatorios.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {

      await this.firestore.guardarSolicitud({
        nombre: this.name,
        correo: this.email || u.email || '',
        idea: this.idea,
        servicio: this.servicio,
        programadora: this.programmer,
        uid: u.uid,
        emailUsuario: u.email ?? ''
      });

      this.sent.set(true);

      this.name = '';
      this.idea = '';

    } catch (e) {

      console.error(e);
      this.error.set('Error al guardar la solicitud. Intenta de nuevo.');

    } finally {

      this.loading.set(false);

    }
  }
}
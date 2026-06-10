import { Component, inject, signal, computed, OnInit, effect } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [],
  templateUrl: './mis-solicitudes.html',
  styleUrls: ['./mis-solicitudes.css']
})
export class MisSolicitudesPage implements OnInit {

  firestore = inject(FirestoreService);
  auth      = inject(AuthService);

  list     = signal<any[]>([]);
  loading  = signal(true);
  error    = signal('');
  loaded   = false; // evitar cargar dos veces

  isProgrammer = computed(() => this.auth.isProgrammer());

  constructor() {
    // Reaccionar cuando Firebase resuelve el usuario (puede llegar después del ngOnInit)
    effect(() => {
      const user = this.auth.currentUser();
      if (user !== undefined && !this.loaded) {
        this.loaded = true;
        this.cargar(user);
      }
    });
  }

  ngOnInit() {
    // Si el usuario ya está disponible de inmediato (ej: ya estaba en caché)
    const user = this.auth.currentUser();
    if (user !== undefined && !this.loaded) {
      this.loaded = true;
      this.cargar(user);
    }
  }

  async cargar(user: any) {
    if (!user) {
      this.loading.set(false);
      return;
    }
    try {
      if (this.isProgrammer()) {
        const todas = await this.firestore.obtenerTodasLasSolicitudes();
        this.list.set(todas);
      } else {
        const datos = await this.firestore.obtenerSolicitudesPorUsuario(user.uid);
        this.list.set(datos);
      }
    } catch (e) {
      console.error(e);
      this.error.set('Error al cargar solicitudes.');
    } finally {
      this.loading.set(false);
    }
  }
}

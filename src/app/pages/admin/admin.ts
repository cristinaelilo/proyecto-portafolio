import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminPage implements OnInit {

  firestore = inject(FirestoreService);
  auth      = inject(AuthService);

  list    = signal<any[]>([]);
  loading = signal(true);
  error   = signal('');
  saving  = signal<string | null>(null);
  loaded  = false;

  constructor() {
    effect(() => {
      const user = this.auth.currentUser();
      if (user !== undefined && !this.loaded) {
        this.loaded = true;
        this.loadSolicitudes();
      }
    });
  }

  ngOnInit() {
    const user = this.auth.currentUser();
    if (user !== undefined && !this.loaded) {
      this.loaded = true;
      this.loadSolicitudes();
    }
  }

  async loadSolicitudes() {
    this.loading.set(true);
    try {
      const todas = await this.firestore.obtenerTodasLasSolicitudes();
      this.list.set(todas);
    } catch {
      this.error.set('Error al cargar las solicitudes.');
    } finally {
      this.loading.set(false);
    }
  }

  async guardar(s: any) {
    this.saving.set(s.id);
    try {
      await this.firestore.actualizarSolicitud(s.id, s.estado, s.observacion ?? '');
      this.list.update(list =>
        list.map(item => item.id === s.id
          ? { ...item, estado: s.estado, observacion: s.observacion }
          : item
        )
      );
    } catch {
      alert('Error al guardar. Intenta de nuevo.');
    } finally {
      this.saving.set(null);
    }
  }
}

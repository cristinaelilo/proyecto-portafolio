import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterPage {

  auth   = inject(AuthService);
  router = inject(Router);

  name     = '';
  email    = '';
  password = '';
  confirm  = '';

  error   = signal('');
  loading = signal(false);

  async submit() {
    this.error.set('');

    if (!this.name.trim())     { this.error.set('El nombre es obligatorio.');       return; }
    if (!this.email.trim())    { this.error.set('El correo es obligatorio.');        return; }
    if (this.password.length < 6) { this.error.set('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (this.password !== this.confirm) { this.error.set('Las contraseñas no coinciden.'); return; }

    this.loading.set(true);
    try {
      await this.auth.register(this.email.trim(), this.password);
      // Firebase ya actualiza currentUser vía onAuthStateChanged+NgZone
      this.router.navigate(['/']);
    } catch (e: any) {
      const code = e?.code ?? '';
      if (code === 'auth/email-already-in-use') {
        this.error.set('Este correo ya está registrado.');
      } else {
        this.error.set('Error al crear la cuenta. Intenta de nuevo.');
      }
    } finally {
      this.loading.set(false);
    }
  }
}

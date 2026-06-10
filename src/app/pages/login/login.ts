import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {

  auth   = inject(AuthService);
  router = inject(Router);

  email    = '';
  password = '';

  emailError    = signal('');
  passwordError = signal('');
  loading       = signal(false);

  async submit() {
    this.emailError.set('');
    this.passwordError.set('');

    if (!this.email.trim())    { this.emailError.set('El correo es obligatorio.');    return; }
    if (!this.password.trim()) { this.passwordError.set('La contraseña es obligatoria.'); return; }

    this.loading.set(true);
    try {
      await this.auth.login(this.email.trim(), this.password);
      // La señal currentUser se actualiza sola vía onAuthStateChanged+NgZone.
      // Solo navegamos — el navbar se actualizará reactivamente.
      if (this.auth.isProgrammer()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (e: any) {
      const code = e?.code ?? '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        this.emailError.set('Correo o contraseña incorrectos.');
      } else {
        this.emailError.set('Error al iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      this.loading.set(false);
    }
  }

  async loginGoogle() {
    this.loading.set(true);
    try {
      await this.auth.googleLogin();
      this.router.navigate(['/']);
    } catch {
      this.emailError.set('Error al iniciar sesión con Google.');
    } finally {
      this.loading.set(false);
    }
  }
}

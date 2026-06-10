import { Injectable, signal, NgZone } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { appFirebase } from '../firebase.config';

// ── Emails de las programadoras ─────────────────────────────────────────────
// Agrega aquí los emails reales de Cristina y Denisse
const PROGRAMMER_EMAILS: string[] = [
  'cristinaeliloja12@gmail.com',
  'pestefania968@gmail.com'
];

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly auth = getAuth(appFirebase);

  // Señal pública reactiva del usuario
  readonly currentUser = signal<User | null | undefined>(undefined);
  // undefined = todavía cargando | null = no autenticado | User = autenticado

  constructor(private zone: NgZone) {
    // onAuthStateChanged es externo a Angular.
    // Usamos NgZone.run() para que la señal se actualice DENTRO de la zona
    // y dispare la detección de cambios correctamente, incluso en modo zoneless.
    onAuthStateChanged(this.auth, (user) => {
      this.zone.run(() => this.currentUser.set(user));
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  googleLogin() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  isProgrammer(): boolean {
    const user = this.currentUser();
    if (!user) return false;
    return PROGRAMMER_EMAILS.includes(user.email ?? '');
  }

}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// Espera a que Firebase resuelva el estado antes de decidir
function waitForAuth() {
  const auth = inject(AuthService);
  // Filtra el estado "undefined" (cargando) y toma el primer valor real
  return toObservable(auth.currentUser).pipe(
    filter(u => u !== undefined),
    take(1)
  );
}

// Solo usuarios autenticados
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return waitForAuth().pipe(
    map(user => {
      if (user) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};

// Solo programadoras
export const programmerGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  return waitForAuth().pipe(
    map(user => {
      if (user && auth.isProgrammer()) return true;
      router.navigate(['/']);
      return false;
    })
  );
};

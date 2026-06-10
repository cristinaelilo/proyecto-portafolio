import { Component } from '@angular/core';
import { ServiceCardComponent } from '../../components/service-card/service-card';
import { SERVICES } from '../../data/data';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [ServiceCardComponent],
  template: `
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header class="mb-10 sm:mb-12 text-center">
        <h1 class="text-3xl sm:text-5xl font-bold">
          Nuestros <span class="gradient-text">servicios</span>
        </h1>
        <p class="text-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Soluciones digitales completas, de la idea al deploy.
        </p>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        @for (s of list; track s.id) {
          <app-service-card [s]="s" />
        }
      </div>
    </section>
  `,
})
export class ServiciosPage {
  list = SERVICES;
}

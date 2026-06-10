import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../data/data';

@Component({
  selector: 'app-service-card',
  standalone: true,
  templateUrl: './service-card.html',
  styleUrl: './service-card.css'
})
export class ServiceCardComponent {

  s = input.required<Service>();

  constructor(private router: Router) {}

  selectService(event: Event) {
    event.stopPropagation();

    localStorage.setItem(
      'selectedService',
      JSON.stringify(this.s())
    );

    this.router.navigate(['/solicitud']);
  }
}
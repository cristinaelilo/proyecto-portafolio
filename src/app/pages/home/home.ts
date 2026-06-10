import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero';
import { ProgrammerCardComponent } from '../../components/programmer-card/programmer-card';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { ServiceCardComponent } from '../../components/service-card/service-card';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroComponent, ProgrammerCardComponent, ProjectCardComponent, ServiceCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePage implements OnInit {
  private strapi = new StrapiService();
  programmers = signal<any[]>([]);
  services    = signal<any[]>([]);
  projects    = signal<any[]>([]);

  async ngOnInit() {
    const [progs, servs, projs] = await Promise.all([
      this.strapi.getProgramadores(),
      this.strapi.getServicios(),
      this.strapi.getProyectosDestacados()
    ]);
    this.programmers.set(progs);
    this.services.set(servs);
    this.projects.set(projs);
  }
}
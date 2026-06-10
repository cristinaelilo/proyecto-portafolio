import { Component, OnInit, signal } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class ProyectosPage implements OnInit {
  private strapi = new StrapiService();
  list = signal<any[]>([]);

  async ngOnInit() {
    this.list.set(await this.strapi.getProyectos());
  }
}
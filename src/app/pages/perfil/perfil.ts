import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProjectCardComponent } from '../../components/project-card/project-card';
import { PROGRAMMERS, PROJECTS } from '../../data/data';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, ProjectCardComponent],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilPage implements OnInit {

  private route = inject(ActivatedRoute);
  private strapi = inject(StrapiService);

  private params = toSignal(this.route.paramMap);

  p = computed(() =>
    PROGRAMMERS.find(x => x.id === this.params()?.get('id'))
  );

  relatedProjects = signal<any[]>([]);
  loading = signal(true);

  async ngOnInit() {

    const slug = this.params()?.get('id') ?? '';

    try {

      const progStrapi = await this.strapi.getProgramadorBySlug(slug);

      if (progStrapi?.id) {

        const proyStrapi =
          await this.strapi.getProyectosByProgramador(progStrapi.id);

        console.log('PROYECTOS STRAPI:', proyStrapi);

        if (proyStrapi.length) {

          // YA VIENEN MAPEADOS DESDE STRAPI
          this.relatedProjects.set(proyStrapi);

          this.loading.set(false);
          return;
        }
      }

    } catch (error) {

      console.error(error);

    }

    // FALLBACK LOCAL
    const local = PROJECTS.filter(project =>
      !project.programadores ||
      project.programadores.includes(slug)
    );

    this.relatedProjects.set(
      local.length ? local : PROJECTS
    );

    this.loading.set(false);
  }
}
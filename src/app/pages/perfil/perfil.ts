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

  private route  = inject(ActivatedRoute);
  private strapi = new StrapiService();

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
        const proyStrapi = await this.strapi.getProyectosByProgramador(progStrapi.id);
        if (proyStrapi.length) {
          this.relatedProjects.set(proyStrapi.map(mapProyecto));
          this.loading.set(false); // ← fix: faltaba aquí
          return;
        }
      }
    } catch { /* fallback */ }

    // Fallback local: filtrar por programador
    const local = PROJECTS.filter(p =>
      !p.programadores || p.programadores.includes(slug)
    );
    this.relatedProjects.set(local.length ? local : PROJECTS);
    this.loading.set(false);
  }
}

function mapProyecto(d: any) {
  const a = d.attributes ?? d;
  return {
    id:          String(d.id),
    name:        a.nombre ?? a.name,
    description: a.descripcion_breve ?? a.description ?? '',
    tech:        typeof a.tecnologias === 'string'
                   ? a.tecnologias.split(',').map((t: string) => t.trim())
                   : (a.tech ?? []),
    emoji:       '🚀',
    gradient:    'from-violet-500 to-fuchsia-500',
    repo:        a.repositorio ?? '#'
  };
}

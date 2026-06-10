import { Injectable } from '@angular/core';
import { PROGRAMMERS, PROJECTS, SERVICES } from '../data/data';

const STRAPI_URL = 'https://tremendous-compassion-84f9815b13.strapiapp.com/api';

@Injectable({ providedIn: 'root' })
export class StrapiService {

  // ── Programadoras ─────────────────────────────────────────────────────────

  async getProgramadores(): Promise<any[]> {
    try {
      const res  = await fetch(`${STRAPI_URL}/programadoras?populate=*`);
      const json = await res.json();
      const data = json.data ?? [];
      if (!data.length) return PROGRAMMERS;
      return data.map(mapProg);
    } catch {
      return PROGRAMMERS;
    }
  }

   
  async getProgramadorBySlug(slug: string): Promise<any | null> {
    try {
      const res  = await fetch(
        `${STRAPI_URL}/programadoras?filters[slug][$eq]=${slug}&populate=*`
      );
      const json = await res.json();
      const item = json.data?.[0];
      if (!item) return null;
      const a = item.attributes ?? item;
      return {
        id:       item.id,
        slug:     a.slug ?? slug,
        name:     a.nombre ?? '',
        role:     a.especialidad ?? '',
        bio:      a.descripcion_breve ?? '',
        github:   a.github ?? '#',
        linkedin: a.linkedin ?? '#',
        tech:     Array.isArray(a.tecnologias) ? a.tecnologias : [],
        gradient: a.gradient ?? 'from-fuchsia-500 to-violet-500',
        photo:    a.foto?.url ?? a.foto?.data?.attributes?.url ?? ''
      };
    } catch {
      return null;
    }
  }

  // ── Proyectos ─────────────────────────────────────────────────────────────

  async getProyectos(): Promise<any[]> {
    try {
      const res  = await fetch(`${STRAPI_URL}/proyectos?populate=*`);
      const json = await res.json();
      const data = json.data ?? [];
      if (!data.length) return PROJECTS;
      return data.map(mapProy);
    } catch {
      return PROJECTS;
    }
  }

  async getProyectosDestacados(): Promise<any[]> {
    try {
      const res  = await fetch(`${STRAPI_URL}/proyectos?filters[destacado][$eq]=true&populate=*`);
      const json = await res.json();
      const data = json.data ?? [];
      if (!data.length) return PROJECTS.filter(p => p.destacado).slice(0, 3);
      return data.map(mapProy);
    } catch {
      return PROJECTS.filter(p => p.destacado).slice(0, 3);
    }
  }

  async getProyectosByProgramador(programadorId: number): Promise<any[]> {
    try {
      const res  = await fetch(
        `${STRAPI_URL}/proyectos?filters[programadoras][id][$eq]=${programadorId}&populate=*`
      );
      const json = await res.json();
      return (json.data ?? []).map(mapProy);
    } catch {
      return [];
    }
  }

  // ── Servicios ─────────────────────────────────────────────────────────────

  async getServicios(): Promise<any[]> {
    try {
      const res  = await fetch(`${STRAPI_URL}/servicios?populate=*`);
      const json = await res.json();
      const data = json.data ?? [];
      if (!data.length) return SERVICES;
      return data.map(mapServ);
    } catch {
      return SERVICES;
    }
  }
}

// ── Mappers (Strapi v5 usa atributos planos) ─────────────────────────────────

function mapProg(d: any) {
  const a = d.attributes ?? d;
  return {
    id:       a.slug       ?? String(d.id),
    name:     a.nombre     ?? a.name ?? '',
    role:     a.especialidad ?? a.role ?? '',
    bio:      a.descripcion_breve ?? a.bio ?? '',
    initials: (a.nombre ?? '??').split(' ').map((w: string) => w[0]).join('').slice(0, 2),
    github:   a.github   ?? '#',
    linkedin: a.linkedin ?? '#',
    tech:     Array.isArray(a.tecnologias) ? a.tecnologias : [],
    gradient: a.gradient ?? 'from-fuchsia-500 to-violet-500',
    photo:    a.foto?.url ?? a.foto?.data?.attributes?.url ?? a.photo ?? '',
    email:    a.correo_contacto ?? '',
    activo:   a.estado_activo   ?? true,
  };
}

function mapProy(d: any) {
  const a = d.attributes ?? d;
  const tech = Array.isArray(a.tecnologias)
    ? a.tecnologias
    : typeof a.tecnologias === 'string'
      ? a.tecnologias.split(',').map((t: string) => t.trim())
      : [];
  return {
    id:          String(d.id),
    name:        a.nombre      ?? a.name ?? '',
    description: a.descripcion_breve ?? a.description ?? '',
    tech,
    emoji:       a.emoji    ?? '🚀',
    gradient:    a.gradient ?? 'from-violet-500 to-fuchsia-500',
    repo:        a.repositorio ?? a.repo ?? '#',
    demo:        a.demo       ?? undefined,
    tipo:        a.tipo       ?? 'académico',
    destacado:   a.destacado  ?? false,
    slug:   a.slug ?? String(d.id)
  };
}

function mapServ(d: any) {
  const a = d.attributes ?? d;
  return {
    id:          String(d.id),
    title:       a.titulo      ?? a.title ?? '',
    description: a.descripcion ?? a.description ?? '',
    icon:        a.icono       ?? '⚡'
  };
}
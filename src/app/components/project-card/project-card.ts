import { Component, input } from '@angular/core';
import { Project } from '../../data/data';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCardComponent {
  p = input.required<Project>();
}
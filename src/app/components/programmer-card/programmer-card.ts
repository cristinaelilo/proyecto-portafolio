import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Programmer } from '../../data/data';

@Component({
  selector: 'app-programmer-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './programmer-card.html',
  styleUrl: './programmer-card.css'
})
export class ProgrammerCardComponent {

  p = input.required<Programmer>();

}
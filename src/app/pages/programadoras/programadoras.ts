import { Component, OnInit, signal } from '@angular/core';
import { ProgrammerCardComponent } from '../../components/programmer-card/programmer-card';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-programadoras',
  standalone: true,
  imports: [ProgrammerCardComponent],
  templateUrl: './programadoras.html',
  styleUrl: './programadoras.css'
})
export class ProgramadorasPage implements OnInit {

  private strapi = new StrapiService();
  list = signal<any[]>([]);

  async ngOnInit() {
    const data = await this.strapi.getProgramadores();
    this.list.set(data);
  }
}
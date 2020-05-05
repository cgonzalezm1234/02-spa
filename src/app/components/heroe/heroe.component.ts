import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent {

  heroe: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService
    ) {
    this.activatedRoute.params.subscribe( params => {
      this.heroesService.getHeroe(params['id']).subscribe(data => {
        this.heroe = data['heroe'];
      });
    });
  }

}

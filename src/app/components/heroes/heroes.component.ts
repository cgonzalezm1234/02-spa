import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(data => {
      this.heroes = data['heroes'];
    });
  }
  verHeroe( id: string ) {
    this.router.navigate( ['/heroe', id])
  }
}

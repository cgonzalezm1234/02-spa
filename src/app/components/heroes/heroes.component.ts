import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = []
  suscribeService : any = null

  constructor(private heroesService: HeroesService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.suscribeService = this.heroesService.getHeroes().subscribe(data => {
      this.heroes = data['heroes'];
    });
  }
  verHeroe( id: string ) {
    this.router.navigate( ['/heroe', id])
  }

  /*ngOnDestroy() {
    if (this.suscribeService) {
      console.log('ondestroy');
      this.suscribeService.unsubscribe();
    }
  }*/
}

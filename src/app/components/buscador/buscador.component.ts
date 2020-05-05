import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

  heroes: Heroe[] = [];
  termino: string;

  constructor( private activatedRoute: ActivatedRoute,
               private heroesService: HeroesService,
               private router: Router ) {

    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.heroesService.getHeroes().subscribe(data => {
        this.heroes = data['heroes'];
        let heroesArr: Heroe[] = [];
        this.termino =  params['termino'].toLowerCase();
        console.log(this.heroes);
        for (let heroe of this.heroes) {
          let nombre: string = heroe.nombre.toLowerCase();
          if (nombre.indexOf( this.termino ) >= 0) {
            heroesArr.push(heroe);
          }
        }
        this.heroes = heroesArr;
      });
    });
  }

  verHeroe( id: string ){
    this.router.navigate( ['/heroe', id])
  }

}

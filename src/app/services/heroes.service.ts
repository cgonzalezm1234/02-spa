import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable()

export class HeroesService {
  private heroes: Heroe[] = [];
  private serviceUrl = environment.urlHeroesApi;

  constructor(private http: HttpClient) {
    console.log('service is working')
  }

  public getHeroes(): Observable<Heroe> {
    return this.http.get<Heroe>( this.serviceUrl + 'GetHeroes' + '?n+\=' + new Date().getTime());
  }

  public getHeroe( id: string): Observable<Heroe> {
    return this.http.get<Heroe>( this.serviceUrl + 'GetHeroeById/' + id);
  }

  public addHeroe(heroe: any): Observable<Heroe> {
    return this.http.post<Heroe>(this.serviceUrl + 'CreateHeroe', heroe);
  }

  public deleteHeroe(id: string): any {
    return this.http.delete<Heroe>(this.serviceUrl + 'DeleteHeroeById/' + id);
  }

  public updateHeroe(heroe: any): Observable<Heroe> {
    return this.http.put<Heroe>(this.serviceUrl + 'UpdateHeroe', heroe);
  }
}

export interface Heroe {
  _id: string;
  nombre: string;
  bio: string;
  img: string;
  aparicion: string;
  casa: string;
}

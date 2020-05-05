import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class HeroesService {
  private heroes: Heroe[] = [];
  private serviceUrl = 'http://localhost:3001/api/';

  constructor(private http: HttpClient) {
    console.log('service is working');
  }

  public getHeroes(): Observable<Heroe> {
    return this.http.get<Heroe>( this.serviceUrl + 'GetHeroes');
  }

  public getHeroe( id: string): Observable<Heroe> {
    return this.http.get<Heroe>( this.serviceUrl + 'GetHeroeById/' + id);
  }

  public addHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(this.serviceUrl + 'CreateHeroe', heroe, );
  }

  public updateHeroe(id: string, heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(this.serviceUrl + 'UpdateHeroeById/' + id, heroe);
  }

  public deleteHeroe(id: string): Observable<Heroe> {
    return this.http.delete<Heroe>(this.serviceUrl + 'DeleteHeroeById/' + id);
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
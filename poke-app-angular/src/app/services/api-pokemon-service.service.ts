import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeApi, PokeApiDescription, PokeApiList } from './interfaces/pokeapi.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonServiceService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getAllPokemons(offset: number, limit: number): Observable<PokeApiList> {
    return this.http.get<PokeApiList>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonById(id: string): Observable<PokeApi> {
    return this.http.get<PokeApi>(`https://pokeapi.co/api/v2/pokemon/${id}`) ;
  }

  getPokemonDescription(id: string): Observable<PokeApiDescription> {
    return this.http.get<PokeApiDescription>(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }
}




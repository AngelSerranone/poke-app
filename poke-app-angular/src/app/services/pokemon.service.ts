import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPokemons(): Observable<PokemonList> {
    return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500');
  }

  getPokemonById(pokemonName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
  }

  addPokemonToTeam(pokemonName: string, teamId:number): Observable<PokemonTeam> {
    return this.http.post<PokemonTeam>('http://localhost:8080/pokemon/' + pokemonName + '/' + teamId, null);
  }

  deletePokemonOfTeam(pokemonId:number): void {
    this.http.delete('http://localhost:8080/pokemon/' + pokemonId).subscribe(data=>
    console.log('Delete Pokemon with id = '+ pokemonId));  
  }

  getAllTrainers(): Observable<TrainerDB[]> {
    return this.http.get<TrainerDB[]>('http://localhost:8080/trainers');
  }

  getPokemonsByTrainer(TrainerId: number): Observable<PokemonTeam[]> {
    return this.http.get<PokemonTeam[]>('http://localhost:8080/trainer/' + TrainerId);
  }

  storeTrainer(trainer: Trainer): void {
    this.http.post('http://localhost:8080/trainer', this.body(trainer)).subscribe(data=>
    console.log('Post new Trainer'));
   }

  pokeBody(pokemonTeam: PokemonTeam) {
    let pokemonBody: any = {
      name: pokemonTeam.name,
      trainerId: pokemonTeam.trainerId
    }
  }
     
  body(trainer: Trainer): any {
    let trainerBody: any = {
      name: trainer.name,
      age: trainer.age,
      hobby: trainer.hobby,
      photo: trainer.photo
    }
    return trainerBody;
  }

  deleteTrainer(TrainerId: number): void {
    console.log(TrainerId)
    this.http.delete('http://localhost:8080/trainer/' + TrainerId).subscribe(data=>
    console.log('Delete Trainer with id = '+TrainerId));
  }

}

export interface PokemonList {
  results: [
    {
      name: string
    }
  ]
}

export interface Pokemon {
  name: string,
  sprites: {
    front_default: string
  }
  stats: [  //[0]hp, [1]attack, [2]defense, [3]specialAttack, [4]specialDefense, [5]speed
    {
      base_stat: number
    }
  ],
  types: [
    {
      type: {
        name: string
        //effort: number,
        //stat: any
      }
    }
  ],
  //description: string
}

export interface TrainerDB {
  "id": number,
  "name": string,
  "hobby": string,
  "age": number,
  "photo": string
}

export interface PokemonTeam {
  id: number,
  name: string,
  trainerId: number
}

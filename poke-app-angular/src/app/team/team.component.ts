import { Component, OnInit, ViewChild } from '@angular/core';
import { Trainer } from '../models/trainer';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonList, PokemonService, PokemonTeam, TrainerDB } from '../services/pokemon.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @ViewChild(PokemonCardComponent) pokemonCard: PokemonCardComponent

  showDetail: Boolean= false;
  pokemonName:string='';
  trainersList: TrainerDB[] = [];
  selectedTrainer: string = '';
  trainerId: number = null


  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getTrainers();
  }

  showDetails():void {
    if(this.showDetail === false) {
      this.showDetail = true;
    } else {
      this.showDetail = false;
    }
  }

  getTrainers(): void {
    this.pokemonService.getAllTrainers().subscribe(result =>{
      this.trainersList=result;
    });
  }

  showPokemons(): void {
    if(this.selectedTrainer !== '') {
      this.trainerId = parseInt(this.selectedTrainer.substring(0,1))
    }
  }

  addPokemonToTrainer(): void {
    if(this.pokemonName !== '') {
      this.pokemonCard.addPokemonToTrainer(this.pokemonName)
    }
    this.pokemonName='';
  }

  addPokemonWithEnter(event: KeyboardEvent): void{
    if (event.key === "Enter") {
      this.addPokemonToTrainer();
    }
  }

}

import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { Trainer } from '../models/trainer';
import { Pokemon, PokemonList, PokemonService, PokemonTeam, TrainerDB } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})

export class PokemonCardComponent implements OnInit {
  
  showDetail: Boolean[] = []
  trainersList: TrainerDB[] = [];

  @Input()
  trainerId: number = null

  @Input()
  pokemonList: PokemonTeam[] = [];

  teamList: Pokemon[] = [];

  
  @Output()
  deleteIdEvent = new EventEmitter<number>()
  @Output()
  deleteIndexEvent = new EventEmitter<number>()

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.trainerId !== undefined) {
      if(changes.trainerId.currentValue !== changes.trainerId.previousValue) {
        this.pokemonService.getPokemonsByTrainer(this.trainerId).subscribe(result => {
          this.pokemonList=result;
          this.getTeamInfo()
        });
      } 
    }
  }


  showDetails(index: number):void {
    if(this.showDetail[index] === false) {
      this.showDetail = []
      for(let i = 0; i < this.teamList.length; i++) {
        this.showDetail.push(false)
      }
      this.showDetail[index] = true;
    } else {
      this.showDetail[index] = false;
    }
  }

  getTrainers(): void {
    this.pokemonService.getAllTrainers().subscribe(result =>{
      this.trainersList=result;
    });
  }

  setPokemonListByTrainer(): void {
    this.getTeamInfo()
  }

  getTeamInfo(): void {
    this.teamList = new Array<Pokemon>(this.pokemonList.length)
    this.showDetail = new Array<boolean>(this.pokemonList.length)
    for(let i=0; i<this.pokemonList.length; i++) {
      this.pokemonService.getPokemonById(this.pokemonList[i].name.toLowerCase()).subscribe(result => {
        this.showDetail[i] = false
        this.teamList[i] = result
      })
    }
  }

  addPokemonToTrainer(pokemonName: string): void {
    if(this.trainerId !== null && this.pokemonList.length < 7 && pokemonName !== '') {
      this.pokemonService.getPokemonById(pokemonName).subscribe(result => {
        if(result !== undefined) {
          this.pokemonService.addPokemonToTeam(pokemonName, this.trainerId).subscribe(result => {
            this.pokemonList.push(result)
            this.getTeamInfo()
          })
        }
      })
    } else if(this.trainerId !== null && this.pokemonList.length >= 7 && pokemonName !== '') {
      alert("You don't have enough space in your backpack :(")
    } 
  }

  deletePokemon(id: number, index: number): void {
    this.pokemonService.deletePokemonOfTeam(id)
    this.pokemonList.splice(index, 1)
    this.getTeamInfo()
  }
}



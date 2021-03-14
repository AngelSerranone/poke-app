import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Pokemon } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  @Input()
  pokemon: any

  @Input()
  id: number

  @Output()
  deleteIdEvent = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  deletePokemon(): void {
    this.deleteIdEvent.emit(this.id)
  }

}

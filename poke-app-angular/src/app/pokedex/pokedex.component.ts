import { Component, OnInit } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokeApi, PokeApiDescription, PokeApiList } from '../services/interfaces/pokeapi.interface';
import { ApiPokemonServiceService } from '../services/api-pokemon-service.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  private readonly ELEMENTS_PER_PAGE = 9;

  loading: boolean = false;

  selectedPokemon: PokeApi;
  selectedPokemonDescription: string;

  pokemonList: PokeApiList;

  hasPrevious = false;
  hasNext = false;
  currentPage = 0;

  constructor(
    private readonly apiPokemonService: ApiPokemonServiceService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(offset = 0, limit = this.ELEMENTS_PER_PAGE): void {
    this.apiPokemonService.getAllPokemons(offset, limit).subscribe(result => {
      this.pokemonList = result;
      if (result.previous) {
        this.hasPrevious = true;
      } else {
        this.hasPrevious = false;
      }

      if (result.next) {
        this.hasNext = true;
      } else {
        this.hasNext = false;
      }
    })
  }

  showPokemon(event: MatSelectionListChange): void {
    this.loading = true;
    this.apiPokemonService.getPokemonById(event.options[0]?.value).toPromise().then(pokemon => {
      this.selectedPokemon = pokemon;
      this.apiPokemonService.getPokemonDescription(event.options[0]?.value).toPromise()
        .then(description => {
          this.selectedPokemonDescription = this.findDescription(description);
          this.loading = false;
        })
        .catch(error => {
          this.selectedPokemonDescription = "No description available for this pokemon";
          this.loading = false;
        });
    }).catch(error => {
      this.openSnackBar("Pokemon not found");
      this.selectedPokemon = null;
      this.selectedPokemonDescription = null;
    });
  }

  openSnackBar(message: string, action: string = null) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getPokemonId(url: string): number {
    const splitUrl = url.split("/");
    return +splitUrl[splitUrl.length - 2];
  }

  getPokemonImageUrl(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }

  getStat(stat: string): number {
    return this.selectedPokemon?.stats?.find(element => element.stat.name === stat).base_stat;
  }

  pagBack() {
    if (this.hasPrevious && this.currentPage > 0) {
      this.currentPage--;
      const newOffset = this.currentPage * this.ELEMENTS_PER_PAGE;
      this.loadPokemonList(newOffset);
    }
  }

  pagForward() {
    if (this.hasNext) {
      this.currentPage++;
      const newOffset = this.currentPage * this.ELEMENTS_PER_PAGE;
      this.loadPokemonList(newOffset);
    }
  }

  findDescription(descriptionsList: PokeApiDescription): string {
    if (!descriptionsList || !descriptionsList.flavor_text_entries) return "No description available for this pokemon";

    let description = "";
    descriptionsList.flavor_text_entries.forEach(entry => {
      if (entry.language.name === "en" && entry.flavor_text.length > description.length) {
        description = entry.flavor_text;
      }
    });

    return description;
  }
}

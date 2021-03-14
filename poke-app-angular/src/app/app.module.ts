import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerCardComponent } from './trainer-card/trainer-card.component';
import { TrainerDetailsComponent } from './trainer-details/trainer-details.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

import { PokedexComponent } from './pokedex/pokedex.component';
import { MaterialModule } from './material.module';
import { TeamComponent } from './team/team.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokemonDetailsComponent,
    TrainersComponent,
    TrainerCardComponent,
    TrainerDetailsComponent,
    PokedexComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


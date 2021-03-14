import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Trainer } from '../models/trainer';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './trainer-card.component.html',
  styleUrls: ['./trainer-card.component.css']
})
export class TrainerCardComponent implements OnInit {

  displayErrors: boolean = false;
  id: number;
  name: string = '';
  age: number = null;
  hobby: string = '';
  photo : string = '../assets/Trainer Sprites/none.png';
  photoText : string;
  lastId: number;
  trainersList: Trainer[] = [
    /* new Trainer(3, 'Pepe', 28, 'fisherman', this.choosePhoto('fisherman')),
    new Trainer(4, 'Pepa', 28, 'battleGirl', this.choosePhoto('battleGirl')),
    new Trainer(5, 'María', 28, 'skier', this.choosePhoto('skier')),
    new Trainer(6, 'Jose', 28, 'artist', this.choosePhoto('artist')),
    new Trainer(7, 'Cristina', 28, 'reporter', this.choosePhoto('reporter')),
    new Trainer(8, 'Elisa', 28, 'camper', this.choosePhoto('camper')),  */
  ];


  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
   this.addTrainersDB()
  }

  onSubmit(form: NgForm): void{
    console.log(form);
  
    if (form.valid){
      this.displayErrors=false;
    }
    else{
      this.displayErrors=true;
    }
  }

  createTrainer(name: string, age: number, hobby:string):void{

    this.name = name;
    this.age = age;
    this.hobby = hobby;

    let trainer: Trainer = new Trainer(this.id, this.name, this.age, this.hobby, this.choosePhoto(this.hobby));
    if (this.name!=='' && this.age!==null && this.hobby!==''){
      this.addTrainerToDB(trainer);
      setTimeout(() => {  this.addTrainersDB(); }, 500);
    }
  }

  choose():void{
    this.photo = '../assets/Trainer Sprites/' + this.hobby + '.png';
  }

  choosePhoto(hobby: string):string{
    this.photoText = '../assets/Trainer Sprites/' + hobby + '.png';
    return this.photoText;
  }

  clear():void{
    this.name =  '';
    this.hobby = '';
    this.age = null;
    this.displayErrors = false;
  }

  deleteTrainer(index: number, trainerId: number): void {
    this.trainersList.splice(index, 1);
    this.pokemonService.deleteTrainer(trainerId);
  }

  addTrainersDB(): void {
    this.pokemonService.getAllTrainers().subscribe(dataResult => {
      if (this.trainersList.length < dataResult.length){
        this.trainersList =[];
        for(let i=0; i<dataResult.length;i++){ 
          this.id = dataResult[i].id;
          this.name = dataResult[i].name;
          this.hobby= dataResult[i].hobby;
          this.age = dataResult[i].age;
          this.photo = '../assets/Trainer Sprites/' + this.hobby + '.png';
          this.trainersList.push(
            new Trainer(this.id, this.name, this.age, this.hobby, this.photo));
      }}
      this.id =  null;
      this.name =  '';
      this.hobby = '';
      this.age = null;
      this.photo ='';
    })
  } 

  deleteTrainerDB(TrainerId: number): void{
    this.pokemonService.deleteTrainer(TrainerId);
  }

  addTrainerToDB(trainer: Trainer): void{
    this.pokemonService.storeTrainer(trainer);
  }

}
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from '../models/trainer';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {

  @Input()
  trainer: Trainer

  @Input()
  index: number

  @Input()
  trainerId: number

  @Input()
  deleteTrainer: Function

  constructor() { }

  ngOnInit(): void {
  }

  deleteTrainerDetails(): void {
    this.deleteTrainer(this.index, this.trainerId)
  }

}

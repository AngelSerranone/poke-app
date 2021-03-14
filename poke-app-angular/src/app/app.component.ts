import { Component, ViewChild,ViewEncapsulation } from '@angular/core';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'poke-app-angular';

  @ViewChild(TeamComponent) team: TeamComponent

  onTeamTabClick(): void {
    this.team.getTrainers()
  }
}



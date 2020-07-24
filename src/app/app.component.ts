import { Component } from '@angular/core';
import {TopService} from "./services/topservice/top.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  characters: Array<any>;
  times = ['Today', 'Week', 'Month', 'Year'];
  countries = [
    'United States',
    'Germany',
    'United Kingdom',
    'France',
    'Canada',
    'Australia',
    'China',
    'South Korea',
    'Belgium',
    'Sweden',
    'Poland',
    'Singapore',
    'Denmark',
    'Russia',
    'Japan',
    'Italy',
    'New Zealand',
    'Mexico',
    'Netherlands',
    'Austria',
    'Taiwan',
    'Croatia',
    'Argentina',
    'Portugal',
    'Greece',
    'Ireland',
    'Switzerland',
    'Turkey',
    'Chile',
    'Saudi Arabia',
    'Columbia',
    'Malaysia',
    'Hong Kong',
    'Czech Republic',
    'Finland',
    'Philippines',
    'South Africa',
    'Norway'
  ];

  constructor(private topService: TopService) {
    this.topService.getCharacters().subscribe(data => {
      this.characters = data;
    });
  }

}



import { Component } from '@angular/core';
import {TopService} from "./services/topservice/top.service";
import {BundleService} from "./services/bundle-service/bundle.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  characters: any[];
  countries: string[];
  times = ['Today', 'Week', 'Month', 'Year'];
  decks = [
    {id: 'All', name: 'All'},
    {id: 'Standard', name: 'Standard'},
    {id: 'Dragon', name: 'Dragon'},
    {id: 'Naturia', name: 'Naturia'},
    {id: 'Spellcaster', name: 'Spellcaster'},
    {id: 'Toon', name: 'Toon'},
    {id: 'Zombie', name: 'Zombie'},
    {id: 'Aqua', name: 'Aqua'},
    {id: 'Fiend', name: 'Fiend'},
    {id: 'Machine', name: 'Machine'},
    {id: 'Warrior', name: 'Warrior'},
    {id: 'Insect', name: 'Insect'},
    {id: 'Plant', name: 'Plant'},
    {id: 'Megatype', name: 'Megatype'},
    {id: 'Increment', name: 'Increment'},
    {id: 'Creator', name: 'Creator'},
    {id: 'Ojama', name: 'Ojama'},
    {id: 'Exodia', name: 'Exodia'},
    {id: 'A1', name: 'Ascended I'},
    {id: 'A2', name: 'Ascended II'},
    {id: 'A3', name: 'Ascended III'},
    {id: 'P1', name: 'Pharaoh I'},
    {id: 'P2', name: 'Pharaoh II'},
    {id: 'P3', name: 'Pharaoh III'},
    {id: 'P4', name: 'Pharaoh IV'},
    {id: 'P5', name: 'Pharaoh V'},
    {id: 'RS', name: 'Random (Small)'},
    {id: 'RB', name: 'Random (Big)'},
    {id: 'Upgrade', name: 'Upgrade'},
    {id: 'Metronome', name: 'Metronome'}
  ]


  constructor(private bundleService: BundleService, private topService: TopService) {
    this.topService.getCharacters().subscribe(data => {
      this.characters = data;
    });

    this.bundleService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }

}



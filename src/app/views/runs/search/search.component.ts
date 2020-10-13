import { Component, OnInit } from '@angular/core';
import {DeckList} from '../../../models/DeckList';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {DateFormatter} from '../../../utils/DateFormatter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  decks = DeckList.decks;
  killedBys: string[] = ['3 Louse', 'Gremlin Nob'];
  deckFilter: string[] = [];
  killedByFilter: string[] = [];
  ascensions: number[] = [];
  challenges: number[] = [];
  events: string[] = [];
  from: Date;
  to: Date;
  datesPicked = { from: null, to: null};
  ascensionFrom = 0;
  ascensionTo = 20;
  challengeFrom: -1;
  challengeTo: 20;

  constructor() { }

  ngOnInit(): void {
    for (let i = -1; i <= 20; i++) {
      if (i > -1) { this.ascensions.push(i); }
      this.challenges.push(i);
    }
  }

  setFromDate(type: string, event: MatDatepickerInputEvent<unknown>) {
    this.events.push(`${type}: ${event.value}`);
    this.from = new Date(this.events[0].substring(8));
    this.datesPicked.from = DateFormatter.formatDate(this.from);
    this.events = [];
  }

  setToDate(type: string, event: MatDatepickerInputEvent<unknown>) {
    this.events.push(`${type}: ${event.value}`);
    this.to = new Date(this.events[0].substring(8));
    this.datesPicked.to = DateFormatter.formatDate(this.to);
    this.events = [];
  }

  clearFilter(which: string) {
    switch (which) {
      case 'deck':
        this.deckFilter = [];
        break;
      case 'killedBy':
        this.killedByFilter = [];
        break;
      case 'ascension':
        this.ascensionFrom = 0;
        this.ascensionTo = 20;
        break;
      case 'challenge': break;
      case 'date': break;
    }
    console.log('which', which, this.ascensionFrom, this.ascensionTo);
  }

  log(): void {
    console.log(this.deckFilter);
  }

  applyFilter(event: Event): void {}

}

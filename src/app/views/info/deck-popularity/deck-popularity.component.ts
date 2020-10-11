import { Component, OnInit } from '@angular/core';
import {RunLogService} from '../../../services/run-log-service/run-log.service';
import {DeckPopularity} from '../../../models/DeckPopularity';
import {GeneralUtil} from '../../../utils/Utilities';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

declare const Plotly: any;

@Component({
  selector: 'app-deck-popularity',
  templateUrl: './deck-popularity.component.html',
  styleUrls: ['./deck-popularity.component.scss']
})
export class DeckPopularityComponent implements OnInit {

  sub: Subscription;
  data: DeckPopularity[];
  filtered: DeckPopularity[];
  graphData: any[];
  year: number = 2020;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private runService: RunLogService) { }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Deck Popularity');
    this.sub = this.route.params.subscribe(params => {
      this.year = params.year ? params.year : 2020;
      this.runService.getDeckPopularity().subscribe(data => {
        this.data = data;
        this.graphData = this.getDecksFromData(this.data);
        const layout = {
          title: 'Runs by Month (Deck)',
          height: 600,
          xaxis: {
            title: 'Month'
          },
          yaxis: {
            title: 'Runs'
          }
        };
        Plotly.newPlot('graph', this.graphData, layout);
      });
    });
  }

  click(): void {
    console.log('data:', this.graphData);
  }

  getDecksFromData(data: DeckPopularity[]): any[] {
    const decks = [];
    for (let i = 0; i < data.length; i++) {
      const pop = data[i];
      if ((decks.indexOf(pop.deck) == -1) && pop.deck !== 'NotYugi') {
        decks.push(pop.deck);
      }
    }
    const out = [];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let d = 0; d < decks.length; d++) {
      const deck = decks[d];
      const filter = data.filter(pop => pop.deck == deck && pop.year == this.year);
      const deckData = {
        x: [],
        y: [],
        type: 'scatter',
        name: deck
      }
      for (let i = 0; i < 12; i++) {
        deckData.x.push(months[i]);
        deckData.y.push(0);
      }
      for (let i = 0; i < filter.length; i++) {
        const pop = filter[i];
        deckData.y[pop.month - 1] = pop.amount;
      }
      out.push(deckData);
    }
    out.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      return (aName > bName) ? 1 : ((bName > aName) ? -1 : 0)
    });
    return out;
  }

}

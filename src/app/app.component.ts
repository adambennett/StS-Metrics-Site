import { Component } from '@angular/core';
import { BundleService } from "./services/bundle-service/bundle.service";
import { RunLogService } from "./services/run-log-service/run-log.service";
import { DeckList } from "./models/DeckList";
import { Timestamps } from "./models/Timestamps";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  characters: any[];
  countries: string[];
  times = Timestamps.times;
  decks = DeckList.decks;

  constructor(
    private bundleService: BundleService,
    private runLogService: RunLogService) {
      this.runLogService.getCharacters().subscribe(data =>  { this.characters = data; });
      this.bundleService.getCountries().subscribe(data =>   { this.countries = data;  });
    }
}



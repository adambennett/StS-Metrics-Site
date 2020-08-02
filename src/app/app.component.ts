import { BundleService } from "./services/bundle-service/bundle.service";
import { RunLogService } from "./services/run-log-service/run-log.service";
import { DeckList } from "./models/DeckList";
import { Timestamps } from "./models/Timestamps";
import {Country} from "./models/Country";
import {ModInfoBundle} from "./models/ModInfoBundle";
import {InfoService} from "./services/info-service/info.service";
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  characters: string[];
  countries: Country[];
  mods: ModInfoBundle[];

  title = 'frontend';
  times = Timestamps.times;
  decks = DeckList.decks;


  constructor(
    private bundleService: BundleService,
    private runLogService: RunLogService,
    private infoService: InfoService) {
      this.runLogService.getCharacters().subscribe(data =>  { this.characters = data; });
      this.bundleService.getCountries().subscribe(data =>   { this.countries = data;  });
      this.infoService.getAllMods().subscribe(data =>       { this.mods = data; });
    }
}



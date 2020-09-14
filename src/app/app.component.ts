import { BundleService } from "./services/bundle-service/bundle.service";
import { RunLogService } from "./services/run-log-service/run-log.service";
import { DeckList } from "./models/DeckList";
import { Timestamps } from "./models/Timestamps";
import {Country} from "./models/Country";
import {ModInfoBundle} from "./models/ModInfoBundle";
import {InfoService} from "./services/info-service/info.service";
import {Component} from '@angular/core';
import {Utilities} from './utils/RunUtils';

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
  sidebarOpen: boolean = true;

  static pageTitle: string = '';

  constructor(
    private bundleService: BundleService,
    private runLogService: RunLogService,
    private infoService: InfoService) {
    this.sidebarOpen = sessionStorage.sidebar ? sessionStorage.sidebar === 'true' : true;
    this.runLogService.getCharacters().subscribe(data => {
      this.characters = data;
    });
    this.bundleService.getCountries().subscribe(data => {
      this.countries = data;
    });
    this.infoService.getAllMods().subscribe(data => {
      this.mods = data;
    });
  }

  goToUrl(url: string, newTab: boolean): void {
    if (newTab) {
      window.open(url, "_blank");
    } else {
      window.open(url);
    }
  }

  goToDonate(): void {
    const url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=US9KN9GPC3FDA&currency_code=USD&source=url';
    this.goToUrl(url, true);
  }

  toggleFilterBox(show: string): void {
    Utilities.toggleFilter(show);
  }

  toggleSidebar(sidebar: any): void {
    sidebar.toggle();
    this.sidebarOpen = !this.sidebarOpen;
    sessionStorage.sidebar = this.sidebarOpen.toString();
    if (document.getElementById('sidebar-opener')) {
      document.getElementById('sidebar-opener').style.display = this.sidebarOpen ? 'block' : 'none';
    }
  }

  getTitle(): string {
    return AppComponent.pageTitle;
  }

  isSidebarOpen = () => sessionStorage.sidebar ? sessionStorage.sidebar === 'true' : this.sidebarOpen;

}


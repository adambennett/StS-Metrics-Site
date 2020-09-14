import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RunLog} from "../../../models/RunLog";
import {RunLogService} from "../../../services/run-log-service/run-log.service";
import {DateFormatter} from "../../../utils/DateFormatter";
import {DisplayDeck} from '../../../models/DisplayDeck';
import {RunsColumns, RunsColumnsModel} from '../../../models/Archive';
import {Country} from '../../../models/Country';
import {ModInfoBundle} from '../../../models/ModInfoBundle';
import {BundleService} from '../../../services/bundle-service/bundle.service';
import {InfoService} from '../../../services/info-service/info.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Timestamps} from '../../../models/Timestamps';
import {Utilities} from '../../../utils/RunUtils';
import {GeneralUtil} from '../../../utils/Utilities';
import {MatRipple} from '@angular/material/core';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  timeframes = Timestamps.times;
  params: Params;
  sub: Subscription;
  displayedColumns: string[];
  runs: RunLog[];
  currentRuns: RunLog[];
  dataSource: MatTableDataSource<RunLog>;
  runType: string;
  columns: RunsColumnsModel = RunsColumns;
  characters: string[] = [];
  killedBys: string[] = [];
  countries: Country[];
  mods: ModInfoBundle[];
  disableRefresh: boolean = false;
  matchAll: boolean = false;
  characterFilter: string[] = [];
  killedByFilter: string[] = [];
  countryFilter: string[] = [];
  startingDecks: string[] = [];
  startingDecksFilter: string[] = [];
  timeFilter: string = '';
  loadedInitialRuns: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatRipple) ripple: MatRipple;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private runService: RunLogService,
              private bundleService: BundleService,
              private infoService: InfoService) { }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Run Log');
    this.sub = this.route.params.subscribe(params => {
      this.runs = null;
      this.params = params;
      this.render(params);
    });
    this.runService.getCharacters().subscribe(data =>  {
      this.characters = data;
      this.characters.unshift('The Duelist');
    });
    this.bundleService.getCountries().subscribe(data =>   { this.countries = data;  });
    this.infoService.getAllMods().subscribe(data =>       { this.mods = data; });
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true
    });

    // Fade out the ripple later.
    setTimeout(() => { rippleRef.fadeOut(); }, 300);

  }

  populateFilters(): void {
    this.populateStartingDeckFilter();
    this.populateCharacterFilter();
    this.populateKilledBy();
  }

  populateStartingDeckFilter(): void {
    this.startingDecks = [];
    for (let i = 0; i < this.runs.length; i++) {
      const run = this.runs[i];
      if (!(run.deck === 'NotYugi' || this.startingDecks.indexOf(run.deck) > -1)) {
        this.startingDecks.push(run.deck);
      }
    }
    this.startingDecks.sort((a,b) => a.localeCompare(b));
  }

  populateCharacterFilter(): void {
    for (let i = 0; i < this.runs.length; i++) {
      const run = this.runs[i];
      if (this.characters.indexOf(run.characterName) < 0) {
        this.characters.push(run.characterName);
      }
    }
    this.characters.sort((a,b) => a.localeCompare(b));
    this.characters.unshift('The Duelist');
  }

  populateKilledBy(): void {
    for (let i = 0; i < this.runs.length; i++) {
      const run = this.runs[i];
      if (this.killedBys.indexOf(run.killedBy) < 0 && run.killedBy !== '') {
        this.killedBys.push(run.killedBy);
      }
    }
    this.killedBys.sort((a,b) => a.localeCompare(b));
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource<RunLog>(this.currentRuns.slice().reverse());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggleFilterBox(show: string): void {
    Utilities.toggleFilter(show);
  }

  onChange(value: MatSlideToggleChange): void {
    this.matchAll = value.checked;
  }

  checkForUpdates(): void {
    this.render(this.params);
    this.disableRefresh = true;
    setTimeout(() => {
      this.disableRefresh = false;

    }, 7500);
  }

  storeRunData(index: number): void {
    sessionStorage.runLog = JSON.stringify(this.runs.reverse()[index]);
  }

  clearFilters(): void {
    this.characterFilter = [];
    this.countryFilter = [];
    this.startingDecksFilter = [];
    this.killedByFilter = [];
    this.timeFilter = '';
    const currentRunSize = this.currentRuns.length;
    this.currentRuns = this.runs;
    if (currentRunSize !== this.currentRuns.length) {
      this.launchRipple();
    }
    this.refreshTable();
  }

  allFiltersEmpty(): boolean {
    return this.characterFilter.length < 1
      && this.countryFilter.length < 1
      && this.timeFilter === ''
      && this.startingDecksFilter.length < 1
      && this.killedByFilter.length < 1;
  }

  checkFilters(run: RunLog, all: boolean, allEmpty: boolean): boolean {
    if (all) {
      return Utilities.matchAtLeastOneSelectedCharacter(this.characterFilter, run, all)
        &&   Utilities.matchAtLeastOneSelectedCountry(this.countryFilter, run, all)
        &&   Utilities.matchSelectedTime(this.timeFilter, run, all)
        &&   Utilities.matchFilterToRunProperty('deck', this.startingDecksFilter, run, all)
        &&   Utilities.matchFilterToRunProperty('killedBy', this.killedByFilter, run, all);
    } else {
      return allEmpty
        ||   Utilities.matchAtLeastOneSelectedCharacter(this.characterFilter, run, all)
        ||   Utilities.matchAtLeastOneSelectedCountry(this.countryFilter, run, all)
        ||   Utilities.matchSelectedTime(this.timeFilter, run, all)
        ||   Utilities.matchFilterToRunProperty('deck', this.startingDecksFilter, run, all)
        ||   Utilities.matchFilterToRunProperty('killedBy', this.killedByFilter, run, all);
    }
  }

  filterRuns(): void {

    document.body.style.cursor = 'wait';
    const allFiltersAreEmpty: boolean = this.allFiltersEmpty();
    const currentRunSize = this.currentRuns.length;
    this.currentRuns = this.runs.filter((run) => this.checkFilters(run, this.matchAll, allFiltersAreEmpty));
    if (currentRunSize !== this.currentRuns.length) {
      this.launchRipple();
    }
    this.refreshTable();
    document.body.style.cursor = 'auto';
  }

  refreshRuns(data: RunLog[]): void {
    if (this.loadedInitialRuns) {
      this.launchRipple();
    } else {
      this.loadedInitialRuns = true;
    }
    if (this.runs == null || this.runs.length < data.length) {
      this.runs = data;
      this.currentRuns = this.runs;
      this.populateFilters();
      this.refreshTable();
    }
  }

  render(params: Params): void {
    document.body.style.cursor = 'wait';
    const runType: string = params.type;
    const specificRunType: string = params.secondType;
    const hallOfFameType: string = params.hofType;
    if (runType) {
      this.displayedColumns = runType === 'Duelist' ? this.columns.duelist : this.columns.general;
      switch (runType) {
        case 'All':
          this.runType = 'All';
          this.runService.getAllRuns().subscribe(data => {
            this.refreshRuns(data);
          });
          break;
        case 'Duelist':
          this.runType = 'Duelist';
          this.runService.getDuelistRuns().subscribe(data => {
            this.refreshRuns(data);
          });
          break;
        case 'Non-Duelist':
          this.runType = 'Non-Duelist';
          this.runService.getNonDuelistRuns().subscribe(data => {
            this.refreshRuns(data);
          });
          break;
        case 'Character':
          this.runType = 'Character';
          this.runService.getCharacterRuns(specificRunType).subscribe(data => {
            this.refreshRuns(data);
          });
          break;
        case 'Country':
          this.runType = 'Country';
          this.runService.getRunsByCountry(specificRunType).subscribe(data => {
            this.refreshRuns(data);
          });
          break;
        case 'Time':
          this.runType = 'Time';
          const timestamp = DateFormatter.getTimestamp(specificRunType);
          this.runService.getRunsByTime(timestamp.start, timestamp.end).subscribe(data => {
            this.refreshRuns(data);
          });
          break;
        case 'Host':
          this.runType = 'Host';
          this.runService.getRunsByHost(specificRunType).subscribe(data => {
            this.refreshRuns(data);
          });
          break;
        case 'hall-of-fame':
          let runs: DisplayDeck[] = [];
          const deck: string = specificRunType;
          this.runType = hallOfFameType === 'highest-challenge' || (deck !== 'Non-Duelist Character' && deck !== 'All') ? 'Duelist' : 'Character';
          this.displayedColumns = this.runType === 'Duelist' ? this.columns.duelist : this.columns.general;
          if (sessionStorage.hallOfFame) {
            runs = JSON.parse(sessionStorage.hallOfFame);
          } else {
            //ajax me
          }
          const runIds: number[] = [];
          for (let i = 0; i < runs.length; i++) {
            const run: DisplayDeck = runs[i];
            const idArr: number[] = hallOfFameType === 'highest-challenge' ? run.highestChallengeRunID : run.highestFloorRunID;
            if (run.deck === deck) {
              idArr.forEach((id) => { runIds.push(id); });
              break;
            }
          }
          this.runService.getRunsByIds(runIds).subscribe(data => {
            this.refreshRuns(data);
          });
          break;
      }
    }
    document.body.style.cursor = 'auto';
  }
}

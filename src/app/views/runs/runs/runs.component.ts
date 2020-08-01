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
import * as lookup from 'country-code-lookup'

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  params: Params;
  sub: Subscription;
  displayedColumns: string[];
  runs: RunLog[];
  currentRuns: RunLog[];
  dataSource: MatTableDataSource<RunLog>;
  runType: string;
  columns: RunsColumnsModel = RunsColumns;
  characters: string[];
  countries: Country[];
  mods: ModInfoBundle[];

  matchAll: boolean = false;
  characterFilter: string[];
  countryFilter: string[];
  timeFilter: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private runService: RunLogService,
              private bundleService: BundleService,
              private infoService: InfoService) { }

  ngOnInit(): void {
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

  onChange(value: MatSlideToggleChange) {
    this.matchAll = value.checked;
  }

  checkForUpdates(): void {
    this.render(this.params);
  }

  storeRunData(index: number): void {
    sessionStorage.runLog = JSON.stringify(this.runs.reverse()[index]);
  }

  clearFilters(): void {
    this.characterFilter = [];
    this.countryFilter = [];
    this.currentRuns = this.runs;
    this.dataSource = new MatTableDataSource<RunLog>(this.currentRuns.slice().reverse());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllFromCountry(): RunLog[] {
    const newRuns: RunLog[] = [];
    this.countryFilter.forEach((locale) => {
      this.runs.forEach((run) => {
        if (run.country === locale) {
          newRuns.push(run);
        }
      });
    });
    return newRuns;
  }

  filterRuns(): void {
    document.body.style.cursor = 'wait';
    let filtered: boolean = false;
    const allowed: RunLog[] = [];
    const ignored: RunLog[] = [];
    if (this.matchAll) {
      if (this.characterFilter && this.characterFilter.length > 0) {
        filtered = true;
        this.characterFilter.forEach((char) => {
          char = char === 'The Duelist' || char === 'THE_DUELIST' ? 'THE_DUELIST' : char;
          this.runs.forEach((run) => {
            if ((char === 'THE_DUELIST' && (run.deck !== 'NotYugi' || run.characterName.startsWith('The Duelist'))) || run.characterName === char) {
              if (this.countryFilter && this.countryFilter.length > 0) {
                this.countryFilter.forEach((locale) => {
                  const country = lookup.byCountry(locale);
                  if (locale === run.country || (country && run.country === country.iso2)) {
                    allowed.push(run);
                  }
                });
              } else {
                allowed.push(run);
              }
            }
          });
        });
      } else if (this.countryFilter && this.countryFilter.length > 0) {
        this.runs.forEach((run) => {
          this.countryFilter.forEach((locale) => {
            const country = lookup.byCountry(locale);
            if (locale === run.country || (country && run.country === country.iso2)) {
              allowed.push(run);
            }
          });
        });
      }
    } else {
      if (this.characterFilter && this.characterFilter.length > 0) {
        filtered = true;
        this.characterFilter.forEach((char) => {
          char = char === 'The Duelist' || char === 'THE_DUELIST' ? 'THE_DUELIST' : char;
          this.runs.forEach((run) => {
            if ((char === 'THE_DUELIST' && (run.deck !== 'NotYugi' || run.characterName.startsWith('The Duelist'))) || run.characterName === char) {
              allowed.push(run);
            } else {
              ignored.push(run);
            }
          });
        });
      }

      //const ignoredAfterCountry: RunLog[] = [];
      if (this.countryFilter && this.countryFilter.length > 0) {
        filtered = true;
        this.countryFilter.forEach((locale) => {
          if (ignored.length < 1) {
            this.runs.forEach((run) => {
              const country = lookup.byCountry(locale);
              if (locale === run.country || (country && run.country === country.iso2)) {
                allowed.push(run);
              } else {
                //ignoredAfterCountry.push(run);
              }
            });
          } else {
            ignored.forEach((run) => {
              const country = lookup.byCountry(locale);
              if (locale === run.country || (country && run.country === country.iso2)) {
                allowed.push(run);
              } else {
                //ignoredAfterCountry.push(run);
              }
            });
          }
        });
      }

    }

    if (filtered) {
      this.currentRuns = allowed;
      this.dataSource = new MatTableDataSource<RunLog>(this.currentRuns.slice().reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    document.body.style.cursor = 'auto';
  }

  refreshRuns(data: RunLog[]): void {
    if (this.runs == null || this.runs.length < data.length) {
      this.runs = data;
      this.currentRuns = this.runs;
      this.dataSource = new MatTableDataSource<RunLog>(this.currentRuns.slice().reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  render(params: Params): void {
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
  }
}

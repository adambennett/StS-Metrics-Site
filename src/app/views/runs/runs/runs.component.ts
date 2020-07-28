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

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  sub: Subscription;
  displayedColumns: string[];
  runs: RunLog[];
  dataSource: MatTableDataSource<RunLog>;
  runType: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private runService: RunLogService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.render(params);
    });
  }

  render(params: Params): void {
    const runType: string = params.type;
    const specificRunType: string = params.secondType;
    const hallOfFameType: string = params.hofType;
    if (runType) {
      this.displayedColumns = runType === 'Duelist' ? ['host', 'deck', 'floor', 'victory', 'ascension', 'challenge', 'killedBy', 'kaiba', 'time', 'details'] : ['host', 'character', 'floor', 'victory', 'ascension', 'killedBy', 'time', 'details'];
      switch (runType) {
        case 'All':
          this.runType = 'All';
          this.runService.getAllRuns().subscribe(data => {
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
        case 'Duelist':
          this.runType = 'Duelist';
          this.runService.getDuelistRuns().subscribe(data => {
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
        case 'Non-Duelist':
          this.runType = 'Non-Duelist';
          this.runService.getNonDuelistRuns().subscribe(data => {
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
        case 'Character':
          this.runType = 'Character';
          this.runService.getCharacterRuns(specificRunType).subscribe(data => {
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
        case 'Country':
          this.runType = 'Country';
          this.runService.getRunsByCountry(specificRunType).subscribe(data => {
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
        case 'Time':
          this.runType = 'Time';
          const timestamp = DateFormatter.getTimestamp(specificRunType);
          this.runService.getRunsByTime(timestamp.start, timestamp.end).subscribe(data => {
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
        case 'Host':
          this.runType = 'Host';
          this.runService.getRunsByHost(specificRunType).subscribe(data => {
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
        case 'hall-of-fame':
          const runs: DisplayDeck[] = JSON.parse(sessionStorage.hallOfFame);
          const deck: string = specificRunType;
          this.runType = hallOfFameType === 'highest-challenge' || (deck !== 'Non-Duelist Character' && deck !== 'All') ? 'Duelist' : 'Character';
          this.displayedColumns = this.runType === 'Duelist' ? ['host', 'deck', 'floor', 'victory', 'ascension', 'challenge', 'killedBy', 'kaiba', 'time', 'details'] : ['host', 'character', 'floor', 'victory', 'ascension', 'killedBy', 'time', 'details'];
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
            this.runs = data;
            this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          break;
      }
    }
  }

}

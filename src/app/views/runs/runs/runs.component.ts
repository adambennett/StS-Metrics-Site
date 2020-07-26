import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {RunLog} from "../../../models/RunLog";
import {RunLogService} from "../../../services/run-log-service/run-log.service";
import {DateFormatter} from "../../../utils/DateFormatter";

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
      const runType = params.type;
      const specificRunType = params.secondType;
      if (runType) {
        this.displayedColumns = runType === 'Duelist' ? ['host', 'deck', 'floor', 'victory', 'ascension', 'challenge', 'killedBy', 'kaiba', 'time'] : ['host', 'character', 'floor', 'victory', 'ascension', 'killedBy', 'time'];
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
        }
      }
    });
  }
}

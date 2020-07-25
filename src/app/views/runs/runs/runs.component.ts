import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {TopService} from "../../../services/topservice/top.service";
import {RunLog} from "../../../models/RunLog";

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
              private topService: TopService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const type = params.type;
      const secondType = params.secondType;
      console.log("types:", type, secondType);
      if (type) {
        this.displayedColumns = type === 'Duelist' ? ['host', 'deck', 'floor', 'victory', 'ascension', 'challenge', 'killedBy', 'kaiba', 'time'] : ['host', 'character', 'floor', 'victory', 'ascension', 'killedBy', 'time'];
        switch (type) {
          case 'All':
            this.runType = 'All';
            this.topService.getAllRuns().subscribe(data => {
              this.runs = data;
              this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
            break;
          case 'Duelist':
            this.runType = 'Duelist';
            this.topService.getDuelistRuns().subscribe(data => {
              this.runs = data;
              this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
            break;
          case 'Non-Duelist':
            this.runType = 'Non-Duelist';
            this.topService.getNonDuelistRuns().subscribe(data => {
              this.runs = data;
              this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
            break;
          default:
            switch (secondType) {
              case 'Character':
                this.runType = 'Character';
                this.topService.getCharacterRuns(type).subscribe(data => {
                  this.runs = data;
                  this.dataSource = new MatTableDataSource<RunLog>(this.runs.slice().reverse());
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                });
                break;
              case 'Country':
                this.runType = 'Country';
                break;
              case 'Time':
                this.runType = 'Time';
                break;
            }
            break;
        }
      }
    });
  }

}

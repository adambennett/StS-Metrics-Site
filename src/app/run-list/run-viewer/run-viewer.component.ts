import {Component, OnInit, ViewChild} from '@angular/core';
import {TopService} from "../../services/topservice/top.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {RunLog} from "../../models/RunLog";

@Component({
  selector: 'app-run-viewer',
  templateUrl: './run-viewer.component.html',
  styleUrls: ['./run-viewer.component.scss']
})
export class RunViewerComponent implements OnInit {

  sub: Subscription;
 // displayedColumns: string[] = ['host', 'character', 'floor', 'victory', 'ascension', 'killedBy', 'time'];
  runs: RunLog[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private topService: TopService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const char = params.char;
      if (char) {
        this.topService.getCharacterRuns(char).subscribe(data => {
          this.runs = data;
          this.dataSource = new MatTableDataSource<any>(this.runs.slice().reverse());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }

}

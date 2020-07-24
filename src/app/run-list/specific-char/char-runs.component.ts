import {Component, OnInit, ViewChild} from '@angular/core';
import {TopService} from "../../services/topservice/top.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-all-runs',
  templateUrl: './char-runs.component.html',
  styleUrls: ['./char-runs.component.scss']
})
export class CharRunsComponent implements OnInit {

  sub: Subscription;
  displayedColumns: string[] = ['host', 'character', 'floor', 'victory', 'ascension', 'killedBy', 'time'];
  runs: Array<any>;
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

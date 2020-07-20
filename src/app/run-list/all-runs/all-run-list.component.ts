import {Component, OnInit, ViewChild} from '@angular/core';
import {TopService} from "../../services/topservice/top.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
@Component({
  selector: 'app-all-run-list',
  templateUrl: './all-run-list.component.html',
  styleUrls: ['./all-run-list.component.scss']
})
export class AllRunListComponent implements OnInit {

  displayedColumns: string[] = ['host', 'character', 'floor', 'victory', 'ascension', 'killedBy', 'time'];
  runs: Array<any>;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private topService: TopService) { }

  ngOnInit(): void {
    this.topService.getAllRuns().subscribe(data => {
      this.runs = data;
      this.dataSource = new MatTableDataSource<any>(this.runs.slice().reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Archive, PathIconArchive} from "../../../models/Archive";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {RunLogService} from "../../../services/run-log-service/run-log.service";
import {environment} from '../../../../environments/environment';
import {TopBundle} from '../../../models/TopBundle';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-run-viewer',
  templateUrl: './run-viewer.component.html',
  styleUrls: ['./run-viewer.component.scss']
})
export class RunViewerComponent implements OnInit {

  dataSource: MatTableDataSource<TopBundle>;
  pathIcons: PathIconArchive = Archive;
  pathURLs: string[] = [];
  emptyPath: boolean = false;
  run: TopBundle;
  sub: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private runService: RunLogService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.runService.getRunView(id).subscribe(data => {
          this.run = data;
          this.calculatePath();
        });
      }
    });
  }


  calculatePath(): void {
    if (this.run.event.path_taken.length == 0) {
      this.emptyPath = true;
      return;
    }
    let foundAll = true;
    const badMatches: string[] = [];
    for (let i = 0; i < this.run.event.path_taken.length; i++) {
      const curr = this.run.event.path_taken[i];
      let foundOne = false;
      for (let j = 0; j < this.pathIcons.Icons.length; j++) {
        const archiveCurr = this.pathIcons.Icons[j];
        if (archiveCurr.id === curr) {
          this.pathURLs.push(archiveCurr.url);
          foundOne = true;
          break;
        }
      }
      if (!foundOne) {
        foundAll = false;
        badMatches.push(curr);
        this.pathURLs.push('/assets/path/unknownMonster.png');
      }
      if (environment.localhost) {
        console.log('found a match on all paths: ', foundAll)
      }
      if (!foundAll) {
        if (environment.localhost) {
          //alert('Bad path text found!');
          console.log('bad matches: ', badMatches);
        }
      }
    }
  }
}

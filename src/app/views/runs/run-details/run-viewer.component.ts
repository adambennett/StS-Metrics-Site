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

  displayedColumns: string[] = [
    'add_base_game_cards',
    'allow_boosters',
    'always_boosters',
    'remove_card_rewards',
    'bonus_puzzle_summons',
    'chose_seed',
    'customized_card_pool',
    'duelist_curses',
    'encounter_duelist_enemies',
    'is_beta',
    'is_daily',
    'is_endless',
    'playing_as_kaiba',
    'reduced_basic',
    'remove_creator',
    'remove_exodia',
    'remove_ojama',
    'remove_toons',
    'victory'
  ];
  dataSource: MatTableDataSource<TopBundle>;
  pathIcons: PathIconArchive = Archive;
  pathURLs: string[] = [];
  emptyPath: boolean = false;
  triggeredBadMatches: boolean = false;
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
          const arr: TopBundle[] = [];
          arr.push(this.run);
          this.dataSource = new MatTableDataSource<TopBundle>(arr);
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
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
        this.pathURLs.push(this.pathIcons.BadMatchIcon);
      }
      if (environment.localhost) {
        console.log('found a match on all paths: ', foundAll)
      }
      if (!foundAll && environment.localhost && !this.triggeredBadMatches) {
        alert('Bad path text found!');
        console.log('bad matches: ', badMatches);
        this.triggeredBadMatches = true;
      }
    }
  }
}

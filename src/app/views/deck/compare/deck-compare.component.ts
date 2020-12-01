import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {RunLogService} from "../../../services/run-log-service/run-log.service";
import {DisplayDeck} from '../../../models/DisplayDeck';
import {GeneralUtil} from '../../../utils/Utilities';

@Component({
  selector: 'app-deck-compare',
  templateUrl: './deck-compare.component.html',
  styleUrls: ['./deck-compare.component.scss']
})
export class DeckCompareComponent implements OnInit {
  displayedColumns: string[] = ['deck', 'runs', 'wins', 'a20runs', 'a20wins', 'highestChallenge', 'c20runs', 'c20wins', 'floor', 'killed', 'kaiba'];
  decks: DisplayDeck[];
  dataSource: MatTableDataSource<DisplayDeck>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private runLogService: RunLogService) { }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Deck Comparison');
    this.runLogService.getDeckCompare().subscribe(data => {
      this.decks = data;
      sessionStorage.hallOfFame = JSON.stringify(data);
      this.dataSource = new MatTableDataSource<DisplayDeck>(this.decks);
      this.dataSource.sort = this.sort;
    });
  }

}

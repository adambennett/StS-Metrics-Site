import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {CardService} from "../../../services/card-service/card.service";
import {InfoLookup} from '../../../utils/InfoLookup';
import {FullCardInfo} from '../../../models/FullCardInfo';
import {GeneralUtil} from '../../../utils/Utilities';
import {InfoService} from '../../../services/info-service/info.service';
import {ScoredCard} from '../../../models/ScoredCard';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  displayedColumns: string[] = ['card_name', 'act1_score', 'act2_score', 'act3_score', 'overall_score', 'card_id'];
  cards: ScoredCard[];
  dataSource: MatTableDataSource<ScoredCard>;
  sub: Subscription;
  lookupCard: string = '';
  fullCards: FullCardInfo[] = [];
  fullyLoaded: true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cardService: CardService,
              private infoService: InfoService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Card Stats');
    this.sub = this.route.params.subscribe(params => {
      const deck = params.deck;
      if (deck) {
        /*if (deck === 'All') {
          this.cardService.getCards().subscribe(data => {
            this.cards = data;
            this.dataSource = new MatTableDataSource<DisplayCard>(this.cards);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        } */
        //else {
        const pool = ((deck.startsWith('A') || deck.startsWith('P') || deck.startsWith('R')) && deck.length == 2) ? this.parseAscendedPharaohShorthand(deck) : deck;
          this.infoService.getCardScores(pool).subscribe(data => {
            this.cards = data;
            this.cards.sort((a: ScoredCard, b: ScoredCard) => {
              return a.card_name.localeCompare(b.card_name, undefined, {numeric: true, sensitivity: 'base'});
            });
            this.dataSource = new MatTableDataSource<ScoredCard>(this.cards);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        //}
      }
    });
  }

  parseAscendedPharaohShorthand(key: string): string {
    switch (key) {
      case 'A1': return 'Ascended I';
      case 'A2': return 'Ascended II';
      case 'A3': return 'Ascended III';
      case 'P1': return 'Pharaoh I';
      case 'P2': return 'Pharaoh II';
      case 'P3': return 'Pharaoh III';
      case 'P4': return 'Pharaoh IV';
      case 'P5': return 'Pharaoh V';
      case 'RS': return 'Random (Small)';
      case 'RB': return 'Random (Big)';
      default: return key;
    }
  }

  getLookupCard(card: string): void {
    this.lookupCard = InfoLookup.getLookupCard(card);
  }
}

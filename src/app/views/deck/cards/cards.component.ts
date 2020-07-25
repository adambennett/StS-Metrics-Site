import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {CardService} from "../../../services/card-service/card.service";
import {DisplayCard} from "../../../models/DisplayCard";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'popularity', 'power', 'offered', 'picked', 'pickVic'];
  cards: DisplayCard[];
  dataSource: MatTableDataSource<DisplayCard>;
  sub: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cardService: CardService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const deck = params.deck;
      if (deck) {
        if (deck === 'All') {
          this.cardService.getCards().subscribe(data => {
            this.cards = data;
            this.dataSource = new MatTableDataSource<DisplayCard>(this.cards);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        } else {
          this.cardService.getCardsFromDeck(deck).subscribe(data => {
            this.cards = data;
            this.dataSource = new MatTableDataSource<DisplayCard>(this.cards);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        }
      }
    });
  }
}

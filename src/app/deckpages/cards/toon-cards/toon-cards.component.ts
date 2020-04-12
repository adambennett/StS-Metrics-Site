import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TopService} from "../../../services/topservice/top.service";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-toon-cards',
  templateUrl: './toon-cards.component.html',
  styleUrls: ['./toon-cards.component.scss']
})
export class ToonCardsComponent implements OnInit {
  //displayedColumns: string[] = ['name', 'popularity', 'power', 'offered', 'picked', 'pickVic', 'id'];
  displayedColumns: string[] = ['name', 'popularity', 'power', 'offered', 'picked', 'pickVic'];
  cards: Array<any>;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private topService: TopService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.topService.getCardsFromDeck("Toon").subscribe(data => {
      this.cards = data;
      this.dataSource = new MatTableDataSource<any>(this.cards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
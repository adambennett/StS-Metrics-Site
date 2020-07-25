import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {DisplayObjectService} from "../../../services/display-object-service/display-object.service";
import {DisplayObject} from "../../../models/DisplayObject";

@Component({
  selector: 'app-relics',
  templateUrl: './relics.component.html',
  styleUrls: ['./relics.component.scss']
})
export class RelicsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'popularity', 'power', 'picked', 'pickVic'];
  relics: DisplayObject[];
  dataSource: MatTableDataSource<DisplayObject>;
  sub: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private displayService: DisplayObjectService) { }

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
          this.displayService.getRelics().subscribe(data => {
            this.relics = data;
            this.dataSource = new MatTableDataSource<DisplayObject>(this.relics);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        } else {
          this.displayService.getRelicsFromDeck(deck).subscribe(data => {
            this.relics = data;
            this.dataSource = new MatTableDataSource<DisplayObject>(this.relics);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        }
      }
    });
  }

}

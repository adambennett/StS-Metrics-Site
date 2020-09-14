import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {DisplayObjectService} from "../../../services/display-object-service/display-object.service";
import {DisplayObject} from "../../../models/DisplayObject";
import {GeneralUtil} from '../../../utils/Utilities';

@Component({
  selector: 'app-potions',
  templateUrl: './potions.component.html',
  styleUrls: ['./potions.component.scss']
})
export class PotionsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'popularity', 'power', 'picked', 'pickVic'];
  potions: DisplayObject[];
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
    GeneralUtil.setPageTitle('Potion Stats');
    this.sub = this.route.params.subscribe(params => {
      const deck = params.deck;
      if (deck) {
        if (deck === 'All') {
          this.displayService.getPotions().subscribe(data => {
            this.potions = data;
            this.dataSource = new MatTableDataSource<DisplayObject>(this.potions);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        } else {
          this.displayService.getPotionsFromDeck(deck).subscribe(data => {
            this.potions = data;
            this.dataSource = new MatTableDataSource<DisplayObject>(this.potions);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        }
      }
    });
  }

}

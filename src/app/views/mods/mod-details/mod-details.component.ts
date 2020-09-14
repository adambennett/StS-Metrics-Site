import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TopBundle} from '../../../models/TopBundle';
import {Subscription} from 'rxjs/Subscription';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralUtil} from '../../../utils/Utilities';
import {InfoService} from '../../../services/info-service/info.service';
import {InfoLookup} from '../../../utils/InfoLookup';

@Component({
  selector: 'app-mod-details',
  templateUrl: './mod-details.component.html',
  styleUrls: ['./mod-details.component.scss']
})
export class ModDetailsComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<TopBundle>;
  sub: Subscription;
  lookupCard: string = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private infoService: InfoService) { }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Mod Details');

  }

  getLookupCard(card: string): void {
    this.lookupCard = InfoLookup.getLookupCard(card);
  }

}

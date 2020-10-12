import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs/Subscription';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralUtil} from '../../../utils/Utilities';
import {InfoService} from '../../../services/info-service/info.service';
import {InfoLookup} from '../../../utils/InfoLookup';
import {StateService} from '../../../services/state.service';
import {ModInfoBundle} from '../../../models/ModInfoBundle';

@Component({
  selector: 'app-mod-details',
  templateUrl: './mod-details.component.html',
  styleUrls: ['./mod-details.component.scss']
})
export class ModDetailsComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<ModInfoBundle>;
  mod: ModInfoBundle;
  sub: Subscription;
  lookupCard: string = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private infoService: InfoService,
              private state: StateService) { }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Mod Details');
    const mods = [];
    mods.push(this.state.mod);
    this.mod = this.state.mod;
    console.log('mod', this.mod);
    this.dataSource = new MatTableDataSource<ModInfoBundle>(mods);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLookupCard(card: string): void {
    this.lookupCard = InfoLookup.getLookupCard(card);
  }

}

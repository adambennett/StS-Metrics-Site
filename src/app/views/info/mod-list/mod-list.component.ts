import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ModInfoBundle} from '../../../models/ModInfoBundle';
import {InfoService} from '../../../services/info-service/info.service';
import {GeneralUtil} from '../../../utils/Utilities';
import {MatPaginator} from '@angular/material/paginator';
import {StateService} from '../../../services/state.service';

@Component({
  selector: 'app-mod-list',
  templateUrl: './mod-list.component.html',
  styleUrls: ['./mod-list.component.scss']
})
export class ModListComponent implements OnInit {

  displayedColumns: string[] = ['mod'];
  mods: ModInfoBundle[];
  dataSource: MatTableDataSource<ModInfoBundle>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private infoService: InfoService, private state: StateService) { }

  storeRunData(index: number): void {
    this.state.mod = this.mods[index];
  }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Mod List');
    this.infoService.getAllMods().subscribe(data => {
      this.mods = data;
      this.dataSource = new MatTableDataSource<ModInfoBundle>(this.mods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}

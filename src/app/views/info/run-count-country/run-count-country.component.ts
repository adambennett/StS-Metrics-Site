import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {CountryRunCount} from "../../../models/CountryRunCount";
import {BundleService} from "../../../services/bundle-service/bundle.service";
import {GeneralUtil} from '../../../utils/Utilities';

@Component({
  selector: 'app-run-count-country',
  templateUrl: './run-count-country.component.html',
  styleUrls: ['./run-count-country.component.scss']
})
export class RunCountCountryComponent implements OnInit {

  displayedColumns: string[] = ['country', 'runs'];
  countries: CountryRunCount[];
  dataSource: MatTableDataSource<CountryRunCount>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bundleService: BundleService) { }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Runs - Breakdown by Country');
    this.bundleService.getRunCountByCountry().subscribe(data => {
      this.countries = data;
      this.dataSource = new MatTableDataSource<CountryRunCount>(this.countries);
      this.dataSource.sort = this.sort;
    });
  }
}

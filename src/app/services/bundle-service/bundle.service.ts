import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TopService} from "../topservice/top.service";
import {CountryRunCount} from "../../models/CountryRunCount";
import {ModInfoBundle} from "../../models/ModInfoBundle";
import {Country} from "../../models/Country";
import {ModViewer} from "../../models/ModViewer";

@Injectable({
  providedIn: 'root'
})
export class BundleService extends TopService {

  getModsFromBundle(id: number): Observable<ModViewer[]> {
    return this.http.get<ModViewer[]>(this.API + 'mods' + id);
  }

  getFullModsFromBundle(id: number): Observable<ModInfoBundle[]> {
    return this.http.get<ModInfoBundle[]>(this.API + 'fullmods' + id);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.API + 'countries');
  }

  getRunCountByCountry(): Observable<CountryRunCount[]> {
    return this.http.get<CountryRunCount[]>(this.API + 'runCountByCountry');
  }

}

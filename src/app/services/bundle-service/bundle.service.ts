import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RunLog} from "../../models/RunLog";
import {TopService} from "../topservice/top.service";

@Injectable({
  providedIn: 'root'
})
export class BundleService extends TopService {

  getRunCountByCountry(): Observable<any> {
    return this.http.get(this.API + 'runCountByCountry');
  }

  getCountries(): Observable<any> {
    return this.http.get(this.API + 'countries');
  }

  getModsFromBundle(id: number): Observable<any> {
    return this.http.get(this.API + 'mods' + id);
  }

  getFullModsFromBundle(id: number): Observable<any> {
    return this.http.get(this.API + 'fullmods' + id);
  }

}

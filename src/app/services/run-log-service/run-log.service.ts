import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RunLog} from "../../models/RunLog";
import {TopService} from "../topservice/top.service";
import {DisplayDeck} from "../../models/DisplayDeck";
import {TopBundle} from '../../models/TopBundle';

@Injectable({
  providedIn: 'root'
})
export class RunLogService extends TopService {

  getRunView(id: number): Observable<TopBundle> {
    return this.http.get<TopBundle>(this.API + 'run/' + id);
  }

  getDeckCompare(): Observable<DisplayDeck[]> {
    return this.http.get<DisplayDeck[]>(this.API + 'decks');
  }

  getAllRuns(): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs');
  }

  getDuelistRuns(): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs/THE_DUELIST');
  }

  getNonDuelistRuns(): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs/nonduelist');
  }

  getCharacters(): Observable<string[]> {
    return this.http.get<string[]>(this.API + 'allCharacters');
  }

  getCharacterRuns(char: string): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs/' + char);
  }

  getRunsByTime(timeStart: string, timeEnd: string): Observable<RunLog[]>  {
    return this.http.get<RunLog[]>(this.API + 'runs/time/' + timeStart + '/' + timeEnd);
  }

  getRunsByCountry(country: string): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs/country/' + country);
  }
}

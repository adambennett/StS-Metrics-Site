import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RunLog} from "../../models/RunLog";
import {TopService} from "../topservice/top.service";
import {DisplayDeck} from "../../models/DisplayDeck";
import {HttpParams} from '@angular/common/http';
import {RunDetails} from '../../models/RunDetails';

@Injectable({
  providedIn: 'root'
})
export class RunLogService extends TopService {

  getRunsByIds(id: number[]): Observable<RunLog[]> {
    let params = new HttpParams();
    params = params.append('', id.join(', '));
    const paramString = params.toString().substring(1);
    return this.http.get<RunLog[]>(this.API + 'runs-id/' + paramString);
  }

  getRunView(id: number): Observable<RunDetails> {
    return this.http.get<RunDetails>(this.API + 'run/' + id);
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
    return this.http.get<RunLog[]>(this.API + 'runs-nonduelist');
  }

  getCharacters(): Observable<string[]> {
    return this.http.get<string[]>(this.API + 'allCharacters');
  }

  getCharacterRuns(char: string): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs/' + char);
  }

  getRunsByTime(timeStart: string, timeEnd: string): Observable<RunLog[]>  {
    return this.http.get<RunLog[]>(this.API + 'runs-time/' + timeStart + '/' + timeEnd);
  }

  getRunsByCountry(country: string): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs-country/' + country);
  }

  getRunsByHost(host: string): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs-host/' + host);
  }
}

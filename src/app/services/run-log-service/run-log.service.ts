import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RunLog} from "../../models/RunLog";
import {TopService} from "../topservice/top.service";

@Injectable({
  providedIn: 'root'
})
export class RunLogService extends TopService {

  getDeckCompare(): Observable<any> {
    return this.http.get(this.API + 'decks');
  }

  getAllRuns(): Observable<any> {
    return this.http.get(this.API + 'runs');
  }

  getDuelistRuns(): Observable<any> {
    return this.http.get(this.API + 'runs/THE_DUELIST');
  }

  getNonDuelistRuns(): Observable<any> {
    return this.http.get(this.API + 'runs/nonduelist');
  }

  getCharacters(): Observable<any> {
    return this.http.get(this.API + 'allCharacters');
  }

  getCharacterRuns(char: string): Observable<RunLog[]> {
    return this.http.get<RunLog[]>(this.API + 'runs/' + char);
  }

  getRunView(id: number): Observable<any> {
    return this.http.get(this.API + 'run/' + id);
  }

  getRunsByTime(timeStart: string, timeEnd: string): Observable<any>  {
    return this.http.get(this.API + 'runs/time' + timeStart + '/' + timeEnd);
  }

}

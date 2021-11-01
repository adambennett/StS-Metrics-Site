import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TopService} from "../topservice/top.service";
import {DisplayDeck} from "../../models/DisplayDeck";
import {RunDetails} from '../../models/runDetails/RunDetails';
import {DeckPopularity} from '../../models/DeckPopularity';

@Injectable({
  providedIn: 'root'
})
export class RunLogService extends TopService {

  getRunView(id: number): Observable<RunDetails> {
    return this.http.get<RunDetails>(this.API + 'run/' + id);
  }

  getDeckCompare(): Observable<DisplayDeck[]> {
    return this.http.get<DisplayDeck[]>(this.API + 'decks');
  }

  getCharacters(): Observable<string[]> {
    return this.http.get<string[]>(this.API + 'allCharacters');
  }

  getDeckPopularity(): Observable<DeckPopularity[]> {
    return this.http.get<DeckPopularity[]>(this.API + 'deckPopularity');
  }
}

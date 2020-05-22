import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TopService {

  public API = 'https://sts-duelist-metrics.herokuapp.com/';
  //public API = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getDeckCompare(): Observable<any> {
    return this.http.get(this.API + 'decks');
  }

  getCards(): Observable<any> {
    return this.http.get(this.API + 'cards');
  }

  getRelics(): Observable<any> {
    return this.http.get(this.API + 'relics');
  }

  getPotions(): Observable<any> {
    return this.http.get(this.API + 'potions');
  }

  getNeows(): Observable<any> {
    return this.http.get(this.API + 'neow');
  }

  getCardsFromDeck(deck: string): Observable<any> {
    return this.http.get(this.API + 'cards/' + deck);
  }

  getRelicsFromDeck(deck: string): Observable<any> {
    return this.http.get(this.API + 'relics/' + deck);
  }

  getPotionsFromDeck(deck: string): Observable<any> {
    return this.http.get(this.API + 'potions/' + deck);
  }

  getNeowsFromDeck(deck: string): Observable<any> {
    return this.http.get(this.API + 'neow/' + deck);
  }

  getDuelistRuns(): Observable<any> {
    return this.http.get(this.API + 'runs/THE_DUELIST');
  }
}

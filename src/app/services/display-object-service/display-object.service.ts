import { Injectable } from '@angular/core';
import {TopService} from "../topservice/top.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DisplayObjectService extends TopService {

  getRelics(): Observable<any> {
    return this.http.get(this.API + 'relics');
  }

  getRelicsFromDeck(deck: string): Observable<any> {
    return this.http.get(this.API + 'relics/' + deck);
  }

  getPotions(): Observable<any> {
    return this.http.get(this.API + 'potions');
  }

  getPotionsFromDeck(deck: string): Observable<any> {
    return this.http.get(this.API + 'potions/' + deck);
  }

  getNeows(): Observable<any> {
    return this.http.get(this.API + 'neow');
  }

  getNeowsFromDeck(deck: string): Observable<any> {
    return this.http.get(this.API + 'neow/' + deck);
  }

}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TopService} from "../topservice/top.service";
import {DisplayCard} from "../../models/DisplayCard";

@Injectable({
  providedIn: 'root'
})
export class CardService extends TopService {

  getCardsFromMod(mod: string): Observable<DisplayCard[]> {
    return this.http.get<DisplayCard[]>(this.API + 'mods/cards/' + mod);
  }

  getCards(): Observable<DisplayCard[]> {
    return this.http.get<DisplayCard[]>(this.API + 'cards');
  }

  getCardsFromDeck(deck: string): Observable<DisplayCard[]> {
    return this.http.get<DisplayCard[]>(this.API + 'cards/' + deck);
  }

}

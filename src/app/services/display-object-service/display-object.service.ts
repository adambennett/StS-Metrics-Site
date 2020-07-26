import { Injectable } from '@angular/core';
import {TopService} from "../topservice/top.service";
import {Observable} from "rxjs";
import {DisplayObject} from "../../models/DisplayObject";

@Injectable({
  providedIn: 'root'
})
export class DisplayObjectService extends TopService {

  getRelicsFromMod(modId: string): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'mods/relics/' + modId);
  }

  getPotionsFromMod(modId: string): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'mods/potions/' + modId);
  }

  getNeowsFromMod(modId: string): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'mods/neow/' + modId);
  }

  getRelics(): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'relics');
  }

  getRelicsFromDeck(deck: string): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'relics/' + deck);
  }

  getPotions(): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'potions');
  }

  getPotionsFromDeck(deck: string): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'potions/' + deck);
  }

  getNeows(): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'neow');
  }

  getNeowsFromDeck(deck: string): Observable<DisplayObject[]> {
    return this.http.get<DisplayObject[]>(this.API + 'neow/' + deck);
  }
}

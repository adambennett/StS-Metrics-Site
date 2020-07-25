import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TopService} from "../topservice/top.service";
import {DisplayCard} from "../../models/DisplayCard";

@Injectable({
  providedIn: 'root'
})
export class CardService extends TopService {

  getCards(): Observable<any> {
    return this.http.get(this.API + 'cards');
  }

  getCardsFromDeck(deck: string): Observable<DisplayCard[]> {
    return this.http.get<DisplayCard[]>(this.API + 'cards/' + deck);
  }

}

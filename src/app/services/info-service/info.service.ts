import {Injectable} from '@angular/core';
import {TopService} from '../topservice/top.service';
import {Observable} from 'rxjs';
import {ModInfoBundle} from '../../models/ModInfoBundle';
import {LookupCard} from '../../models/LookupCard';

@Injectable({
  providedIn: 'root'
})
export class InfoService extends TopService {

  getAllMods(): Observable<ModInfoBundle[]> {
    return this.http.get<ModInfoBundle[]>(this.API + 'modlist');
  }

  lookupCard(card: string): Observable<LookupCard> {
    return this.http.get<LookupCard>(this.API + 'cardLookup/' + card);
  }

}

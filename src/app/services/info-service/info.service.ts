import { Injectable } from '@angular/core';
import {TopService} from "../topservice/top.service";
import {Observable} from "rxjs";
import {ModInfoBundle} from "../../models/ModInfoBundle";

@Injectable({
  providedIn: 'root'
})
export class InfoService extends TopService {

  getAllMods(): Observable<ModInfoBundle[]> {
    const out = this.http.get<ModInfoBundle[]>(this.API + 'modlist');
    return out;
  }

}

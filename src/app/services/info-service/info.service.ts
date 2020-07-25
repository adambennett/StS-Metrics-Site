import { Injectable } from '@angular/core';
import {TopService} from "../topservice/top.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoService extends TopService {

  getTrackedVersions(): Observable<any> {
    return this.http.get(this.API + 'allModuleVersions');
  }

}

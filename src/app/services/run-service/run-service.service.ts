import { Injectable } from '@angular/core';
import {TopService} from '../topservice/top.service';
import {Observable} from 'rxjs';
import {RunLog} from '../../models/RunLog';
import {DefaultSortCriteria} from '../../models/RunsDataSource';
import {DateFormatter} from '../../utils/DateFormatter';

@Injectable({
  providedIn: 'root'
})
export class RunServiceService extends TopService {

  countRuns(params: any): Observable<number> {
    if (params.type === 'Time') {
      const timeStamp = DateFormatter.getTimestamp(params.secondType);
      const secondType = `${timeStamp.start}~~${timeStamp.end}`;
      params = {
        type: params.type,
        secondType,
        hofType: params.hofType
      }
    }
    return this.http.post<number>(this.API + 'count-runs', params);
  }

  getAllRuns(options: DefaultSortCriteria): Observable<RunLog[]> {
    return this.http.post<RunLog[]>(this.API + 'runs', options);
  }
}

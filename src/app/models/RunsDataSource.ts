import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {RunLog} from './RunLog';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {RunServiceService} from '../services/run-service/run-service.service';
import {catchError, finalize} from 'rxjs/operators';

export interface DefaultSortCriteria {
  filter: RunFilter,
  pageNumber: string,
  pageSize: string
}

export interface RunFilter {
  ids: number[],
  host: string,
  character: string,
  timeStart: string,
  timeEnd: string,
  country: string,
  isNonDuelist: boolean
}

export class RunsDataSource implements DataSource<RunLog> {

  private runsSubject = new BehaviorSubject<RunLog[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private runService: RunServiceService) {}

  public options: DefaultSortCriteria = {
    filter: {
      ids: [],
      host: '',
      character: '',
      timeStart: '',
      timeEnd: '',
      country: '',
      isNonDuelist: false
    },
    pageNumber: '0',
    pageSize: '5'
  }

  connect(collectionViewer: CollectionViewer): Observable<RunLog[]> {
    return this.runsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.runsSubject.complete();
    this.loadingSubject.complete();
  }

  getAllRuns(options = this.options) {
    this.loadingSubject.next(true);
    this.runService
      .getAllRuns(options)
      .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(false)))
      .subscribe(runs => this.runsSubject.next(runs));
  }

  getRunsByIds(ids: number[], options = this.options) {
    options.filter.ids = ids;
    this.getAllRuns(options);
  }

  getDuelistRuns(options = this.options) {
    options.filter.character = 'THE_DUELIST';
    this.getAllRuns(options);
  }

  getNonDuelistRuns(options = this.options) {
    options.filter.isNonDuelist = true;
    this.getAllRuns(options);
  }

  getCharacterRuns(character: string, options = this.options) {
    options.filter.character = character;
    this.getAllRuns(options);
  }

  getRunsByTime(timeStart: string, timeEnd: string, options = this.options) {
    options.filter.timeStart = timeStart;
    options.filter.timeEnd = timeEnd;
    this.getAllRuns(options);
  }

  getRunsByCountry(country: string, options = this.options) {
    options.filter.country = country;
    this.getAllRuns(options);
  }

  getRunsByHost(host: string, options = this.options) {
    options.filter.host = host;
    this.getAllRuns(options);
  }
}

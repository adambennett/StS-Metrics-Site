import { Injectable } from '@angular/core';
import {ModInfoBundle} from '../models/ModInfoBundle';
import {DeckPopularity} from '../models/DeckPopularity';
import {RunLogService} from './run-log-service/run-log.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public refreshGraphData: any;
  public mod: ModInfoBundle;
  private graphData: DeckPopularity[];


  constructor(private runService: RunLogService) { }

  public setGraphData(data: DeckPopularity[]): void {
    this.graphData = data;
  }

  public getGraphData(): DeckPopularity[] { return this.graphData; }
}

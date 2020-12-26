import {Event} from './Event';

export interface TombSpentPoints {
  tomb_event_id: number;
  tomb: Event;
  magic: number;
  greed: number;
  war: number;
  power: number;
  hunger: number;
}

import {SimpleCard} from './SimpleCard';

export interface DetailsCard {
  floor: number;
  cardId: string;
  cardName: string;
  not_picked: SimpleCard[];
}

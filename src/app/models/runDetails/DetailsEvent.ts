import {TombSpentPoints} from '../TombSpentPoints';
import {SimpleCard} from './SimpleCard';

export interface DetailsEvent {
  event_id: number;
  damage_healed: number;
  gold_gain: number;
  damage_taken: number;
  max_hp_gain: number;
  max_hp_loss: number;
  floor: number;
  gold_loss: number;
  event_name: string;
  player_choice: string;
  duelist: boolean;
  cards_obtained: SimpleCard[];
  relics_obtained: SimpleCard[];
  spent_points: TombSpentPoints;
  magic_reward: number;
  greed_reward: number;
  war_reward: number;
  power_reward: number;
  hunger_reward: number;
  totalMagicScore: number;
  points: number;
}

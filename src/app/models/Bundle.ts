import { TopBundle } from "./TopBundle";
import { MiniMod } from "./MiniMod";
import { BossRelic } from "./BossRelic";
import { Event } from "./Event";
import { SpireCard } from "./SpireCard";
import { Potion } from "./Potion";
import { Relic } from "./Relic";
import { CampfireChoice } from "./CampfireChoice";
import { DamageInfo } from "./DamageInfo";

export interface Bundle {

  top_id: number;

  top: TopBundle;

  build_version: string;
  character_chosen: string;
  duelistmod_version: string;
  killed_by: string;
  local_time: string;
  neow_bonus: string;
  neow_cost: string;
  play_id: string;
  pool_fill: string;
  seed_played: string;
  starting_deck: string;
  country: string;
  lang: string;

  add_base_game_cards: boolean;
  allow_boosters: boolean;
  always_boosters: boolean;
  bonus_puzzle_summons: boolean;
  challenge_mode: boolean;
  chose_seed: boolean;
  customized_card_pool: boolean;
  duelist_curses: boolean;
  encounter_duelist_enemies: boolean;
  is_ascension_mode: boolean;
  is_beta: boolean;
  is_daily: boolean;
  is_endless: boolean;
  is_prod: boolean;
  is_trial: boolean;
  playing_as_kaiba: boolean;
  reduced_basic: boolean;
  remove_card_rewards: boolean;
  remove_creator: boolean;
  remove_exodia: boolean;
  remove_ojama: boolean;
  remove_toons: boolean;
  unlock_all_decks: boolean;
  victory: boolean;

  ascension_level: number;
  campfire_rested: number;
  campfire_upgraded: number;
  challenge_level: number;
  circlet_count: number;
  floor_reached: number;
  gold: number;
  highest_max_summons: number;
  number_of_monsters: number;
  number_of_resummons: number;
  number_of_spells: number;
  number_of_traps: number;
  playtime: number;
  purchased_purges: number;
  score: number;
  total_synergy_tributes: number;
  win_rate: number;
  player_experience: number;
  seed_source_timestamp: number;
  timestamp: number;

  current_hp_per_floor: number[];
  gold_per_floor: number[];
  item_purchase_floors: number[];
  items_purged_floors: number[];
  max_hp_per_floor: number[];
  potions_floor_spawned: number[];
  potions_floor_usage: number[];

  items_purchased: string[];
  items_purged: string[];
  master_deck: string[];
  path_per_floor: string[];
  path_taken: string[];
  relics: string[];

  modList: MiniMod[];
  boss_relics: BossRelic[];
  event_choices: Event[];
  card_choices: SpireCard[];
  potions_obtained: Potion[];
  relics_obtained: Relic[];
  campfire_choices: CampfireChoice[];
  damage_taken: DamageInfo[];
}

export interface LookupCard {
  card_id: string;
  name: string;
  color: string;
  rarity: string;
  type: string;
  duelistType: string;
  cost: string;
  text: string;
  block: number;
  damage: number;
  magicNumber: number;
  secondMag: number;
  thirdMag: number;
  tributes: number;
  summons: number;
  entomb: number;
  duelistCard: boolean;
  pools: string[];
}
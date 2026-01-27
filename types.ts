export interface Tweet {
  id: string;
  author: string;
  handle: string;
  title?: string; // New: Unique title for each journey log
  content: string;
  image?: string; 
  likes: number;
  retweets: number;
  timestamp: string;
  type: 'event' | 'flavor' | 'user';
  rank?: 'C' | 'B' | 'A' | 'S';
}

export interface StreamComment {
  id: string;
  user: string;
  content: string;
  color: string;
  isDonation?: boolean;
  amount?: number;
}

export interface GameState {
  materials: number;
  followers: number;
  money: number;
  location: string;       
  locationIndex: number;  
  timeInLocation: number; 
  isStreaming: boolean;
  energy: number;
  totalHours: number;     
  weather: string;        
}

export interface CharacterAttributes {
  strength: number;
  intelligence: number;
  willpower: number;
  agility: number;
  speed: number;
  endurance: number;
  personality: number;
  luck: number;
}

export type AttributeKey = keyof CharacterAttributes;

// Career growth rates (probability of gaining 1-2 points per level)
export interface CareerGrowthRates {
  strength: number;      // 0-100, percentage chance to grow
  intelligence: number;
  willpower: number;
  agility: number;
  speed: number;
  endurance: number;
  personality: number;
  luck: number;
}

// Career with level system
export interface CareerData {
  id: string;
  name: { en: string; zh: string };
  attributes: CharacterAttributes;
  growthRates: CareerGrowthRates;
  primaryStats: AttributeKey[];  // Stats that always grow on level up
}

// Character progression state
export interface CharacterProgression {
  level: number;
  experience: number;
  careerId: string;
}

// Career save data (per career)
export interface CareerSaveData {
  level: number;
  experience: number;
  attributes: CharacterAttributes;
}

export type EventCategory =
  | 'combat'
  | 'scenery'
  | 'food'
  | 'mishap'
  | 'companion'
  | 'rest'
  | 'rare'
  | 'fashion'
  | 'festival'
  | 'work';

export interface EventCheckStat {
  primary: AttributeKey;
  secondary?: AttributeKey;
  mode: 'or' | 'and';
  threshold: number;
}

export interface EventOutcome {
  title: { en: string; zh: string };
  contents: { en: string; zh: string }[];
  tags: string[];
  materials: number;
}

export interface GameEvent {
  id: string;
  category: EventCategory;
  name: { en: string; zh: string };
  check: EventCheckStat;
  success: EventOutcome;
  failure: EventOutcome;
  rarity: 'common' | 'uncommon' | 'rare';
}

export enum AppView {
  EXPLORER = 'EXPLORER',
  STREAMING = 'STREAMING',
  DESKTOP = 'DESKTOP'
}
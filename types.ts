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

export enum AppView {
  EXPLORER = 'EXPLORER',
  STREAMING = 'STREAMING',
  DESKTOP = 'DESKTOP'
}
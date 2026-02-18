
export enum AppState {
  LOCKED = 'LOCKED',
  ONBOARDING = 'ONBOARDING',
  MAP = 'MAP',
  PARALLEL_UNIVERSE = 'PARALLEL_UNIVERSE',
  EXPIRED = 'EXPIRED'
}

export enum Intent {
  FLIRT = 'Flirt',
  CONNECTION = 'Emotional Connection',
  EXPERIENCE = 'Shared Experience',
  FRIENDSHIP = 'Friendship'
}

export enum Mood {
  ROMANTIC = 'Romantic',
  SPONTANEOUS = 'Spontaneous',
  INTROSPECTIVE = 'Introspective',
  BOLD = 'Bold'
}

export interface UserProfile {
  id: string;
  auraColor: string;
  symbol: string;
  intent: Intent;
  mood: Mood;
}

export interface NearbySoul {
  id: string;
  auraColor: string;
  symbol: string;
  distance: number; // Simulated meters
  affinity: number; // 0-100
  bearing: number; // degrees
}

export interface OraclePrompt {
  phrase: string;
}

export interface Ritual {
  title: string;
  instructions: string;
}

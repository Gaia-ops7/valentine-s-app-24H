
import React from 'react';
import { 
  Heart, 
  Moon, 
  Sun, 
  Star, 
  Cloud, 
  Anchor, 
  Compass, 
  Zap, 
  Wind, 
  Droplets 
} from 'lucide-react';

export const AURA_COLORS = [
  '#FF3366', // Rose
  '#00F5FF', // Cyan
  '#FFD700', // Gold
  '#BF00FF', // Electric Purple
  '#00FF7F', // Spring Green
  '#FF4500'  // Orange Red
];

export const SYMBOLS = [
  { id: 'heart', icon: <Heart size={24} /> },
  { id: 'moon', icon: <Moon size={24} /> },
  { id: 'sun', icon: <Sun size={24} /> },
  { id: 'star', icon: <Star size={24} /> },
  { id: 'zap', icon: <Zap size={24} /> },
  { id: 'anchor', icon: <Anchor size={24} /> },
  { id: 'compass', icon: <Compass size={24} /> },
  { id: 'wind', icon: <Wind size={24} /> },
  { id: 'droplet', icon: <Droplets size={24} /> }
];

export const INTENTS = [
  'Flirt',
  'Emotional Connection',
  'Shared Experience',
  'Friendship'
];

export const MOODS = [
  'Romantic',
  'Spontaneous',
  'Introspective',
  'Bold'
];

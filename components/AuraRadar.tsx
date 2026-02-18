
import React, { useEffect, useState } from 'react';
import { NearbySoul, UserProfile } from '../types';
import { SYMBOLS } from '../constants';

interface AuraRadarProps {
  user: UserProfile;
  souls: NearbySoul[];
  onSelectSoul: (soul: NearbySoul) => void;
}

const AuraRadar: React.FC<AuraRadarProps> = ({ user, souls, onSelectSoul }) => {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
      {/* Background Rings */}
      <div className="absolute w-[90%] h-[90%] border border-white/10 rounded-full" />
      <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full" />
      <div className="absolute w-[30%] h-[30%] border border-white/5 rounded-full" />
      
      {/* User Center */}
      <div className="relative z-10">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] bg-white/10 backdrop-blur-md"
          style={{ border: `2px solid ${user.auraColor}` }}
        >
          {SYMBOLS.find(s => s.id === user.symbol)?.icon}
        </div>
        <div 
          className="absolute inset-0 aura-glow animate-pulse-slow rounded-full"
          style={{ backgroundColor: user.auraColor }}
        />
      </div>

      {/* Nearby Souls */}
      {souls.map((soul) => {
        const angle = (soul.bearing * Math.PI) / 180;
        const radius = Math.min(soul.distance * 2, 45); // Scale for UI
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <button
            key={soul.id}
            onClick={() => onSelectSoul(soul)}
            className="absolute transition-all duration-1000 ease-out z-20"
            style={{
              transform: `translate(${x}vw, ${y}vw)`
            }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm relative"
              style={{ 
                border: `1.5px solid ${soul.auraColor}`,
                boxShadow: `0 0 ${10 + (soul.affinity / 5)}px ${soul.auraColor}66`
              }}
            >
              <div className="text-white/80 scale-75">
                {SYMBOLS.find(s => s.id === soul.symbol)?.icon}
              </div>
              <div 
                className="absolute inset-0 blur-md opacity-40 rounded-full"
                style={{ backgroundColor: soul.auraColor }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AuraRadar;

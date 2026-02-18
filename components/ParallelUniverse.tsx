
import React, { useState, useEffect } from 'react';
import { Ritual } from '../types';
import { generateRitual } from '../services/geminiService';
import { Timer, X } from 'lucide-react';

interface ParallelUniverseProps {
  onClose: () => void;
}

const ParallelUniverse: React.FC<ParallelUniverseProps> = ({ onClose }) => {
  const [ritual, setRitual] = useState<Ritual | null>(null);
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const r = await generateRitual();
      setRitual(r);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin mb-6" />
        <p className="text-lg font-light tracking-widest uppercase opacity-60">Entering Parallel Universe...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-between p-10 text-center animate-in fade-in duration-1000">
      <div className="mt-20">
        <div className="text-6xl font-mono mb-4 text-white/90 tabular-nums">
          {formatTime(timeLeft)}
        </div>
        <div className="text-xs uppercase tracking-[0.4em] text-white/40 flex items-center justify-center gap-2">
          <Timer size={14} />
          Time Remaining
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-xs mx-auto">
        <h2 className="text-2xl font-light mb-6 text-white tracking-wide">
          {ritual?.title}
        </h2>
        <p className="text-lg leading-relaxed text-white/70 font-light italic">
          "{ritual?.instructions}"
        </p>
      </div>

      <div className="mb-12 w-full">
        <button 
          onClick={onClose}
          className="w-full py-4 border border-white/10 rounded-full text-white/40 hover:text-white transition-colors"
        >
          Dissolve Connection
        </button>
        <p className="mt-6 text-[10px] uppercase tracking-widest text-white/20">
          No records will remain.
        </p>
      </div>
    </div>
  );
};

export default ParallelUniverse;

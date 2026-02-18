
import React, { useState, useEffect, useCallback } from 'react';
import { 
  AppState, 
  UserProfile, 
  NearbySoul, 
  Intent, 
  Mood, 
  OraclePrompt 
} from './types';
import { AURA_COLORS, SYMBOLS, INTENTS, MOODS } from './constants';
import AuraRadar from './components/AuraRadar';
import ParallelUniverse from './components/ParallelUniverse';
import { generateOraclePrompt } from './services/geminiService';
import { 
  Sparkles, 
  MapPin, 
  Activity, 
  User as UserIcon,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'me',
    auraColor: AURA_COLORS[0],
    symbol: SYMBOLS[0].id,
    intent: Intent.CONNECTION,
    mood: Mood.SPONTANEOUS
  });
  const [nearbySouls, setNearbySouls] = useState<NearbySoul[]>([]);
  const [selectedSoul, setSelectedSoul] = useState<NearbySoul | null>(null);
  const [oracle, setOracle] = useState<OraclePrompt | null>(null);
  const [countdown, setCountdown] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  // Check if app is active (Feb 13-15)
  useEffect(() => {
    const checkActivation = () => {
      const now = new Date();
      const feb13 = new Date(now.getFullYear(), 1, 13, 0, 0, 0);
      const feb15 = new Date(now.getFullYear(), 1, 15, 23, 59, 59);
      
      // For demo purposes, we allow use if it's currently February or if a flag is set
      // Real implementation would be strict: if (now < feb13 || now > feb15) setAppState(AppState.LOCKED);
    };
    checkActivation();

    const timer = setInterval(() => {
      const now = new Date();
      const feb15 = new Date(now.getFullYear(), 1, 15, 23, 59, 59);
      const diff = feb15.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown('00:00:00');
        setAppState(AppState.EXPIRED);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const simulateNearbySouls = useCallback(() => {
    setIsSearching(true);
    setTimeout(() => {
      const souls: NearbySoul[] = Array.from({ length: 4 }).map((_, i) => ({
        id: `soul-${i}`,
        auraColor: AURA_COLORS[Math.floor(Math.random() * AURA_COLORS.length)],
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)].id,
        distance: Math.random() * 20 + 2,
        affinity: Math.floor(Math.random() * 100),
        bearing: Math.random() * 360
      }));
      setNearbySouls(souls);
      setIsSearching(false);
    }, 2000);
  }, []);

  const handleConnect = async (soul: NearbySoul) => {
    setSelectedSoul(soul);
    const prompt = await generateOraclePrompt();
    setOracle(prompt);
  };

  const startParallelUniverse = () => {
    setAppState(AppState.PARALLEL_UNIVERSE);
  };

  const renderOnboarding = () => (
    <div className="flex flex-col h-full bg-[#050505] p-8 pb-12 overflow-y-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-[0.3em] uppercase text-white/90">24H</h1>
        <p className="text-xs uppercase tracking-widest text-white/30 mt-2">The Ephemeral Valentine</p>
      </header>

      <section className="space-y-12">
        <div>
          <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-6">Choose Your Aura</label>
          <div className="flex flex-wrap gap-4">
            {AURA_COLORS.map(color => (
              <button
                key={color}
                onClick={() => setUserProfile({ ...userProfile, auraColor: color })}
                className={`w-10 h-10 rounded-full transition-all duration-500 relative ${
                  userProfile.auraColor === color ? 'scale-125 border-2 border-white' : 'opacity-40'
                }`}
                style={{ backgroundColor: color }}
              >
                {userProfile.auraColor === color && (
                  <div className="absolute inset-0 blur-lg rounded-full" style={{ backgroundColor: color }} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-6">Your Personal Symbol</label>
          <div className="grid grid-cols-5 gap-4">
            {SYMBOLS.map(sym => (
              <button
                key={sym.id}
                onClick={() => setUserProfile({ ...userProfile, symbol: sym.id })}
                className={`w-full aspect-square flex items-center justify-center rounded-xl transition-all ${
                  userProfile.symbol === sym.id ? 'bg-white/10 text-white' : 'text-white/20 bg-white/5'
                }`}
              >
                {sym.icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-6">Current Intent</label>
          <div className="space-y-3">
            {INTENTS.map((intent) => (
              <button
                key={intent}
                onClick={() => setUserProfile({ ...userProfile, intent: intent as Intent })}
                className={`w-full py-4 px-6 rounded-full text-left text-sm transition-all border ${
                  userProfile.intent === intent ? 'border-white/20 bg-white/5 text-white' : 'border-transparent text-white/30'
                }`}
              >
                {intent}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-auto pt-12">
        <button
          onClick={() => {
            setAppState(AppState.MAP);
            simulateNearbySouls();
          }}
          className="w-full py-5 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 group hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Activate Presence
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
      {/* HUD Header */}
      <div className="absolute top-0 inset-x-0 p-6 z-30 flex justify-between items-start pointer-events-none">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">Expires In</div>
          <div className="text-xl font-mono text-white/80 tabular-nums">{countdown}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">Status</div>
          <div className="flex items-center gap-2 text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-light uppercase tracking-widest">Active</span>
          </div>
        </div>
      </div>

      {/* Main Map View */}
      <div className="flex-1 flex items-center justify-center relative">
        <AuraRadar 
          user={userProfile} 
          souls={nearbySouls} 
          onSelectSoul={handleConnect} 
        />
        
        {isSearching && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/60 backdrop-blur-sm z-40">
            <RefreshCw size={48} className="text-white/20 animate-spin mb-4" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Sensing Nearby Auras...</p>
          </div>
        )}
      </div>

      {/* Soul Details Overlay */}
      {selectedSoul && !oracle && (
        <div className="absolute inset-x-0 bottom-0 p-6 z-40 bg-gradient-to-t from-black via-black/90 to-transparent pt-20 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{ border: `2px solid ${selectedSoul.auraColor}` }}
              >
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: selectedSoul.auraColor }} />
                <div className="text-white z-10">
                  {SYMBOLS.find(s => s.id === selectedSoul.symbol)?.icon}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">Affinity Score</div>
                <div className="text-2xl font-light text-white tracking-widest">{selectedSoul.affinity}%</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin size={16} className="text-white/40" />
                <span className="text-sm font-light text-white/80 uppercase tracking-widest">
                  Proximity: ~{selectedSoul.distance.toFixed(1)}m
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Activity size={16} className="text-white/40" />
                <span className="text-sm font-light text-white/80 uppercase tracking-widest">
                  Synchronized Motion Detected
                </span>
              </div>
            </div>

            <button
              onClick={() => handleConnect(selectedSoul)}
              disabled={selectedSoul.distance > 5}
              className={`w-full py-5 rounded-full mt-10 font-semibold flex items-center justify-center gap-2 transition-all ${
                selectedSoul.distance <= 5 
                  ? 'bg-white text-black shadow-[0_0_20px_white]' 
                  : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
              }`}
            >
              {selectedSoul.distance <= 5 ? 'Connect Presence' : 'Move Closer to Unlock'}
            </button>
            
            <button 
              onClick={() => setSelectedSoul(null)}
              className="w-full py-4 text-[10px] uppercase tracking-widest text-white/20 hover:text-white/40"
            >
              Dissolve Preview
            </button>
          </div>
        </div>
      )}

      {/* Oracle Interaction Overlay */}
      {oracle && (
        <div className="absolute inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-700">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-12 relative animate-pulse-slow"
            style={{ 
              border: `2px solid ${selectedSoul?.auraColor}`,
              boxShadow: `0 0 40px ${selectedSoul?.auraColor}66`
            }}
          >
            <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{ backgroundColor: selectedSoul?.auraColor }} />
            <div className="text-white relative z-10">
              {SYMBOLS.find(s => s.id === selectedSoul?.symbol)?.icon}
            </div>
          </div>
          
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 italic">The Oracle Speaks</h3>
          
          <p className="text-2xl font-light leading-relaxed text-white/90 max-w-sm mb-12 font-serif italic">
            "{oracle.phrase}"
          </p>

          <div className="space-y-4 w-full max-w-xs">
            {selectedSoul && selectedSoul.affinity >= 75 && (
              <button
                onClick={startParallelUniverse}
                className="w-full py-4 rounded-full bg-white text-black font-semibold shadow-[0_0_30px_white] flex items-center justify-center gap-2"
              >
                Parallel Universe Mode
                <Sparkles size={16} />
              </button>
            )}
            <button
              onClick={() => {
                setOracle(null);
                setSelectedSoul(null);
              }}
              className="w-full py-4 rounded-full border border-white/10 text-white/60 hover:text-white transition-all"
            >
              Fade to Background
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-30 pointer-events-none">
        <div className="max-w-md mx-auto flex justify-between pointer-events-auto">
           <button 
            onClick={() => setAppState(AppState.ONBOARDING)}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
           >
             <UserIcon size={20} />
           </button>
           <button 
            onClick={simulateNearbySouls}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
           >
             <RefreshCw size={20} className={isSearching ? 'animate-spin' : ''} />
           </button>
           <button 
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
           >
             <Info size={20} />
           </button>
        </div>
      </div>
    </div>
  );

  const renderExpired = () => (
    <div className="flex flex-col items-center justify-center h-full bg-black p-12 text-center">
      <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-12">The Cycle Has Ended</div>
      <h2 className="text-3xl font-light text-white/80 leading-relaxed max-w-xs">
        "Some connections are meant to exist only once."
      </h2>
      <div className="mt-20 w-12 h-[1px] bg-white/10" />
      <p className="mt-20 text-[10px] uppercase tracking-widest text-white/20">
        All traces have been deleted.<br/>See you next year.
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 select-none overflow-hidden touch-none max-w-[500px] mx-auto shadow-2xl">
      {appState === AppState.ONBOARDING && renderOnboarding()}
      {appState === AppState.MAP && renderMap()}
      {appState === AppState.PARALLEL_UNIVERSE && (
        <ParallelUniverse onClose={() => setAppState(AppState.MAP)} />
      )}
      {appState === AppState.EXPIRED && renderExpired()}
    </div>
  );
};

export default App;

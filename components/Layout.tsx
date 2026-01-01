import React, { useState, useRef, useEffect } from 'react';
import { TRANSLATIONS, LOCATION_ASSETS, CHARACTER_ASSETS } from '../constants';
import { ThemeType } from '../App';

// --- Header ---
export const BlogHeader: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: 'en' | 'zh';
  setLang: (lang: 'en' | 'zh') => void;
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
}> = ({ activeTab, onTabChange, lang, setLang, theme, setTheme }) => {
  const t = TRANSLATIONS[lang];
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  
  const themes: {id: ThemeType, icon: string, labelEn: string, labelZh: string}[] = [
    { id: 'light', icon: 'fa-sun', labelEn: 'Meadow', labelZh: '林间' },
    { id: 'dark', icon: 'fa-moon', labelEn: 'Midnight', labelZh: '深夜' },
    { id: 'deep-green', icon: 'fa-leaf', labelEn: 'Deep Forest', labelZh: '深林' },
    { id: 'pink', icon: 'fa-heart', labelEn: 'Sakura', labelZh: '樱粉' },
    { id: 'blue', icon: 'fa-water', labelEn: 'Ocean', labelZh: '海蓝' },
    { id: 'mono', icon: 'fa-ghost', labelEn: 'Ink', labelZh: '水墨' }
  ];

  const currentTheme = themes.find(th => th.id === theme) || themes[0];

  useEffect(() => {
    const handleClickOutside = () => {
      setLangOpen(false);
      setThemeOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-10 p-4 rounded-[var(--radius-md)] wobbly-box bg-card-context gap-6 relative z-[60]">
      <div className="font-title text-3xl flex items-center gap-2 text-[var(--text-title)]">
        <i className="fas fa-tree text-[var(--accent-pop)]"></i>
        {t.gameTitle}
      </div>
      
      <nav className="flex flex-wrap justify-center gap-2">
        {[t.home, t.travel, t.guide, t.food].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              nav-btn px-6 py-2 rounded-full font-bold text-lg
              ${activeTab === tab 
                ? 'active text-[var(--text-title)]' 
                : 'text-[var(--text-main)] hover:text-[var(--text-title)]'}
            `}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-title)] font-bold wobbly-box hover:bg-[var(--accent-color)]/20 transition-all cursor-pointer"
            >
                <i className="fas fa-globe-asia text-[var(--accent-color)]"></i>
                <span className="uppercase">{lang}</span>
                <i className={`fas fa-chevron-down text-[10px] transition-transform ${langOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {langOpen && (
                <div className="absolute top-full right-0 mt-3 w-32 bg-white rounded-[var(--radius-md)] border-2 border-[var(--border-color)] overflow-hidden z-[100] wobbly-box shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <button onClick={() => { setLang('en'); setLangOpen(false); }} className={`w-full text-left px-4 py-2 hover:bg-[var(--accent-color)]/10 font-bold transition-colors cursor-pointer ${lang === 'en' ? 'text-[var(--accent-pop)]' : 'text-[var(--text-main)]'}`}>English</button>
                    <button onClick={() => { setLang('zh'); setLangOpen(false); }} className={`w-full text-left px-4 py-2 hover:bg-[var(--accent-color)]/10 font-bold transition-colors border-t border-[var(--border-color)]/10 cursor-pointer ${lang === 'zh' ? 'text-[var(--accent-pop)]' : 'text-[var(--text-main)]'}`}>中文</button>
                </div>
            )}
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-title)] font-bold wobbly-box hover:bg-[var(--accent-color)]/20 transition-all cursor-pointer"
            >
                <i className={`fas ${currentTheme.icon} text-[var(--accent-pop)]`}></i>
                <span className="hidden sm:inline">{lang === 'zh' ? currentTheme.labelZh : currentTheme.labelEn}</span>
                <i className={`fas fa-chevron-down text-[10px] transition-transform ${themeOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {themeOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-[var(--radius-md)] border-2 border-[var(--border-color)] overflow-hidden z-[100] wobbly-box shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {themes.map((th) => (
                        <button 
                            key={th.id}
                            onClick={() => { setTheme(th.id); setThemeOpen(false); }}
                            className={`w-full text-left px-4 py-3 hover:bg-[var(--accent-color)]/10 font-bold flex items-center gap-3 transition-colors border-b border-[var(--border-color)]/5 last:border-b-0 cursor-pointer ${theme === th.id ? 'bg-[var(--accent-color)]/5 text-[var(--accent-pop)]' : 'text-[var(--text-main)]'}`}
                        >
                            <i className={`fas ${th.icon} w-5 text-center opacity-70`}></i>
                            <span>{lang === 'zh' ? th.labelZh : th.labelEn}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

// --- Hero Section ---
export const BlogHero: React.FC<{
  currentLocation: string;
  locationIndex: number;
  progress: number;
  energy: number;
  materials: number;
  gameTime: string;
  weather: string;
  lang: 'en' | 'zh';
  thought?: string;
}> = ({ currentLocation, locationIndex, progress, energy, materials, gameTime, weather, lang, thought }) => {
  const t = TRANSLATIONS[lang];
  
  // Choose sprite based on location index
  const characterIdx = locationIndex % CHARACTER_ASSETS.length;
  const spriteUrl = CHARACTER_ASSETS[characterIdx];
  const bgUrl = LOCATION_ASSETS[locationIndex % LOCATION_ASSETS.length];

  return (
    <section className="mb-16 min-h-[500px] relative z-10">
      
      {/* Main Adventure Frame */}
      <div className="wobbly-box bg-card-context h-[560px] rounded-[var(--radius-lg)] z-10 flex flex-col relative overflow-hidden group">
          
          {/* Animated Panning Background */}
          <div 
            className="absolute inset-0 animate-panning bg-repeat-x"
            style={{ 
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'auto 100%',
                opacity: 0.9
            }}
          />

          {/* Character Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="relative animate-walking">
                  {/* Shadow */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/20 blur-xl rounded-full"></div>
                  {/* Sprite */}
                  <img 
                    src={spriteUrl} 
                    alt="Hero" 
                    className="h-[320px] drop-shadow-2xl object-contain select-none pointer-events-none"
                  />
                  
                  {/* Localized Thought Bubble */}
                  {thought && (
                    <div className="absolute -top-24 -right-16 md:-right-24 min-w-[120px] max-w-[180px] p-3 px-4 bg-white rounded-2xl border-2 border-[var(--border-color)] animate-bounce shadow-lg wobbly-box z-30">
                        <p className="text-xs md:text-sm font-bold text-[var(--text-main)] text-center leading-tight">
                            {thought}
                        </p>
                        {/* Little tail for bubble */}
                        <div className="absolute -bottom-2 left-1/4 w-4 h-4 bg-white border-r-2 border-b-2 border-[var(--border-color)] rotate-45"></div>
                    </div>
                  )}
              </div>
          </div>

          {/* Progress Overlay (Footer of frame) */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pt-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex flex-col gap-4 z-30">
              
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-white drop-shadow-md">
                 <div className="flex-1 w-full text-center md:text-left">
                     <div className="inline-block bg-[var(--accent-pop)] text-white px-3 py-1 rounded-full text-xs font-title mb-2 wobbly-box border border-white uppercase">
                         {t.exploring}
                     </div>
                     <h2 className="font-title text-3xl md:text-4xl leading-tight mb-2">{currentLocation}</h2>
                     <div className="flex gap-4 font-bold text-sm opacity-90 justify-center md:justify-start">
                         <span><i className="far fa-clock mr-2"></i>{gameTime}</span>
                         <span><i className="fas fa-leaf mr-2"></i>{weather}</span>
                     </div>
                 </div>
                 
                 <div className="flex items-center gap-6 md:gap-8 bg-white/10 backdrop-blur-md p-3 px-6 rounded-2xl border border-white/20 wobbly-box">
                     <div className="flex flex-col items-center">
                         <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">
                             <i className="fas fa-bolt-lightning text-yellow-400"></i>
                             <span>{t.energy}</span>
                         </div>
                         <div className="font-title text-3xl leading-none text-white">
                            {energy}<span className="text-xs ml-0.5">%</span>
                         </div>
                     </div>

                     <div className="flex flex-col items-center border-l border-white/20 pl-6">
                         <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">
                             <i className="fas fa-comment-dots text-blue-300"></i>
                             <span>{t.items}</span>
                         </div>
                         <div className="font-title text-3xl leading-none text-white">
                            {materials}
                         </div>
                     </div>
                 </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-white/20 border-2 border-white/40 rounded-full relative wobbly-box overflow-hidden">
                   <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-pop)] rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                   />
              </div>
          </div>
      </div>

    </section>
  );
};

// --- Post Card ---
export const BlogCard: React.FC<{
  title: string;
  content: string;
  image?: string;
  tags: string[];
  author: string;
  timestamp: string;
}> = ({ title, content, image, tags, author, timestamp }) => {
  return (
    <article className="wobbly-box bg-card-context p-5 rounded-[var(--radius-md)] flex flex-col hover:-translate-y-2 transition-all h-full group">
      <div className="relative h-52 mb-5 rounded-[12px] wobbly-box overflow-hidden z-10">
         {tags.length > 0 && (
             <span className="absolute top-2 right-2 bg-[var(--accent-color)] text-white text-[10px] px-3 py-1 rounded-full font-title font-bold border-2 border-[var(--border-color)] z-20 wobbly-box">
                {tags[0]}
             </span>
         )}
         <img 
            src={image || "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
         />
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-title text-xl text-[var(--text-title)] mb-3 leading-snug group-hover:text-[var(--accent-pop)] transition-colors">
            {title}
        </h3>
        <p className="text-[var(--text-main)] text-sm mb-4 line-clamp-3 leading-relaxed opacity-80 font-body">
            {content}
        </p>
        <div className="mt-auto pt-4 border-t-2 border-dashed border-[var(--border-color)]/20 flex justify-between text-xs font-bold text-[var(--text-main)] opacity-60">
            <span><i className="far fa-calendar-alt mr-2"></i>{timestamp}</span>
            <span className="flex gap-2">
                <i className="far fa-heart hover:text-red-500 cursor-pointer"></i>
                <i className="far fa-share-square hover:text-blue-500 cursor-pointer"></i>
            </span>
        </div>
      </div>
    </article>
  );
};

// --- Streaming Window (Modal) ---
export const StreamModal: React.FC<{
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-color)]/70 backdrop-blur-md p-4">
        <div className="wobbly-box bg-card-context w-full max-w-5xl h-[88vh] rounded-[var(--radius-lg)] flex flex-col overflow-hidden animate-in zoom-in duration-300">
            <div className="flex justify-between items-center p-5 border-b-2 border-[var(--border-color)] bg-[var(--accent-color)]/10">
                <div className="flex items-center gap-3 font-title text-2xl text-[var(--text-title)]">
                    <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-[var(--border-color)] animate-pulse shadow-[0_0_10px_orange]"></div>
                    <span>{title}</span>
                </div>
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center text-xl border-2 border-[var(--border-color)] wobbly-box">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
                {children}
            </div>
        </div>
    </div>
  );
};
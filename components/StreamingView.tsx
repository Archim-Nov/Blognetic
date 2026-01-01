import React, { useEffect, useRef, useState } from 'react';
import { GameState, StreamComment } from '../types';
import { DANMAKU_MESSAGES, TRANSLATIONS } from '../constants';

interface Danmaku {
    id: number;
    text: string;
    top: number;
    speed: number;
    color: string;
}

export const StreamingWindow: React.FC<{ 
    gameState: GameState; 
    onStopStream: () => void;
    comments: StreamComment[];
    lang: 'en' | 'zh';
}> = ({ gameState, onStopStream, comments, lang }) => {
  const [danmakuList, setDanmakuList] = useState<Danmaku[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const interval = setInterval(() => {
        if (Math.random() > 0.4) return;
        setDanmakuList(prev => [...prev, {
            id: Date.now() + Math.random(),
            text: DANMAKU_MESSAGES[Math.floor(Math.random() * DANMAKU_MESSAGES.length)],
            top: Math.random() * 70 + 10,
            speed: Math.random() * 4 + 4,
            color: '#fff'
        }]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [comments]);

  return (
    <div className="flex h-full font-body bg-[var(--bg-color)] text-[var(--text-main)] overflow-hidden">
        {/* Stream Area */}
        <div className="flex-1 relative flex flex-col border-r-4 border-[var(--border-color)]">
            <div className="flex-1 relative bg-[#0f1a0f] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #a3b18a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="text-center z-10 flex flex-col items-center gap-4">
                    <div className="relative">
                         <i className="fas fa-leaf text-6xl text-[var(--accent-color)] animate-spin duration-[4000ms]"></i>
                         <i className="fas fa-signal absolute -top-4 -right-4 text-2xl text-orange-500 animate-pulse"></i>
                    </div>
                    <div className="text-xl font-title tracking-[0.2em] text-[var(--accent-color)]/50 uppercase animate-pulse">{t.transmitting}</div>
                 </div>

                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {danmakuList.map(d => (
                        <div key={d.id} className="absolute whitespace-nowrap font-bold text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-title"
                            style={{ top: `${d.top}%`, animation: `danmaku ${d.speed}s linear forwards`, color: d.color }}>
                            {d.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-5 flex items-center justify-between border-t-4 border-[var(--border-color)]">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--bg-color)] border-[3px] border-[var(--border-color)] flex items-center justify-center text-4xl wobbly-box">
                        🦊
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-title)] font-title leading-tight">FOREST LIVE: {gameState.location}</h2>
                        <div className="flex gap-4 text-sm font-bold opacity-70">
                            <span className="flex items-center gap-1.5"><i className="fas fa-users text-blue-500"></i>{gameState.followers} {t.viewers}</span>
                            <span className="flex items-center gap-1.5"><i className="fas fa-gem text-orange-500"></i>${gameState.money}</span>
                        </div>
                    </div>
                 </div>
                 <button 
                    onClick={onStopStream}
                    className="nav-btn bg-orange-600 text-white px-8 py-3 rounded-full font-title text-xl shadow-[0_4px_0_#9a3412] active:translate-y-1 active:shadow-none transition-all wobbly-box"
                 >
                    {t.endStream}
                 </button>
            </div>
        </div>

        {/* Chat Panel */}
        <div className="w-96 flex flex-col bg-[var(--container-bg)]/30 backdrop-blur-sm">
            <div className="p-5 border-b-4 border-[var(--border-color)] font-title text-center text-[var(--text-title)] text-xl bg-white shadow-sm">
                <i className="fas fa-comments mr-2 text-[var(--accent-color)]"></i>
                {t.streamChat}
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4" ref={chatRef}>
                {comments.map(c => (
                    <div key={c.id} className={`p-4 rounded-[15px] border-2 border-[var(--border-color)]/20 shadow-sm wobbly-box bg-white/80 ${c.isDonation ? 'bg-orange-50 border-orange-200' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[var(--text-title)] font-title">{c.user}</span>
                            {c.isDonation && <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold uppercase">{t.donated}</span>}
                        </div>
                        <p className="text-[var(--text-main)] text-sm leading-relaxed">{c.content}</p>
                        {c.isDonation && (
                            <div className="mt-2 text-orange-600 font-bold text-lg font-title flex items-center gap-1 animate-bounce">
                                <i className="fas fa-gift"></i> ${c.amount}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-5 border-t-4 border-[var(--border-color)] bg-white">
                <div className="relative wobbly-box rounded-full border-[3px] border-[var(--border-color)] overflow-hidden">
                    <input 
                        type="text" 
                        placeholder={t.saySomething} 
                        className="w-full bg-[var(--bg-color)] px-6 py-3 text-[var(--text-main)] outline-none text-lg font-body pr-12"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent-color)] hover:text-[var(--accent-pop)] transition-colors">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <style>{`@keyframes danmaku { 0% { left: 100%; transform: translateX(0); } 100% { left: 0%; transform: translateX(-100%); } }`}</style>
    </div>
  );
};
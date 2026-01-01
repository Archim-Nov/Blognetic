import React, { useRef, useState } from 'react';
import { Tweet } from '../types';
import { BlogCard, StreamModal, getRankStyles } from './Layout';
import { TRANSLATIONS } from '../constants';

export const ExplorationInput: React.FC<{
    onUserPost: (text: string, image?: string) => void;
    lang: 'en' | 'zh';
}> = ({ onUserPost, lang }) => {
    const [inputText, setInputText] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = TRANSLATIONS[lang];

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        if (!inputText.trim() && !selectedImage) return;
        onUserPost(inputText, selectedImage || undefined);
        setInputText('');
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="wobbly-box bg-card-context p-8 mb-16 rounded-[var(--radius-lg)]">
             <div className="flex flex-col gap-6">
                <h3 className="font-title text-2xl text-[var(--text-title)] flex items-center gap-3">
                    <i className="fas fa-pencil-alt text-[var(--accent-pop)]"></i>
                    {t.shareJourney}
                </h3>
                
                <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t.writeStory}
                    className="w-full bg-[var(--bg-color)] border-[3px] border-[var(--border-color)] rounded-[var(--radius-md)] p-6 outline-none transition-all text-[var(--text-main)] min-h-[140px] resize-none text-lg font-body placeholder:text-[var(--text-main)]/50 wobbly-box"
                />
                
                {selectedImage && (
                    <div className="relative inline-block w-40 h-40 rounded-[var(--radius-md)] overflow-hidden wobbly-box">
                        <img src={selectedImage} className="w-full h-full object-cover" />
                        <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer z-10 hover:scale-110 transition-transform">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <label className="cursor-pointer group flex items-center gap-3 text-[var(--text-main)] transition-colors">
                        <div className="w-12 h-12 bg-[var(--card-bg)] rounded-full flex items-center justify-center group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all wobbly-box shadow-sm">
                            <i className="far fa-images text-xl"></i>
                        </div>
                        <span className="font-title text-lg font-bold">{t.addPhoto}</span>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
                    </label>
                    
                    <button 
                        onClick={handlePost}
                        className="wobbly-box bg-[var(--accent-color)] hover:bg-[var(--accent-pop)] text-white px-8 py-3 rounded-full font-title text-xl font-bold flex items-center gap-3 shadow-sm hover:scale-105 active:translate-y-1 transition-all cursor-pointer"
                    >
                        <i className="fas fa-paper-plane text-xl"></i>
                        {t.publishPost}
                    </button>
                </div>
             </div>
        </div>
    );
};

export const ExplorationFeed: React.FC<{
  tweets: Tweet[];
  lang: 'en' | 'zh';
}> = ({ tweets, lang }) => {
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tweets.slice(0, displayCount).map((tweet) => (
                <BlogCard
                    key={tweet.id}
                    title={tweet.title || (tweet.type === 'user' ? (lang === 'zh' ? '林间日志' : "Woodland Journal") : (lang === 'zh' ? `奇遇 #${tweet.id.slice(-4)}` : `Strange Encounter #${tweet.id.slice(-4)}`))}
                    content={tweet.content}
                    image={tweet.image}
                    tags={[tweet.type === 'user' ? 'Journal' : 'Event', 'Fox']}
                    author={tweet.author}
                    timestamp={tweet.timestamp}
                    rank={tweet.rank}
                    onClick={() => setSelectedTweet(tweet)}
                />
            ))}
        </div>
        
        {tweets.length > displayCount && (
            <div className="flex justify-center mt-16 mb-8">
                <button 
                    onClick={() => setDisplayCount(prev => prev + 9)}
                    className="wobbly-box bg-[var(--accent-color)] hover:bg-[var(--accent-pop)] text-white px-12 py-3 rounded-full font-title text-lg font-bold flex items-center gap-3 shadow-sm hover:scale-105 active:translate-y-1 transition-all cursor-pointer"
                >
                    <i className="fas fa-scroll text-xl"></i>
                    {t.viewOlder}
                </button>
            </div>
        )}

        {selectedTweet && (
            <StreamModal onClose={() => setSelectedTweet(null)} title={selectedTweet.title || (lang === 'zh' ? "日志详情" : "Log Details")}>
                <div className="flex-1 overflow-y-auto bg-[var(--bg-color)] p-6 md:p-10">
                    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-10">
                        {/* Image Section - Scaled Image with Overlay Border */}
                        <div className="flex justify-center w-full">
                            <div className="relative w-fit max-w-full">
                                {/* The Image (Scale removed to prevent overflow) */}
                                <div className="rounded-[var(--radius-lg)] overflow-hidden relative z-0">
                                    <img 
                                        src={selectedTweet.image || "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
                                        className="max-w-full max-h-[65vh] w-auto h-auto object-contain block"
                                    />
                                </div>
                                
                                {/* The Border Overlay (Thicker border to cover gaps) */}
                                <div 
                                    className="absolute inset-0 wobbly-box rounded-[var(--radius-lg)] pointer-events-none z-10 bg-transparent"
                                    style={{ '--border-width': '6px' } as React.CSSProperties}
                                ></div>

                                {/* Rank Badge */}
                                {selectedTweet.rank && (
                                    <div className={`absolute top-4 left-4 w-16 h-16 flex items-center justify-center rounded-full font-title font-bold text-3xl border-4 shadow-lg z-20 wobbly-box ${getRankStyles(selectedTweet.rank)}`}>
                                        {selectedTweet.rank}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="wobbly-box bg-card-context p-8 md:p-10 rounded-[var(--radius-lg)] relative">
                             
                             {/* Header Info */}
                             <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 border-b-2 border-[var(--border-color)]/20 pb-6">
                                <div className="w-20 h-20 rounded-full bg-[var(--bg-color)] border-2 border-[var(--border-color)] flex items-center justify-center text-4xl shadow-sm wobbly-box">
                                    {selectedTweet.type === 'user' ? '📝' : '🦊'}
                                </div>
                                <div>
                                    <h1 className="font-title text-3xl md:text-4xl text-[var(--text-title)] mb-2">{selectedTweet.title}</h1>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[var(--text-main)] opacity-70 font-bold text-sm md:text-base">
                                        <span><i className="fas fa-user-circle mr-2"></i>{selectedTweet.author}</span>
                                        <span className="hidden md:inline">•</span>
                                        <span><i className="far fa-clock mr-2"></i>{selectedTweet.timestamp}</span>
                                        <span className="hidden md:inline">•</span>
                                        <span>{selectedTweet.handle}</span>
                                    </div>
                                </div>
                             </div>

                             {/* Text Content */}
                             <div className="font-body text-xl leading-relaxed text-[var(--text-main)] whitespace-pre-wrap">
                                {selectedTweet.content}
                             </div>

                             {/* Stats / Footer */}
                             <div className="mt-10 pt-6 border-t-2 border-[var(--border-color)]/10 flex gap-8">
                                <div className="flex items-center gap-2 font-bold text-[var(--text-main)] hover:text-red-500 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-[var(--bg-color)] flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                        <i className="fas fa-heart"></i>
                                    </div>
                                    <span>{selectedTweet.likes} Likes</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-[var(--text-main)] hover:text-blue-500 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-[var(--bg-color)] flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <i className="fas fa-retweet"></i>
                                    </div>
                                    <span>{selectedTweet.retweets} Reposts</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </StreamModal>
        )}
    </div>
  );
};
import React, { useRef, useState } from 'react';
import { Tweet } from '../types';
import { BlogCard } from './Layout';
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
                    className="w-full bg-[var(--bg-color)] border-[3px] border-[var(--border-color)] rounded-[var(--radius-md)] p-6 outline-none focus:bg-white transition-all text-[var(--text-main)] min-h-[140px] resize-none text-lg font-body placeholder:text-[var(--text-main)]/30 wobbly-box"
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
                        <div className="w-12 h-12 bg-white border-[3px] border-[var(--border-color)] rounded-full flex items-center justify-center group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all wobbly-box">
                            <i className="far fa-images text-xl"></i>
                        </div>
                        <span className="font-title text-lg">{t.addPhoto}</span>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
                    </label>
                    
                    <button 
                        onClick={handlePost}
                        className="nav-btn bg-[var(--accent-pop)] text-white px-10 py-3 rounded-full font-title text-xl hover:scale-105 shadow-[0_4px_0_var(--border-color)] active:translate-y-1 active:shadow-none wobbly-box"
                    >
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
                />
            ))}
        </div>
        
        {tweets.length > displayCount && (
            <div className="flex justify-center mt-16 mb-8">
                <button 
                    onClick={() => setDisplayCount(prev => prev + 9)}
                    className="nav-btn border-[3px] border-[var(--border-color)] text-[var(--text-title)] px-10 py-3 rounded-full font-bold hover:bg-[var(--accent-color)] hover:text-white transition-all wobbly-box"
                >
                    {t.viewOlder}
                </button>
            </div>
        )}
    </div>
  );
};
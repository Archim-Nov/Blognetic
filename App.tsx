import React, { useState, useEffect, useCallback } from 'react';
import { BlogHeader, BlogHero, StreamModal } from './components/Layout';
import { ExplorationFeed, ExplorationInput } from './components/ExplorationView';
import { StreamingWindow } from './components/StreamingView';
import { GameState, Tweet, StreamComment } from './types';
import { LOCATIONS, WEATHER_CONDITIONS, TRANSLATIONS, TES_MONTHS, TES_DAYS } from './constants';
import { generateAdventureEvent, generateStreamComment } from './services/geminiService';

const MAX_MATERIALS = 100;
const EXPLORATION_TICK_RATE = 200; 
const STREAM_TICK_RATE = 1500; 
const HOURS_PER_MOVE = 8;
const DAYS_PER_MAP = 8; 
const HOURS_TO_CHANGE_MAP = 24 * DAYS_PER_MAP; // 192 hours

export type ThemeType = 'light' | 'dark' | 'deep-green' | 'pink' | 'blue' | 'mono';

const formatGameTime = (totalHours: number, lang: 'en' | 'zh'): string => {
    const t = TRANSLATIONS[lang];
    const totalDays = Math.floor(totalHours / 24);
    const hourOfDay = totalHours % 24;
    
    // TES Calendar logic: 12 months, 30 days each = 360 days/year
    const year = 201 + Math.floor(totalDays / 360);
    const dayOfYear = totalDays % 360;
    const monthIndex = Math.floor(dayOfYear / 30);
    const dayOfMonth = (dayOfYear % 30) + 1;
    const dayOfWeekIndex = totalDays % 7;

    const eraStr = t.era;
    const monthStr = TES_MONTHS[lang][monthIndex];
    const dayOfWeekStr = TES_DAYS[lang][dayOfWeekIndex];

    let timePhase = "";
    if (lang === 'zh') {
        if (hourOfDay >= 6 && hourOfDay < 12) timePhase = "晨照";
        else if (hourOfDay >= 12 && hourOfDay < 18) timePhase = "正午";
        else if (hourOfDay >= 18 && hourOfDay < 22) timePhase = "薄暮";
        else timePhase = "子夜";
    } else {
        if (hourOfDay >= 6 && hourOfDay < 12) timePhase = "Morn";
        else if (hourOfDay >= 12 && hourOfDay < 18) timePhase = "Noon";
        else if (hourOfDay >= 18 && hourOfDay < 22) timePhase = "Dusk";
        else timePhase = "Midnight";
    }

    return `${eraStr} ${year}, ${monthStr} ${dayOfMonth} (${dayOfWeekStr}) - ${timePhase}`;
};

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const [theme, setTheme] = useState<ThemeType>('light');

  const [gameState, setGameState] = useState<GameState>({
    materials: 0,
    followers: 12,
    money: 0,
    location: LOCATIONS[0],
    locationIndex: 0,
    timeInLocation: 0,
    isStreaming: false,
    energy: 100,
    totalHours: 0,
    weather: WEATHER_CONDITIONS[0]
  });

  const [explorationProgress, setExplorationProgress] = useState(0);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [streamComments, setStreamComments] = useState<StreamComment[]>([]);
  const [isProcessingEvent, setIsProcessingEvent] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!gameState.isStreaming) {
      interval = setInterval(async () => {
        if (isProcessingEvent) return;
        setExplorationProgress(prev => {
          if (prev >= 100) {
            handleExplorationEvent();
            return 0;
          }
          return prev + 2; 
        });
      }, EXPLORATION_TICK_RATE);
    }
    return () => clearInterval(interval);
  }, [gameState.isStreaming, isProcessingEvent]);

  const handleExplorationEvent = useCallback(async () => {
    setIsProcessingEvent(true);
    
    setGameState(prev => {
        const newTotalHours = prev.totalHours + HOURS_PER_MOVE;
        let newTimeInLocation = prev.timeInLocation + HOURS_PER_MOVE;
        let newLocationIndex = prev.locationIndex;
        let locationChanged = false;

        if (newTimeInLocation >= HOURS_TO_CHANGE_MAP) {
            newLocationIndex = (prev.locationIndex + 1) % LOCATIONS.length;
            newTimeInLocation = 0;
            locationChanged = true;
        }
        
        const currentLocationName = LOCATIONS[newLocationIndex];
        let newWeather = prev.weather;
        if (Math.random() > 0.5 || locationChanged) {
            newWeather = WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)];
        }

        // We wrap the async call outside or use a trick to get the data
        return {
            ...prev,
            totalHours: newTotalHours,
            timeInLocation: newTimeInLocation,
            locationIndex: newLocationIndex,
            location: currentLocationName,
            weather: newWeather
        };
    });

    // Actually generate the event data now
    const currentLoc = gameState.location;
    const eventData = await generateAdventureEvent(currentLoc);
    
    setGameState(prev => ({
        ...prev,
        materials: Math.min(prev.materials + (eventData.quantity * 2), MAX_MATERIALS)
    }));

    const newTweet: Tweet = {
      id: Date.now().toString(),
      author: "protagonist_man",
      handle: "@hero_guy",
      title: (gameState.timeInLocation + HOURS_PER_MOVE >= HOURS_TO_CHANGE_MAP)
        ? (lang === 'zh' ? `新的征途` : `A New Journey`) 
        : eventData.title[lang],
      content: (gameState.timeInLocation + HOURS_PER_MOVE >= HOURS_TO_CHANGE_MAP)
        ? (lang === 'zh' ? `已踏入这片名为 ${LOCATIONS[(gameState.locationIndex + 1) % LOCATIONS.length]} 的领地。` : `Stepped into the domain of ${LOCATIONS[(gameState.locationIndex + 1) % LOCATIONS.length]}.`) 
        : eventData.text,
      likes: Math.floor(Math.random() * 5),
      retweets: 0,
      timestamp: formatGameTime(gameState.totalHours + HOURS_PER_MOVE, lang), 
      type: 'event'
    };

    setTweets(prev => [newTweet, ...prev].slice(0, 50)); 
    setIsProcessingEvent(false);
  }, [gameState.locationIndex, gameState.timeInLocation, gameState.totalHours, gameState.weather, lang, gameState.location]);

  const handleUserPost = (text: string, image?: string) => {
    const newTweet: Tweet = {
        id: Date.now().toString(),
        author: "admin",
        handle: "admin",
        title: lang === 'zh' ? "旅行者的低语" : "Traveler's Whisper",
        content: text,
        image: image,
        likes: 0,
        retweets: 0,
        timestamp: formatGameTime(gameState.totalHours, lang),
        type: 'user'
    };
    setTweets(prev => [newTweet, ...prev]);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState.isStreaming) {
      interval = setInterval(async () => {
        setGameState(prev => {
            const newMaterials = prev.materials - 5;
            if (newMaterials <= 0) {
                stopStream();
                return { ...prev, materials: 0, isStreaming: false };
            }
            return { ...prev, materials: newMaterials };
        });

        const commentData = await generateStreamComment(gameState.location);
        const newComment: StreamComment = {
            id: Date.now().toString(),
            user: commentData.user,
            content: commentData.content,
            color: 'white',
            isDonation: commentData.isDonation,
            amount: commentData.amount
        };
        if (commentData.isDonation) {
            setGameState(prev => ({ ...prev, money: prev.money + (commentData.amount || 0) }));
        }
        setStreamComments(prev => [...prev, newComment].slice(-20));
      }, STREAM_TICK_RATE);
    }
    return () => clearInterval(interval);
  }, [gameState.isStreaming, gameState.location]);

  const startStream = () => {
    setGameState(prev => ({ ...prev, isStreaming: true }));
    const t = TRANSLATIONS[lang];
    setStreamComments([{ id: 'sys', user: t.system, content: t.broadcastStarted, color: 'gray' }]);
  };

  const stopStream = () => {
    setGameState(prev => ({ ...prev, isStreaming: false }));
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="container mx-auto px-6 py-8 max-w-[1200px] wobbly-box wobbly-box-container my-8 min-h-[90vh]">
        <BlogHeader 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            lang={lang} 
            setLang={setLang}
            theme={theme}
            setTheme={setTheme}
        />

        <BlogHero 
            currentLocation={gameState.location}
            locationIndex={gameState.locationIndex}
            progress={explorationProgress} 
            energy={gameState.energy}
            materials={gameState.materials}
            gameTime={formatGameTime(gameState.totalHours, lang)}
            weather={gameState.weather}
            lang={lang}
        />

        <div className="flex items-center justify-center gap-4 my-12 text-[var(--text-title)] font-title text-2xl">
            <div className="h-1 flex-1 bg-[var(--border-color)] rounded-full animate-[squiggly-anim_0.3s_linear_infinite] max-w-[100px]"></div>
            <span>{t.journeySoFar}</span>
            <div className="h-1 flex-1 bg-[var(--border-color)] rounded-full animate-[squiggly-anim_0.3s_linear_infinite] max-w-[100px]"></div>
        </div>

        <ExplorationInput onUserPost={handleUserPost} lang={lang} />

        {!gameState.isStreaming && gameState.materials > 20 && (
            <div className="fixed bottom-8 right-8 z-40">
                <button 
                    onClick={startStream}
                    className="bg-[var(--accent-pop)] text-white border-[3px] border-[var(--border-color)] rounded-full w-16 h-16 flex items-center justify-center shadow-[4px_4px_0_var(--border-color)] hover:translate-y-1 hover:shadow-none transition-all animate-bounce wobbly-box"
                    title={t.startStream}
                >
                    <i className="fas fa-video text-xl"></i>
                </button>
            </div>
        )}

        <ExplorationFeed tweets={tweets} lang={lang} />
        
        <footer className="wobbly-box bg-card-context p-6 mt-16 rounded-[var(--radius-md)] text-center font-title text-[var(--text-main)]">
            <p>Made with <i className="fas fa-heart text-[var(--accent-pop)]"></i> and Nature | © 2024 ForestBlog</p>
        </footer>

        {gameState.isStreaming && (
            <StreamModal onClose={stopStream} title={`${t.liveBroadcast} - FOREST TV`}>
                <StreamingWindow 
                    gameState={gameState} 
                    onStopStream={stopStream} 
                    comments={streamComments}
                    lang={lang}
                />
            </StreamModal>
        )}
    </div>
  );
}

export default App;
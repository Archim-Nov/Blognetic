// AI Service for generating blog content
// Supports OpenAI-compatible API and Gemini API

export interface AIConfig {
  enabled: boolean;
  provider: 'openai' | 'gemini';
  apiKey: string;
  baseUrl: string;  // For OpenAI-compatible APIs
  model: string;
}

export interface BlogGenerationContext {
  eventName: string;
  eventCategory: string;
  isSuccess: boolean;
  location: string;
  weather: string;
  lang: 'en' | 'zh';
}

export interface GeneratedContent {
  title: string;
  content: string;
}

const DEFAULT_CONFIG: AIConfig = {
  enabled: false,
  provider: 'openai',
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-3.5-turbo'
};

// Load config from localStorage
export const loadAIConfig = (): AIConfig => {
  try {
    const saved = localStorage.getItem('blognetic_ai_config');
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load AI config:', e);
  }
  return DEFAULT_CONFIG;
};

// Save config to localStorage
export const saveAIConfig = (config: AIConfig): void => {
  try {
    localStorage.setItem('blognetic_ai_config', JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save AI config:', e);
  }
};

// Build prompt for blog generation
const buildPrompt = (context: BlogGenerationContext): string => {
  const { eventName, eventCategory, isSuccess, location, weather, lang } = context;

  const langInstruction = lang === 'zh'
    ? '请用中文回复，风格轻松幽默，像社交媒体博主的口吻。'
    : 'Reply in English with a casual, humorous tone like a social media blogger.';

  const outcomeDesc = isSuccess
    ? (lang === 'zh' ? '成功' : 'successful')
    : (lang === 'zh' ? '失败' : 'failed');

  return `You are a fantasy world travel blogger. Generate a short blog post (2-3 sentences) about an adventure event.

Event: ${eventName}
Category: ${eventCategory}
Outcome: ${outcomeDesc}
Location: ${location}
Weather: ${weather}

${langInstruction}

Return ONLY a JSON object with this format:
{"title": "short catchy title", "content": "blog post content"}`;
};

// Call OpenAI-compatible API
const callOpenAI = async (config: AIConfig, prompt: string): Promise<GeneratedContent> => {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 200
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';

  return parseAIResponse(text);
};

// Call Gemini API
const callGemini = async (config: AIConfig, prompt: string): Promise<GeneratedContent> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 200
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  return parseAIResponse(text);
};

// Parse AI response to extract JSON
const parseAIResponse = (text: string): GeneratedContent => {
  try {
    // Try to find JSON in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || 'Adventure Log',
        content: parsed.content || text
      };
    }
  } catch (e) {
    console.error('Failed to parse AI response:', e);
  }

  // Fallback: use raw text
  return {
    title: 'Adventure Log',
    content: text.slice(0, 200)
  };
};

// Main function to generate blog content
export const generateBlogContent = async (
  context: BlogGenerationContext
): Promise<GeneratedContent | null> => {
  const config = loadAIConfig();

  if (!config.enabled || !config.apiKey) {
    return null;
  }

  try {
    const prompt = buildPrompt(context);

    if (config.provider === 'gemini') {
      return await callGemini(config, prompt);
    } else {
      return await callOpenAI(config, prompt);
    }
  } catch (e) {
    console.error('AI generation failed:', e);
    return null;
  }
};

// Test API connection
export const testAIConnection = async (config: AIConfig): Promise<boolean> => {
  try {
    const testPrompt = 'Say "OK" if you can read this.';

    if (config.provider === 'gemini') {
      await callGemini(config, testPrompt);
    } else {
      await callOpenAI(config, testPrompt);
    }
    return true;
  } catch (e) {
    console.error('AI connection test failed:', e);
    return false;
  }
};

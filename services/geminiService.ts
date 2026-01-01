import { SNAFU_EVENTS, SNAFU_MATERIALS } from "../constants";

export const generateAdventureEvent = async (location: string): Promise<{ text: string; material: string; quantity: number; title: {en: string, zh: string}, rank: 'C' | 'B' | 'A' | 'S' }> => {
  // Simulate network delay for "realism"
  await new Promise(resolve => setTimeout(resolve, 500));

  const randomEvent = SNAFU_EVENTS[Math.floor(Math.random() * SNAFU_EVENTS.length)];
  const randomMaterial = SNAFU_MATERIALS[Math.floor(Math.random() * SNAFU_MATERIALS.length)];
  
  // Create a location-specific variant for the title
  const locationPrefix = location.split(' ').slice(-1)[0]; // Use last word of location
  const finalTitle = {
      en: `${locationPrefix.charAt(0).toUpperCase() + locationPrefix.slice(1)}: ${randomEvent.title.en}`,
      zh: `${location.includes('山') ? '山峦' : '原野'}之志：${randomEvent.title.zh}`
  };

  const verboseLocation = `currently located at ${location}`;
  
  return {
    text: `${verboseLocation}. ${randomEvent.text}`,
    material: randomEvent.quantity > 0 ? randomMaterial : "nothing",
    quantity: randomEvent.quantity > 0 ? Math.floor(Math.random() * 5) + 1 : 0,
    title: finalTitle,
    rank: (randomEvent.rank as 'C' | 'B' | 'A' | 'S') || 'C'
  };
};

export const generateStreamComment = async (context: string): Promise<{ user: string; content: string; isDonation: boolean; amount: number }> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const SNAFU_COMMENTS = [
      { user: "visual_enjoyer_99", content: "this entertains my receptors", isDonation: false },
      { user: "money_haver", content: "i transfer currency to you", isDonation: true, amount: 500 },
      { user: "skeptic_dude", content: "is this event factual?", isDonation: false },
      { user: "gamer_entity", content: "perform the jumping action", isDonation: false },
      { user: "loud_noise", content: "LOUD EXCLAMATION OF JOY", isDonation: true, amount: 50 },
      { user: "internet_person", content: "poggers", isDonation: false },
      { user: "critic_bot", content: "your skill requires incrementation", isDonation: false },
    ];
  const randomComment = SNAFU_COMMENTS[Math.floor(Math.random() * SNAFU_COMMENTS.length)];
  return {
    user: randomComment.user,
    content: randomComment.content,
    isDonation: randomComment.isDonation,
    amount: randomComment.isDonation ? (randomComment.amount || 100) : 0
  };
};
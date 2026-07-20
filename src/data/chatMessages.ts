export interface ChatMessage {
  user: string;
  text: string;
  accent?: boolean;
}

export const CHAT_MESSAGES: ChatMessage[] = [
  { user: "VECTOR_FAN", text: "first operation?" },
  { user: "SPECTATOR88", text: "W camera angle" },
  { user: "AIRSPACE_ADMIN", text: "access expanding soon" },
  { user: "CIVOP_712", text: "clip it" },
  { user: "GENERAL_MANN", text: "Welcome to the future.", accent: true },
  { user: "NORMALIZED_VIOLENCE", text: "gifted 5 operator passes" },
  { user: "FEED_WATCHER", text: "latency looks clean" },
  { user: "BETA_QUEUE", text: "still waiting on invite" },
  { user: "MAP_SCRUB", text: "theater switch when?" },
  { user: "CLIP_FACTORY", text: "export tools when??" },
];

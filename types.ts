export enum Sender {
  User = 'user',
  Bot = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  isStreaming?: boolean;
}

export interface HexagramMeta {
  name: string;
  symbol: string; // e.g., ䷀
  upperTrigram: string;
  lowerTrigram: string;
}

export interface User {
  id: number;
  name: string;
  role: string;
  image_url: string;
}

export interface ChatMessage {
  type: 'MESSAGE' | 'JOIN' | 'LEAVE' | 'TYPING' | 'COUNT' | 'HISTORY';
  room?: string;
  user: User;
  message?: string;
  timestamp: number;
  typing?: boolean;
}

export interface HistoryResponse {
  type: 'HISTORY';
  messages: ChatMessage[];
}

export interface CountMessage {
  type: 'COUNT';
  count: number;
}

export interface WebSocketOutgoingMessage {
  type: 'MESSAGE' | 'TYPING';
  payload: {
    text?: string;
    isTyping?: boolean;
  };
}

export type WebSocketIncomingMessage = ChatMessage | HistoryResponse | CountMessage;
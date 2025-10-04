import { useState, useEffect, useRef, useCallback } from 'react';
import type { ChatMessage, WebSocketIncomingMessage, WebSocketOutgoingMessage } from "../Type/chatTypes";

interface UseChatRoomReturn {
  messages: ChatMessage[];
  onlineCount: number;
  typingUsers: string[];
  connected: boolean;
  sendMessage: (text: string) => void;
  handleTypingIndicator: () => void;
}

export function useChatRoom(roomId: string | null, token: string | null): UseChatRoomReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [connected, setConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!roomId || !token) return;

    const ws = new WebSocket(`ws://localhost:8080?token=${token}&roomId=${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log('Connected to room:', roomId);
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      
      switch (data.type) {
        case 'HISTORY':
          setMessages(data.messages || []);
          break;
        case 'MESSAGE':
          setMessages(prev => [...prev, data]);
          break;
        case 'JOIN':
          setMessages(prev => [...prev, data]);
          break;
        case 'LEAVE':
          setMessages(prev => [...prev, data]);
          break;
        case 'COUNT':
          setOnlineCount(data.count);
          break;
        case 'TYPING':
          if (data.typing) {
            setTypingUsers(prev => new Set([...prev, data.user.name]));
          } else {
            setTypingUsers(prev => {
              const next = new Set(prev);
              next.delete(data.user.name);
              return next;
            });
          }
          break;
      }
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('Disconnected from room:', roomId);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [roomId, token]);

  const sendMessage = useCallback((text: string): void => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: WebSocketOutgoingMessage = {
        type: 'MESSAGE',
        payload: { text }
      };
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  const sendTyping = useCallback((isTyping: boolean): void => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: WebSocketOutgoingMessage = {
        type: 'TYPING',
        payload: { isTyping }
      };
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  const handleTypingIndicator = useCallback((): void => {
    sendTyping(true);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(false);
    }, 2000);
  }, [sendTyping]);

  return {
    messages,
    onlineCount,
    typingUsers: Array.from(typingUsers),
    connected,
    sendMessage,
    handleTypingIndicator
  };
}


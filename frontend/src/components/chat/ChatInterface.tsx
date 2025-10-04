import  { useState, useEffect, useRef } from 'react';
import type {ChangeEvent, KeyboardEvent} from 'react'
import { Users, Loader2, Send } from 'lucide-react';
import { useChatRoom } from '../../context/useWebsocket';
import { Message } from './Message';

interface ChatRoomProps {
  roomId: string;
  token: string;
  userName: string;
  userId: number;
}

export function ChatRoom({ roomId, token, userId }: ChatRoomProps) {
  const [inputText, setInputText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    onlineCount,
    typingUsers,
    connected,
    sendMessage,
    handleTypingIndicator
  } = useChatRoom(roomId, token);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (): void => {
    if (inputText.trim()) {
      sendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
    handleTypingIndicator();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">#{roomId}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{onlineCount} online</span>
            {!connected && (
              <span className="flex items-center gap-1 text-yellow-600">
                <Loader2 className="w-3 h-3 animate-spin" />
                Connecting...
              </span>
            )}
            {connected && (
              <span className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Connected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            msg={msg}
            isOwnMessage={msg.user?.id === userId}
          />
        ))}
        {typingUsers.length > 0 && (
          <div className="text-sm text-gray-500 italic">
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={!connected}
          />
          <button
            onClick={handleSend}
            disabled={!connected || !inputText.trim()}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { Users, Loader2, Send, MoreVertical, Smile, Paperclip, Phone, Video } from 'lucide-react';
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

  const getRoomAvatar = () => {
    const avatars: { [key: string]: string } = {
      'general': '👋',
      'tech': '💻',
      'random': '🎲',
      'gaming': '🎮'
    };
    return avatars[roomId] || '💬';
  };

  const getRoomGradient = () => {
    const gradients: { [key: string]: string } = {
      'general': 'from-blue-400 to-cyan-300',
      'tech': 'from-purple-400 to-pink-300',
      'random': 'from-orange-400 to-yellow-300',
      'gaming': 'from-green-400 to-teal-300'
    };
    return gradients[roomId] || 'from-blue-400 to-purple-400';
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50/30 to-purple-50/20">
      {/* Header with Beautiful Gradient */}
      <div 
        className="border-b border-white/50 backdrop-blur-sm px-6 py-4 flex items-center justify-between shadow-sm" 
        style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #EC4899 100%)' }}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${getRoomGradient()} rounded-2xl flex items-center justify-center text-2xl shadow-lg ring-2 ring-white/50`}>
            {getRoomAvatar()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white drop-shadow-sm">#{roomId}</h2>
            <div className="flex items-center gap-2 text-xs text-white/95">
              <Users className="w-3.5 h-3.5" />
              <span className="font-medium">{onlineCount} members</span>
              {!connected && (
                <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Connecting...
                </span>
              )}
              {connected && (
                <span className="flex items-center gap-1 bg-emerald-400/30 px-2 py-0.5 rounded-full">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse shadow-sm"></div>
                  Online
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/20 rounded-full transition-all">
            <Phone className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full transition-all">
            <Video className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full transition-all">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages Area with Pattern */}
      <div 
        className="flex-1 overflow-y-auto px-6 py-6"
        style={{
          background: 'linear-gradient(to bottom, rgba(239, 246, 255, 0.3), rgba(243, 232, 255, 0.2))',
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, idx) => (
            <Message
              key={idx}
              msg={msg}
              isOwnMessage={msg.user?.id === userId}
            />
          ))}
          {typingUsers.length > 0 && (
            <div className="flex items-center gap-2 text-sm mb-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-flex shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
              <span className="text-gray-600 font-medium">
                {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Modern & Light */}
      <div className="bg-white/80 backdrop-blur-md border-t border-blue-100 px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <button 
              className="p-3 hover:bg-blue-50 rounded-full transition-all text-blue-500 hover:scale-110"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 bg-white rounded-3xl shadow-md border border-blue-100 focus-within:border-blue-300 focus-within:shadow-lg transition-all">
              <div className="flex items-center gap-2 px-5 py-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  disabled={!connected}
                />
                <button className="hover:scale-110 transition-transform text-gray-400 hover:text-gray-600">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleSend}
              disabled={!connected || !inputText.trim()}
              className="p-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
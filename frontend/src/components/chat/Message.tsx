import React from 'react';
import type { ChatMessage } from '../../Type/chatTypes';

interface MessageProps {
  msg: ChatMessage;
  isOwnMessage: boolean;
}

export function Message({ msg, isOwnMessage }: MessageProps) {
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (msg.type === 'JOIN' || msg.type === 'LEAVE') {
    return (
      <div className="text-center py-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {msg.user.name} {msg.type === 'JOIN' ? 'joined' : 'left'} the room
        </span>
      </div>
    );
  }

  if (msg.type !== 'MESSAGE') return null;

  const avatarUrl = msg.user.image_url || 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user.name}`;

  return (
    <div className={`flex gap-3 mb-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
      <img
        src={avatarUrl}
        alt={msg.user.name}
        className="w-8 h-8 rounded-full flex-shrink-0"
      />
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-700">
            {msg.user.name}
          </span>
          <span className="text-xs text-gray-400">
            {formatTime(msg.timestamp)}
          </span>
        </div>
        <div
          className={`px-4 py-2 rounded-lg max-w-md ${
            isOwnMessage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {msg.message}
        </div>
      </div>
    </div>
  );
}

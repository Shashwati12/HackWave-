import React, { useState } from 'react';
import { RoomSelector } from '../components/chat/RoomSelector';
import { ChatRoom } from '../components/chat/ChatInterface';
import { useAuth } from '../context/useAuth';



export default function ChatPage() {
  const {logout } = useAuth();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU5NTI1OTY2fQ.6q1K_ekqTFfFbVCmRywxI01PmZOknPwTvGgTHjK-PIw';
  const user = {
    id:1,
    name:"yo"
  }
  const [currentRoom, setCurrentRoom] = useState<string>('123');

  if (!user) {
    //return <LoginScreen onLogin={login} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <RoomSelector
        currentRoom={currentRoom}
        onSelectRoom={setCurrentRoom}
        onLogout={logout}
        userName={user.name}
      />
      <div className="flex-1 overflow-hidden">
        <ChatRoom
          key={currentRoom}
          roomId={currentRoom}
          token={token}
          userName={user.name}
          userId={user.id}
        />
      </div>
    </div>
  );
}
import { useState } from "react";
import { ChatRoom } from "../components/chat/ChatInterface";
import { RoomSelector } from "../components/chat/RoomSelector";
import { useAuth } from "../context/useAuth";

export default function ChatPage() {
  const { logout } = useAuth();
  const [currentRoom, setCurrentRoom] = useState<string>('general');
 // const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  // if (loading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <div className="text-gray-500">Loading...</div>
  //     </div>
  //   );
  // }

  //const token = localStorage.getItem('token')?.split(' ')[1] || '';
  //const userName = user?.name || 'User';
  //const userId = user?.id || 0;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU5NTI1OTY2fQ.6q1K_ekqTFfFbVCmRywxI01PmZOknPwTvGgTHjK-PIw';
  const user = {
    id:1,
    name:"yo"
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Left Sidebar - Room List */}
      <RoomSelector
        currentRoom={currentRoom}
        onSelectRoom={setCurrentRoom}
        onLogout={logout}
        userName={user.name}
      />
      
      {/* Right Side - Chat Interface */}
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
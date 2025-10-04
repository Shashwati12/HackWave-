import { Search, MoreVertical, Plus } from 'lucide-react';

interface RoomSelectorProps {
  currentRoom: string;
  onSelectRoom: (room: string) => void;
  onLogout: () => void;
  userName: string;
}

export function RoomSelector({ currentRoom, onSelectRoom, onLogout, userName }: RoomSelectorProps) {
  const rooms = [
    { 
      name: 'Tatva Attendees Chat', 
      lastMessage: 'Any doubts, feel free to dm here',
      time: '12:45 PM',
      unread: 3,
      avatar: '👋'
    },
    { 
      name: 'Tatva Organizer chat', 
      lastMessage: 'Check out the latest update int the plan...',
      time: '11:30 AM',
      unread: 0,
      avatar: '💻'
    },
    { 
      name: 'Tatva Sponsers chat', 
      lastMessage: 'Up for a union?',
      time: 'Yesterday',
      unread: 1,
      avatar: '🎲'
    },
    { 
      name: 'Tatva vender chat', 
      lastMessage: 'GG! That was an amazing match',
      time: 'Yesterday',
      unread: 0,
      avatar: '🎮'
    }
  ];

  return (
    <div className="w-96 bg-white flex flex-col h-full border-r border-gray-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
              {userName[0].toUpperCase()}
            </div>
            <h1 className="text-gray-900 font-semibold text-lg"> Organizer Chats</h1>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button 
              onClick={onLogout}
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              title="Logout"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:bg-gray-100 text-gray-700 placeholder-gray-400 border border-transparent focus:border-gray-300"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.map(room => (
          <button
            key={room.name}
            onClick={() => onSelectRoom(room.name)}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-colors border-b border-gray-100 ${
              currentRoom === room.name 
                ? 'bg-blue-50' 
                : 'hover:bg-gray-50'
            }`}
          >
            {/* Avatar */}
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              {room.avatar}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-medium text-gray-900 truncate ${
                  room.unread > 0 ? 'font-semibold' : ''
                }`}>
                  #{room.name}
                </h3>
                <span className={`text-xs flex-shrink-0 ml-2 ${
                  room.unread > 0 ? 'text-blue-600 font-medium' : 'text-gray-400'
                }`}>
                  {room.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-sm truncate ${
                  room.unread > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'
                }`}>
                  {room.lastMessage}
                </p>
                {room.unread > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {room.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
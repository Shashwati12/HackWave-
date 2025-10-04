interface RoomSelectorProps {
  currentRoom: string;
  onSelectRoom: (room: string) => void;
  onLogout: () => void;
  userName: string;
}

export function RoomSelector({ currentRoom, onSelectRoom, onLogout, userName }: RoomSelectorProps) {
  const rooms: string[] = ['general', 'tech', 'random', 'gaming'];

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {userName[0].toUpperCase()}
          </div>
          <span className="font-semibold text-gray-800">{userName}</span>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {rooms.map(room => (
          <button
            key={room}
            onClick={() => onSelectRoom(room)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentRoom === room
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            #{room}
          </button>
        ))}
      </div>
    </div>
  );
}

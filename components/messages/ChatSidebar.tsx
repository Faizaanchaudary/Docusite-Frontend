import React from 'react';
import { XIcon } from 'lucide-react';
import ChatEntry from '@/components/messages/ChatEntry';

interface ChatSidebarProps {
  selectedChat: string;
  onChatSelect: (chatId: string) => void;
  onClose?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ selectedChat, onChatSelect, onClose }) => {
  // Sample chat data
  const chats = [
    {
      id: '1',
      name: 'Hotel Al-Buraak',
      avatar: 'H',
      lastMessage: "How's going?",
      timestamp: '2 mins ago',
      isRead: true,
      hasUnread: true
    },
    {
      id: '2',
      name: 'Hotel Al-Buraak',
      avatar: 'H',
      lastMessage: "How's going?",
      timestamp: '2 mins ago',
      isRead: true,
      hasUnread: true
    },
    {
      id: '3',
      name: 'Hotel Al-Buraak',
      avatar: 'H',
      lastMessage: "How's going?",
      timestamp: '2 mins ago',
      isRead: true,
      hasUnread: true
    },
    {
      id: '4',
      name: 'Hotel Al-Buraak',
      avatar: 'H',
      lastMessage: "How's going?",
      timestamp: '2 mins ago',
      isRead: true,
      hasUnread: true
    },
    {
      id: '5',
      name: 'Hotel Al-Buraak',
      avatar: 'H',
      lastMessage: "How's going?",
      timestamp: '2 mins ago',
      isRead: true,
      hasUnread: true
    },
    {
      id: '6',
      name: 'Hotel Al-Buraak',
      avatar: 'H',
      lastMessage: "How's going?",
      timestamp: '2 mins ago',
      isRead: true,
      hasUnread: true
    },
    {
      id: '7',
      name: 'Hotel Al-Buraak',
      avatar: 'H',
      lastMessage: "How's going?",
      timestamp: '2 mins ago',
      isRead: true,
      hasUnread: true
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 sm:px-4 border-b border-border-gray">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">Chats</h2>
          {/* Close Button - Only visible on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-light-gray rounded-md transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatEntry
            key={chat.id}
            chat={chat}
            isSelected={selectedChat === chat.id}
            onClick={() => onChatSelect(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;

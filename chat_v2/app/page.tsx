'use client';

import { useState } from 'react';
import ChatArea from '@/components/ChatArea';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';

export default function Home() {
  const [selectedContact, setSelectedContact] = useState('Tom');
  const [showAllTasks, setShowAllTasks] = useState(false);

  const handleMenuItemClick = (item: string) => {
    if (item === 'taskList') {
      setShowAllTasks(true);
      setSelectedContact('');
    } else {
      setShowAllTasks(false);
    }
  };

  const handleContactSelect = (contact: string) => {
    setSelectedContact(contact);
    setShowAllTasks(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* left sidebar */}
      <Sidebar 
        className="w-64 border-r border-gray-200 dark:border-gray-800" 
        onSelectContact={handleContactSelect}
        selectedContact={selectedContact}
      />
      
      {/* middle chat area */}
      <main className="flex-1 flex flex-col">
        <ChatArea 
          selectedContact={selectedContact} 
          showAllTasks={showAllTasks}
        />
      </main>

      {/* right panel */}
      <RightPanel 
        className="w-64 border-l border-gray-200 dark:border-gray-800" 
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
}

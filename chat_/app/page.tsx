import ChatArea from '@/components/ChatArea';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      {/* left sidebar */}
      <Sidebar className="w-64 border-r border-gray-200 dark:border-gray-800" />
      
      {/* middle chat area */}
      <main className="flex-1 flex flex-col">
        <ChatArea />
      </main>

      {/* right panel */}
      <RightPanel className="w-64 border-l border-gray-200 dark:border-gray-800" />
    </div>
  );
}

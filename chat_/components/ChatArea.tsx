'use client';

import { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import TaskForm from './TaskForm';
import TaskSummary from './TaskSummary';

export default function ChatArea() {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    files?: File[];
  }>>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTaskLists, setShowTaskLists] = useState(false);
  const [taskSummaries, setTaskSummaries] = useState<Array<{
    summary: string;
    link: string;
  }>>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50); // 百分比
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, files?: File[]) => {
    setMessages(prev => [...prev, { role: 'user', content: message, files }]);
  };

  const handleTaskClick = () => {
    setShowTaskForm(true);
    setShowTaskLists(true);
  };

  const handleTaskSubmit = (taskData: any) => {
    const summary = `Task created for ${taskData.relatedPeople}: ${taskData.description}`;
    const link = 'https://motiong.com/task/23434354';
    
    setTaskSummaries(prev => [...prev, {
      summary,
      link
    }]);
    
    setShowTaskForm(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // 防止默认行为
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const boundedPercentage = Math.min(Math.max(percentage, 20), 80);
      setSplitPosition(boundedPercentage);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // 在 document 上添加事件监听
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex flex-col h-full relative" ref={containerRef}>
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧聊天区域 */}
        <div 
          className="overflow-auto p-4" 
          style={{ width: `${splitPosition}%` }}
        >
          <ChatMessages messages={messages} />
        </div>

        {/* 可拖动分隔线 */}
        <div
          className="w-1 bg-gray-200 hover:bg-purple-400 cursor-col-resize select-none active:bg-purple-600"
          onMouseDown={handleMouseDown}
        />

        {/* 右侧任务区域 */}
        <div 
          className="overflow-auto"
          style={{ width: `${100 - splitPosition}%` }}
        >
          {showTaskLists && !showTaskForm && (
            <div className="p-4 space-y-2">
              <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg text-sm">
                Current taskList
              </button>
              <button className="w-full px-4 py-2 bg-green-100 text-green-600 rounded-lg text-sm">
                continuous List
              </button>
            </div>
          )}
          {taskSummaries.length > 0 && !showTaskForm && (
            <div className="p-4 space-y-4">
              {taskSummaries.map((task, index) => (
                <TaskSummary key={index} taskData={task} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showTaskForm && (
        <div className="border-t">
          <TaskForm onClose={() => setShowTaskForm(false)} onSubmit={handleTaskSubmit} />
        </div>
      )}

      <div className="border-t">
        <ChatInput onSendMessage={handleSendMessage} onTaskClick={handleTaskClick} />
      </div>
    </div>
  );
} 
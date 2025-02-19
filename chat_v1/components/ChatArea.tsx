'use client';

import { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import TaskForm from './TaskForm';
import TaskSummary from './TaskSummary';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  files?: File[];
}

interface ContactMessages {
  [key: string]: ChatMessage[];
}

interface ContactTasks {
  [key: string]: Array<{
    summary: string;
    link: string;
  }>;
}

interface ChatAreaProps {
  selectedContact: string;
  showAllTasks: boolean;
}

export default function ChatArea({ selectedContact, showAllTasks }: ChatAreaProps) {
  const [messagesByContact, setMessagesByContact] = useState<ContactMessages>({});
  const [tasksByContact, setTasksByContact] = useState<ContactTasks>({});
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTaskLists, setShowTaskLists] = useState(false);
  const [currentTaskDetails, setCurrentTaskDetails] = useState<string | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showTaskListButtons, setShowTaskListButtons] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, files?: File[]) => {
    setMessagesByContact(prev => ({
      ...prev,
      [selectedContact]: [
        ...(prev[selectedContact] || []),
        { role: 'user', content: message, files }
      ]
    }));
  };

  const handleTaskClick = () => {
    setShowTaskForm(true);
    setShowTaskLists(true);
  };

  const handleTaskSubmit = (taskData: any) => {
    const summary = `Task created by ${taskData.initiator} for ${taskData.assignee}: ${taskData.description}`;
    const details = `Details: ${taskData.description}, Deadline: ${taskData.deadline}, Urgency: ${taskData.urgency}, Initiator: ${taskData.initiator}, Assignee: ${taskData.assignee}, Related People: ${taskData.relatedPeople}, Parent Task: ${taskData.parentTask}, Child Tasks: ${taskData.childTasks}，Related Files: ${taskData.relatedFiles}`;
    
    setTasksByContact(prev => ({
      ...prev,
      [selectedContact]: [
        ...(prev[selectedContact] || []),
        { summary, details }
      ]
    }));
    
    setShowTaskForm(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent default behavior
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const boundedPercentage = Math.min(Math.max(percentage, 0), 100);
      setSplitPosition(boundedPercentage);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // add event listener to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const currentMessages = selectedContact ? (messagesByContact[selectedContact] || []) : [];
  const currentTasks = tasksByContact[selectedContact] || [];

  // 获取所有任务的函数
  const getAllTasks = () => {
    return Object.entries(tasksByContact).reduce((acc, [contact, tasks]) => {
      return [...acc, ...tasks.map(task => ({
        ...task,
        contact // 添加联系人信息
      }))];
    }, [] as Array<{summary: string; link: string; contact: string}>);
  };

  const tasksToDisplay = currentTaskDetails ? [] : (showAllTasks ? getAllTasks() : currentTasks);

  const handleViewDetails = (details: string) => {
    setCurrentTaskDetails(details);
    setShowTaskDetails(true);
    setShowTaskListButtons(false);
  };

  const handleBackToTasks = () => {
    setShowTaskDetails(false);
    setCurrentTaskDetails(null);
    setShowTaskListButtons(true);
  };

  return (
    <div className="flex flex-col h-full relative" ref={containerRef}>
      <div className="flex-1 flex overflow-hidden">
        {selectedContact && (
          <div 
            className="overflow-auto p-4" 
            style={{ width: (showTaskLists || showAllTasks) ? `${splitPosition}%` : '100%' }}
          >
            <ChatMessages messages={currentMessages} />
          </div>
        )}

        {(showTaskLists || showAllTasks) && (
          <>
            {selectedContact && (
              <div
                className="w-1 bg-gray-200 hover:bg-purple-400 cursor-col-resize select-none active:bg-purple-600"
                onMouseDown={handleMouseDown}
              />
            )}

            <div 
              className="overflow-auto"
              style={{ width: selectedContact ? `${100 - splitPosition}%` : '100%' }}
            >
              {!showTaskForm && !showAllTasks && showTaskListButtons && (
                <div className="p-4 space-y-2">
                  <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg text-sm">
                    Current taskList
                  </button>
                  <button className="w-full px-4 py-2 bg-green-100 text-green-600 rounded-lg text-sm">
                    continuous List
                  </button>
                </div>
              )}
              {showTaskDetails ? (
                <div className="p-4 space-y-4">
                  <h2>Task Details</h2>
                  <p>{currentTaskDetails}</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleBackToTasks}
                  >
                    Back to Task List
                  </button>
                </div>
              ) : (
                tasksToDisplay.length > 0 && !showTaskForm && (
                  <div className="p-4 space-y-4">
                    {tasksToDisplay.map((task, index) => (
                      <TaskSummary 
                        key={index} 
                        taskData={task}
                        showContact={showAllTasks}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>

      {selectedContact && (
        <>
          {showTaskForm && (
            <div className="border-t">
              <TaskForm onClose={() => setShowTaskForm(false)} onSubmit={handleTaskSubmit} />
            </div>
          )}

          <div className="border-t">
            <ChatInput onSendMessage={handleSendMessage} onTaskClick={handleTaskClick} />
          </div>
        </>
      )}
    </div>
  );
} 
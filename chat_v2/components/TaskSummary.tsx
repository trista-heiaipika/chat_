import { useState } from 'react';

interface TaskSummaryProps {
  taskData: {
    summary: string;
    details: string;
    contact?: string;
  };
  showContact?: boolean;
  onViewDetails: (details: string) => void;
}

export default function TaskSummary({ taskData, showContact, onViewDetails }: TaskSummaryProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [taskList, setTaskList] = useState<any>([]);

  const handleViewDetails = async (taskId: string) => {
      const details = await getTaskDetails(taskId);
      console.log(typeof details); 
      const result = JSON.parse(details);
      alert(result._id + " " + result.assignee);
      onViewDetails(details);
      setShowDetails(!showDetails);
  };

  const searchTasks = async () => {
    const name = prompt('Enter name to search tasks:');
    const response = await fetch('http://10.4.32.65:4010/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const data = await response.json();
    setTaskList(data);
  };

  

  const getTaskDetails = async (taskid: string) => {
    const response = await fetch(`http://10.4.32.65:4010/task/${taskid}`);
    const data = await response.json();
    return JSON.stringify(data);
  };

  return (
    <div className="border-2 border-purple-400 rounded-lg p-3 bg-white">
      <div className="space-y-3">
        {showContact && taskData.contact && (
          <div className="bg-white rounded">
            <p className="text-gray-600 text-sm">Contact: {taskData.contact}</p>
          </div>
        )}
        <div className="bg-white rounded">
          <p className="text-gray-600 text-sm">Task Summary</p>
          <p className="text-sm">{taskData.summary}</p>
        </div>
        
        <div className="bg-white rounded">
          <button 
            onClick={handleViewDetails}
            className="text-blue-500 underline"
          >
            {showDetails ? 'Hide Task Details' : 'View Task Details'}
          </button>
        </div>

        <div className="bg-white rounded">
          <button 
            onClick={searchTasks}
            className="text-blue-500 underline"
          >
            Search Tasks1
          </button>
          {taskList && taskList.map((task:any, index:number) => (
            <div key={index}>
              <p onClick={() => handleViewDetails(task._id)}>{task._id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
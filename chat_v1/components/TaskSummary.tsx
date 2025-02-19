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

  const handleViewDetails = () => {
    onViewDetails(taskData.details);
    setShowDetails(!showDetails);
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
      </div>
    </div>
  );
} 
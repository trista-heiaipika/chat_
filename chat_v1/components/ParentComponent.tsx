import { useState } from 'react';
import TaskSummary from './TaskSummary';

const ParentComponent = () => {
  const [currentTaskDetails, setCurrentTaskDetails] = useState<string | null>(null);

  const handleViewDetails = (details: string) => {
    setCurrentTaskDetails(details); // 更新当前任务详情
  };

  return (
    <div className="flex">
      <div className="left-panel">
        {/* 假设这里是任务列表 */}
        <TaskSummary 
          taskData={{ summary: 'Task 1', details: 'Details of Task 1' }} 
          onViewDetails={handleViewDetails} 
        />
        {/* 其他任务摘要 */}
      </div>
      <div className="right-panel bg-blue-500">
        {currentTaskDetails ? (
          <div className="task-details">
            <h2>Task Details</h2>
            <p>{currentTaskDetails}</p>
          </div>
        ) : (
          <p>No task selected</p> // 没有选择任务时的提示
        )}
      </div>
    </div>
  );
};

export default ParentComponent; 
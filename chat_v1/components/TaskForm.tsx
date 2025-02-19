import React, { useState } from 'react';

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (taskData: any) => void;
}

export default function TaskForm({ onClose, onSubmit }: TaskFormProps) {
  const [taskData, setTaskData] = useState({
    initiator: '',
    assignee: '',
    relatedPeople: '',
    relatedDocument: '',
    weight: '',
    deadline: '',
    description: '',
    urgency: '',
    taskType: '',
    parentTask: '',
    childTasks: '',
    relatedTasks: ''
  });

  const handleSubmit = () => {
    onSubmit(taskData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setTaskData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 bg-pink-50">
      <div className="space-y-4 text-gray-600">
        <div className="flex items-center">
          <label className="w-32 text-sm">Initiator:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.initiator}
            onChange={(e) => handleChange('initiator', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">Assignee:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.assignee}
            onChange={(e) => handleChange('assignee', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">Related People:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.relatedPeople}
            onChange={(e) => handleChange('relatedPeople', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">related document:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.relatedDocument}
            onChange={(e) => handleChange('relatedDocument', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">weight:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">deadline:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">description:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">urgency:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.urgency}
            onChange={(e) => handleChange('urgency', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">task type:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.taskType}
            onChange={(e) => handleChange('taskType', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">Parent Task:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.parentTask}
            onChange={(e) => handleChange('parentTask', e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-32 text-sm">Child Tasks:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.childTasks}
            onChange={(e) => handleChange('childTasks', e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 text-sm">Relate Tasks:</label>
          <input 
            type="text" 
            className="w-1/3 bg-transparent outline-none text-sm border-b border-gray-300"
            value={taskData.relatedTasks}
            onChange={(e) => handleChange('relatedTasks', e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-4 space-x-4">
        <button 
          className="px-6 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          className="px-6 py-1 bg-pink-100 text-gray-600 rounded-lg text-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
} 
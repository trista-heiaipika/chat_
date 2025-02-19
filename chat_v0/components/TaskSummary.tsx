interface TaskSummaryProps {
  taskData: {
    summary: string;
    link: string;
    contact?: string;
  };
  showContact?: boolean;
}

export default function TaskSummary({ taskData, showContact }: TaskSummaryProps) {
  return (
    <div className="border-2 border-purple-400 rounded-lg p-3 bg-white">
      <div className="space-y-3">
        {showContact && taskData.contact && (
          <div className="bg-white rounded">
            <p className="text-gray-600 text-sm">Contact: {taskData.contact}</p>
          </div>
        )}
        <div className="bg-white rounded">
          <p className="text-gray-600 text-sm">task summary</p>
          <p className="text-sm">{taskData.summary}</p>
        </div>
        
        <div className="bg-white rounded">
          <p className="text-gray-600 text-sm break-all">
            task link: {taskData.link}
          </p>
        </div>
      </div>
    </div>
  );
} 
interface RightPanelProps {
  className?: string;
  onMenuItemClick: (item: string) => void;
}

export default function RightPanel({ className, onMenuItemClick }: RightPanelProps) {
  const menuItems = [
    'taskList',
    'continuousList',
    'Notification',
    'Daily Summary',
    'ToDo List',
    'Monitor',
    'Resource Pool',
    'translation',
    'meeeting assistant'
  ];

  return (
    <aside className={className}>
      <div className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className="w-full text-left p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100"
              onClick={() => onMenuItemClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
} 
interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const menuItems = [
    'Tom',
    'MotionG(VE)',
    'Group',
    'Metaverse'
  ];

  return (
    <aside className={className}>
      <div className="p-4">
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search"
            className="w-full p-2 rounded-lg border bg-background"
          />
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
} 
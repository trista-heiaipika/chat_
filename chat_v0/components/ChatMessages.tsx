interface Message {
  role: 'user' | 'assistant';
  content: string;
  files?: File[];
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block max-w-[80%] p-3 rounded-2xl ${
            message.role === 'user' 
              ? 'bg-purple-100 text-purple-900' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
} 
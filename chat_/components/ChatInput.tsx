'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  onTaskClick: () => void;
}

export default function ChatInput({ onSendMessage, onTaskClick }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      onSendMessage(message, files);
      setMessage('');
      setFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 rounded-full bg-purple-50 px-4 py-2 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="rounded-full w-8 h-8 bg-purple-50 flex items-center justify-center">
          +
        </button>
        <button 
          className="rounded-full px-6 py-2 bg-purple-50"
          onClick={() => {
            if (message.trim()) {
              onSendMessage(message);
              setMessage('');
            }
          }}
        >
          send
        </button>
      </div>

      <div className="flex gap-2">
        <button className="rounded-full px-4 py-2 bg-purple-50">voice</button>
        <button className="rounded-full px-4 py-2 bg-purple-50">video</button>
        <button className="rounded-full px-4 py-2 bg-purple-50">upload</button>
        <button 
          className="rounded-full px-4 py-2 bg-green-100 text-green-600"
          onClick={onTaskClick}
        >
          task
        </button>
        <button className="rounded-full px-4 py-2 bg-green-100 text-green-600">
          summary
        </button>
      </div>
    </div>
  );
} 
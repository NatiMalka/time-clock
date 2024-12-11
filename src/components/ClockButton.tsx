import React from 'react';
import { Timer } from 'lucide-react';

interface ClockButtonProps {
  type: 'in' | 'out';
  onClick: () => void;
}

export function ClockButton({ type, onClick }: ClockButtonProps) {
  const bgColor = type === 'in' ? 'bg-indigo-600' : 'bg-rose-600';
  const hoverColor = type === 'in' ? 'hover:bg-indigo-700' : 'hover:bg-rose-700';

  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${hoverColor} relative w-48 h-48 rounded-full flex flex-col items-center justify-center text-white transition-colors duration-200 shadow-lg`}
    >
      <Timer className="w-12 h-12 mb-2" />
      <span className="text-xl font-semibold">Clock {type.toUpperCase()}</span>
    </button>
  );
}
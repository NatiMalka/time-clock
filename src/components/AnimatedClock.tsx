import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnimatedClock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');
  const hours = formatTimeUnit(time.getHours());
  const minutes = formatTimeUnit(time.getMinutes());
  const seconds = formatTimeUnit(time.getSeconds());

  const digits = [hours, minutes, seconds];

  return (
    <div className="bg-white px-3 py-2 rounded-xl shadow-sm">
      <div className="flex items-center justify-center text-4xl font-mono">
        {digits.map((unit, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={unit}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-indigo-600 font-bold"
                >
                  {unit}
                </motion.span>
              </AnimatePresence>
            </div>
            {i < 2 && (
              <span className="mx-1 text-indigo-600 animate-pulse">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 
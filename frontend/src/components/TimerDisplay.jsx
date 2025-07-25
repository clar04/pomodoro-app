import React from 'react';
import { usePomodoro } from '../context/PomodoroContext';
import { formatTime } from '../utils/timeFormatter';

function TimerDisplay() {
  // Destructure relevant state from the Pomodoro context
  const { timeLeft, isWorkSession } = usePomodoro();

  // Determine the color based on the session type
  // Using light-coral for work and murrey for break to fit the new theme
  const textColorClass = isWorkSession ? 'text-light-coral' : 'text-murrey';

  return (
    <div className="text-center mb-8">
      {/* Display the current session type */}
      <p className="text-2xl font-semibold mb-2 text-gray-300">
        {isWorkSession ? 'Work Session' : 'Break Session'}
      </p>
      {/* Display the formatted time left */}
      <h2 className={`text-8xl font-extrabold ${textColorClass} transition-colors duration-300`}>
        {formatTime(timeLeft)}
      </h2>
    </div>
  );
}

export default TimerDisplay;

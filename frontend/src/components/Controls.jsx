import React from 'react';
import { usePomodoro } from '../context/PomodoroContext';
import { Settings } from 'lucide-react'; 

function Controls() {
  const { timerRunning, startTimer, pauseTimer, resetTimer, openSettings } = usePomodoro();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {/* Start Button */}
        <button
          onClick={startTimer}
          disabled={timerRunning} 
          className="px-8 py-4 bg-gradient-to-r from-murrey to-light-coral text-white text-xl font-bold rounded-full shadow-lg hover:from-light-coral hover:to-murrey transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start
        </button>

        {/* Pause Button */}
        <button
          onClick={pauseTimer}
          disabled={!timerRunning} // Disable if timer is not running
          className="px-8 py-4 bg-gradient-to-r from-murrey to-light-coral text-white text-xl font-bold rounded-full shadow-lg hover:from-light-coral hover:to-murrey transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pause
        </button>

        {/* Reset Button */}
        <button
          onClick={resetTimer}
          className="px-8 py-4 bg-gradient-to-r from-murrey to-light-coral text-white text-xl font-bold rounded-full shadow-lg hover:from-light-coral hover:to-murrey transition-all duration-300 transform hover:scale-105"
        >
          Reset
        </button>
      </div>

      {/* Settings Button */}
      <button
        onClick={openSettings}
        className="mt-6 p-3 bg-gray-700 text-light-coral rounded-full shadow-md hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
        aria-label="Open settings"
      >
        <Settings className="w-6 h-6" /> {/* Lucide-react settings icon */}
      </button>
    </div>
  );
}

export default Controls;

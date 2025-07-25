import React, { useState, useEffect } from 'react';
import { usePomodoro } from '../context/PomodoroContext';
import { X } from 'lucide-react'; // Using lucide-react for the close icon

function SettingsModal() {
  // Destructure state and functions from Pomodoro context
  const {
    showSettings,
    closeSettings,
    updateDurations,
    workDuration,
    breakDuration,
    longBreakDuration,
    sessionsBeforeLongBreak,
  } = usePomodoro();

  // Local state for input fields, initialized with current context values
  const [localWorkDuration, setLocalWorkDuration] = useState(workDuration / 60);
  const [localBreakDuration, setLocalBreakDuration] = useState(breakDuration / 60);
  const [localLongBreakDuration, setLocalLongBreakDuration] = useState(longBreakDuration / 60);
  const [localSessionsBeforeLongBreak, setLocalSessionsBeforeLongBreak] = useState(sessionsBeforeLongBreak);

  // Update local state when context values change (e.g., on initial load or reset)
  useEffect(() => {
    setLocalWorkDuration(workDuration / 60);
    setLocalBreakDuration(breakDuration / 60);
    setLocalLongBreakDuration(longBreakDuration / 60);
    setLocalSessionsBeforeLongBreak(sessionsBeforeLongBreak);
  }, [workDuration, breakDuration, longBreakDuration, sessionsBeforeLongBreak]);

  // Handle saving the settings
  const handleSave = () => {
    // Pass the new values (converted to minutes) to the context's update function
    updateDurations(
      localWorkDuration,
      localBreakDuration,
      localLongBreakDuration,
      localSessionsBeforeLongBreak
    );
    closeSettings(); // Close the modal after saving
  };

  // If settings modal is not visible, don't render anything
  if (!showSettings) return null;

  return (
    // Modal overlay for background dimming and click-to-close
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={closeSettings} // Close modal when clicking outside
    >
      {/* Modal content area, stops propagation to prevent closing when clicking inside */}
      <div
        className="bg-gray-900 rounded-2xl p-8 shadow-2xl w-full max-w-md relative transform transition-all duration-300 scale-100 opacity-100 border border-murrey text-gray-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close button */}
        <button
          onClick={closeSettings}
          className="absolute top-4 right-4 text-gray-400 hover:text-light-coral transition-colors"
          aria-label="Close settings"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-light-coral mb-6 text-center">Settings</h2>

        <div className="space-y-6">
          {/* Work Duration Input */}
          <div>
            <label htmlFor="workDuration" className="block text-lg font-medium text-gray-300 mb-2">
              Work Duration (minutes)
            </label>
            <input
              type="number"
              id="workDuration"
              value={localWorkDuration}
              onChange={(e) => setLocalWorkDuration(e.target.value)}
              min="1"
              className="w-full p-3 border border-murrey bg-gray-800 rounded-lg focus:ring-2 focus:ring-light-coral focus:border-light-coral transition-all duration-200 text-lg text-white"
            />
          </div>

          {/* Break Duration Input */}
          <div>
            <label htmlFor="breakDuration" className="block text-lg font-medium text-gray-300 mb-2">
              Break Duration (minutes)
            </label>
            <input
              type="number"
              id="breakDuration"
              value={localBreakDuration}
              onChange={(e) => setLocalBreakDuration(e.target.value)}
              min="1"
              className="w-full p-3 border border-murrey bg-gray-800 rounded-lg focus:ring-2 focus:ring-light-coral focus:border-light-coral transition-all duration-200 text-lg text-white"
            />
          </div>

          {/* Long Break Duration Input */}
          <div>
            <label htmlFor="longBreakDuration" className="block text-lg font-medium text-gray-300 mb-2">
              Long Break Duration (minutes)
            </label>
            <input
              type="number"
              id="longBreakDuration"
              value={localLongBreakDuration}
              onChange={(e) => setLocalLongBreakDuration(e.target.value)}
              min="1"
              className="w-full p-3 border border-murrey bg-gray-800 rounded-lg focus:ring-2 focus:ring-light-coral focus:border-light-coral transition-all duration-200 text-lg text-white"
            />
          </div>

          {/* Sessions Before Long Break Input */}
          <div>
            <label htmlFor="sessionsBeforeLongBreak" className="block text-lg font-medium text-gray-300 mb-2">
              Sessions Before Long Break
            </label>
            <input
              type="number"
              id="sessionsBeforeLongBreak"
              value={localSessionsBeforeLongBreak}
              onChange={(e) => setLocalSessionsBeforeLongBreak(e.target.value)}
              min="1"
              className="w-full p-3 border border-murrey bg-gray-800 rounded-lg focus:ring-2 focus:ring-light-coral focus:border-light-coral transition-all duration-200 text-lg text-white"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-murrey to-light-coral text-white text-xl font-bold rounded-full shadow-lg hover:from-light-coral hover:to-murrey transition-all duration-300 transform hover:scale-105"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;

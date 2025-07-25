import React from 'react';
import { PomodoroProvider } from './context/PomodoroContext';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ContributionGraph from './components/ContributionGraph';
import SettingsModal from './components/SettingsModal';

function App() {
  return (
    <PomodoroProvider>
      <div className="min-h-screen bg-black-wash flex flex-col items-center justify-center p-4 font-inter text-gray-200">
        <div className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border border-murrey">
          <h1 className="text-4xl font-extrabold text-center text-light-coral mb-8 tracking-tight">
            Pomodoro Timer
          </h1>
          <TimerDisplay />
          <Controls />
        </div>

        <div className="mt-12 bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border border-murrey">
          <h2 className="text-3xl font-bold text-center text-light-coral mb-6">
            Daily Sessions
          </h2>
          <ContributionGraph />
        </div>
        <SettingsModal />
      </div>
    </PomodoroProvider>
  );
}

export default App;

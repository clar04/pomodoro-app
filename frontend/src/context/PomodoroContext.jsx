import React, { createContext, useState, useEffect, useRef, useContext, useCallback } from 'react';
import { fetchSessions, logSession as apiLogSession } from '../api/pomodoroApi'; 
export const PomodoroContext = createContext();

// Pomodoro Provider Component
export const PomodoroProvider = ({ children }) => {
  // State for timer settings and status
  const [workDuration, setWorkDuration] = useState(25 * 60); 
  const [breakDuration, setBreakDuration] = useState(5 * 60);  
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60); 
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4); 

  const [timeLeft, setTimeLeft] = useState(workDuration); // Remaining time on the timer
  const [timerRunning, setTimerRunning] = useState(false); 
  const [isWorkSession, setIsWorkSession] = useState(true); 
  const [showSettings, setShowSettings] = useState(false); 

  // State for tracking completed sessions for the heatmap
  const [allSessions, setAllSessions] = useState([]); 
  const timerRef = useRef(null);

  // --- API Interaction ---

  // Function to load sessions from the backend
  const loadSessions = useCallback(async () => {
    try {
      const data = await fetchSessions();
      setAllSessions(data);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  }, []);

  // Function to log a completed session to the backend
  const logSession = useCallback(async (type, duration) => {
    try {
      const newSession = await apiLogSession({
        session_type: type,
        duration: duration,
        completed_at: new Date().toISOString(), 
      });
      // Add the newly logged session to the existing sessions state
      setAllSessions(prevSessions => [...prevSessions, newSession]);
    } catch (error) {
      console.error('Failed to log session:', error);
    }
  }, []);

  // --- Timer Logic ---

  // Effect to handle the timer countdown
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Update every second
    } else if (timeLeft === 0) {
      // Timer has reached zero, stop it
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimerRunning(false);

      // Log the completed session
      logSession(isWorkSession ? 'work' : 'break', isWorkSession ? workDuration : breakDuration);

      // Switch to the next session type
      if (isWorkSession) {
        // If work session completed, check for long break
        if ((allSessions.filter(s => s.session_type === 'work').length + 1) % sessionsBeforeLongBreak === 0) {
          setIsWorkSession(false);
          setTimeLeft(longBreakDuration);
          console.log('Long break started!');
        } else {
          setIsWorkSession(false);
          setTimeLeft(breakDuration);
          console.log('Break started!');
        }
      } else {
        // If break session completed, switch back to work
        setIsWorkSession(true);
        setTimeLeft(workDuration);
        console.log('Work session started!');
      }

      // Automatically start the next session
      setTimerRunning(true);
    }

    // Cleanup function: Clear the interval when the component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRunning, timeLeft, isWorkSession, workDuration, breakDuration, longBreakDuration, sessionsBeforeLongBreak, allSessions, logSession]);

  // Effect to load sessions when the component mounts
  useEffect(() => {
    loadSessions();
  }, [loadSessions]); // Dependency array ensures it runs only on mount

  // --- Timer Control Functions ---

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
    }
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    pauseTimer(); // Stop the timer first
    setIsWorkSession(true); // Reset to work session
    setTimeLeft(workDuration); // Reset time to work duration
  };

  // --- Settings Functions ---

  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  // Function to update durations from settings modal
  const updateDurations = (newWork, newBreak, newLongBreak, newSessionsBeforeLongBreak) => {
    // Ensure new durations are positive integers
    const parsedWork = parseInt(newWork, 10) * 60;
    const parsedBreak = parseInt(newBreak, 10) * 60;
    const parsedLongBreak = parseInt(newLongBreak, 10) * 60;
    const parsedSessions = parseInt(newSessionsBeforeLongBreak, 10);

    if (parsedWork > 0) setWorkDuration(parsedWork);
    if (parsedBreak > 0) setBreakDuration(parsedBreak);
    if (parsedLongBreak > 0) setLongBreakDuration(parsedLongBreak);
    if (parsedSessions > 0) setSessionsBeforeLongBreak(parsedSessions);
    
    if (!timerRunning && isWorkSession) {
      setTimeLeft(parsedWork > 0 ? parsedWork : workDuration);
    } else if (!timerRunning && !isWorkSession) {
      setTimeLeft(parsedBreak > 0 ? parsedBreak : breakDuration);
    }
  };


  // Provide all state and functions to consumers of the context
  const contextValue = {
    timeLeft,
    timerRunning,
    isWorkSession,
    workDuration,
    breakDuration,
    longBreakDuration,
    sessionsBeforeLongBreak,
    allSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    showSettings,
    openSettings,
    closeSettings,
    updateDurations,
  };

  return (
    <PomodoroContext.Provider value={contextValue}>
      {children}
    </PomodoroContext.Provider>
  );
};

// Custom hook for easily consuming the context
export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};

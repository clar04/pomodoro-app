const API_BASE_URL = 'http://127.0.0.1:8000'; // to do:change to backend URL

/**
 * @returns {Promise<Array>} 
 */
export const fetchSessions = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/pomodoro/sessions`);
        if (!response.ok) {
            // If response is not OK (e.g., 404, 500), throw an error
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }
        const data = await response.json();
        return data.map(session => ({
            ...session,
            completed_at: new Date(session.completed_at),
        }));
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error; // Re-throw to be handled by the calling component/context
    }
};

/**
 * Logs a new Pomodoro session to the backend.
 * @param {Object} sessionData - The session data to log (e.g., { session_type: 'work', duration: 1500, completed_at: 'ISOString' }).
 * @returns {Promise<Object>}
 */
export const logSession = async (sessionData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pomodoro/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', // Request JSON response
            },
            body: JSON.stringify(sessionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return {
            ...data,
            completed_at: new Date(data.completed_at),
        };
    } catch (error) {
        console.error('Error logging session:', error);
        throw error;
    }
};

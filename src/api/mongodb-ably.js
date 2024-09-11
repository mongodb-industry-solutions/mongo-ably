const API_BASE_URL = 'http://localhost:3001/api';

export const getAllMessages = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/mongo-test`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getAllMessagesUpdates = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/updates`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

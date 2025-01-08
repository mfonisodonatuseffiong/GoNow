// src/api.js
const API_URL = 'http://localhost:5000/api';

export const searchFlights = async (userId, searchResults) => {
  const response = await fetch(`${API_URL}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, searchResults }),
  });
  return response.json();
};

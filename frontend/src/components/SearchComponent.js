import React, { useState } from 'react';
import { searchFlights } from './api';  // Adjust path as necessary

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const userId = 1;  // Replace with actual user ID

  const handleSearch = async () => {
    const response = await fetch('http://localhost:5000/api/flights-api/real-time-flights?origin=JFK&destination=LAX&departureDate=2025-07-01');
    const data = await response.json();
    setSearchResults(data);

    await searchFlights(userId, data);  // Store search results
  };

  return (
    <div>
      <button onClick={handleSearch}>Search Flights</button>
      {searchResults.length > 0 && <pre>{JSON.stringify(searchResults, null, 2)}</pre>}
    </div>
  );
};

export default SearchComponent;

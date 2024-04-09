import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    // Add other fields as necessary
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/events`, eventData);
    // Handle success (e.g., clearing the form, showing a message)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={eventData.name} onChange={e => setEventData({...eventData, name: e.target.value})} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={eventData.description} onChange={e => setEventData({...eventData, description: e.target.value})}></textarea>
      </div>
      {/* Add inputs for other fields */}
      <button type="submit">Add Event</button>
    </form>
  );
};

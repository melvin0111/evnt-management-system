// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../section/DashboardSection.css';
// import Modal from '../modal/Modal';

// function DashboardSection() {
//   const [events, setEvents] = useState([]);
//   const [showCreateEventModal, setShowCreateEventModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Call this function to fetch events from the backend when the component mounts
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       // This should be replaced with your actual backend API endpoint
//       const response = await fetch('http://localhost:3004/api/events');
//       const data = await response.json();
//       setEvents(data); // Update the events state with fetched data
//     } catch (error) {
//       console.error('Failed to fetch events:', error);
//     }
//   };

//   const handleCreateEventSubmit = async (eventData) => {
//     try {
//       const response = await fetch('http://localhost:3004/api/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventData),
//       });

//       if (response.ok) {
//         setShowCreateEventModal(false); // Close the modal
//         fetchEvents(); // Re-fetch events to update the list
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to create event:', errorData.message);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   };

//   return (
//     <div className='events-table-container'>
//       <h1>Hello User!</h1>
//       <button onClick={() => setShowCreateEventModal(true)}>Create Event</button>
//       {showCreateEventModal && (
//         <Modal show={showCreateEventModal} onClose={() => setShowCreateEventModal(false)}>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             const newEvent = {
//               name: formData.get('name'),
//               start_date: formData.get('start_date'),
//               end_date: formData.get('end_date'),
//               location: formData.get('location'),
//             };
//             handleCreateEventSubmit(newEvent);
//           }}>
//             {/* Form fields and submit button */}
//           </form>
//         </Modal>
//       )}

//       <table className='events-table'>
//         {/* Table headers */}
//         <tbody>
//           {events.map((event) => (
//             <tr key={event.id}>
//               <td>{event.name}</td>
//               <td>{event.start_date}</td>
//               <td>{event.end_date}</td>
//               <td>{event.location}</td>
//               {/* Other table cells for event details */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default DashboardSection;

// Example React component for creating an event
import React, { useState } from 'react';

function CreateEventForm({ onEventCreated }) {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    capacity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have a function to call your API
    const createdEvent = await createEvent(eventData);
    if (createdEvent) {
      onEventCreated(createdEvent);
      setEventData({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        capacity: ''
      });
    } else {
      // Handle the error case
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={eventData.name}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Event Description"
        value={eventData.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="start_date"
        placeholder="Start Date"
        value={eventData.start_date}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="end_date"
        placeholder="End Date"
        value={eventData.end_date}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={eventData.location}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={eventData.capacity}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEventForm;

// Helper function to POST the event creation form data to your back-end
async function createEvent(eventData) {
  try {
    const response = await fetch('http://localhost:3004/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include your auth token in the request if needed
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

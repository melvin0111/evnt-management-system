
import React, { useState } from 'react';
import '../section/DashboardSection.css'

function DashboardSection() {

    //modals
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState({ city: '', state: '' });
    const [capacity, setCapacity] = useState('');

// Storing Data
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const eventData = {
            name,
            description,
            start_date: startDate,
            end_date: endDate,
            location,
            capacity: parseInt(capacity),
        };

        try {
            const response = await fetch('http://localhost:3004/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify(eventData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Event Created:', data);
                // Handle success - maybe clear the form or show a success message
            } else {
                console.error('Failed to create event:', data.message);
                // Handle errors - show error message to user
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
        }
    };
// Demonstrating Data into Tables
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const eventData = {
            name,
            description,
            start_date: startDate,
            end_date: endDate,
            location,
            capacity: parseInt(capacity),
        };
        try {
          const response = await fetch('http://localhost:3004/api/events', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(eventData),
          });
          const data = await response.json();
          if (response.ok) {
            setEvents(data); // Set your events here
          } else {
            console.error('Failed to fetch events:', data);
            // Handle failure - show error message, etc.
          }
        } catch (error) {
          console.error('Network error:', error);
          // Handle network error
        }
      };

    return (
        <div>
            <div>
            <form onSubmit={handleSubmit}>
                <h2>Hello, user!</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
                <input type="text" value={location.city} onChange={(e) => setLocation({ ...location, city: e.target.value })} placeholder="City" />
                <input type="text" value={location.state} onChange={(e) => setLocation({ ...location, state: e.target.value })} placeholder="State" />
                <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
                <button type="submit">Create Event</button>
            </form>
            </div>
            <div>
                <table className="events-table">
                        <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Location</th>
                            <th>Capacity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                            <td>{`${event.location.city}, ${event.location.state}`}</td>
                            <td>{event.capacity}</td>
                            </tr>
                        ))}
                        </tbody>
        </table>

            </div>
        </div>

    );
}

export default DashboardSection; 

// ---------------------------------------------------------------------

// import React, { useState } from 'react';
// import '../modal/Modal.css';
// import Modal from '../modal/Modal';

// function DashboardSection() {

//     //Modals
//     const [showCreateEventModal, setShowCreateEventModal] = useState(false);

//     const handleOpenModal = () => {
//         setShowCreateEventModal(true);
//       };
    
//       const handleCloseModal = () => {
//         setShowCreateEventModal(false);
//       };

// //Event State Form
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [location, setLocation] = useState({ city: '', state: '' });
//     const [capacity, setCapacity] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const token = localStorage.getItem('token'); // Retrieve the token from localStorage
//         const eventData = {
//             name,
//             description,
//             start_date: startDate,
//             end_date: endDate,
//             location,
//             capacity: parseInt(capacity),
//         };

//         try {
//             const response = await fetch('http://localhost:3004/api/event', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//                 },
//                 body: JSON.stringify(eventData),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 console.log('Event Created:', data);
//                 handleCloseModal();
//                 // Handle success - maybe clear the form or show a success message
//             } else {
//                 console.error('Failed to create event:', data.message);
//                 // Handle errors - show error message to user
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle network error
//         }
//     };

//     return (
//         <div>
//           <h1>Hello User!</h1>
    
//           {/* Create Event Modal */}
//             <form onSubmit={handleSubmit}>
//               <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" />
//               <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" />
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
//               <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
//               <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
//               <button type="submit">Create Event</button>
//             </form>
        
    
//         </div>
//       );
//     }

// export default DashboardSection; 
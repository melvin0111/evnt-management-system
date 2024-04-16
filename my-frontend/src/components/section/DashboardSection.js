
// import React, { useState, useEffect } from 'react';
// import '../section/DashboardSection.css'

// function DashboardSection() {

//     //modals
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [location, setLocation] = useState({ city: '', state: '' });
//     const [capacity, setCapacity] = useState('');
    

// // Storing Data
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
// // Demonstrating Data into Tables ----------------------------still working -----------------------
// // const [events, setEvents] = useState([]);
// const [eventList, setEvents] = useState([]);



// // Correctly setting up fetchEvents to use GET method
// const fetchEvents = async () => {
//     try {
//       const response = await fetch('http://localhost:3004/api/event', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//     //   const data = await response.json();
//     //   if (response.ok) {
//     //     setEvents(data); // Set your events here
//     //   } else {
//     //     console.error('Failed to fetch events:', data.message);
//     //     // Handle failure - show error message, etc.
//     //   }
//     // } catch (error) {
//     //   console.error('Network error:', error);
//     //   // Handle network error
//     // }
//         const data = await response.json();
//         if (response.ok) {
//             if (Array.isArray(data)) { // Check if the data is an array
//             setEvents(data);
//             } else {
//             console.error('Data received is not an array:', data);
//             setEvents([]); // Set to empty array if data is not an array
//             }
//         } else {
//             console.error('Failed to fetch events:', data.message);
//         }
//         } catch (error) {
//         console.error('Network error:', error);
//         }
// };

// // useEffect to call fetchEvents when the component mounts
//     useEffect(() => {
//         fetchEvents();
//     }, []);
//       //----------------------------------------------------------------------------------------

//     return (
//         <div>
//             <div>
//             <form onSubmit={handleSubmit}>
//                 <h2>Hello, user!</h2>
//                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" />
//                 <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" />
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
//                 <input type="text" value={location.city} onChange={(e) => setLocation({ ...location, city: e.target.value })} placeholder="City" />
//                 <input type="text" value={location.state} onChange={(e) => setLocation({ ...location, state: e.target.value })} placeholder="State" />
//                 <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
//                 <button type="submit">Create Event</button>
//             </form>
//             </div>
//                     <div className="events-table-container">
//                     <h1>Events Dashboard</h1>
//                     <table className="events-table">
//                         <thead>
//                             <tr>
//                                 <th>Event Name</th>
//                                 <th>Description</th>
//                                 <th>Start Date</th>
//                                 <th>End Date</th>
//                                 <th>Location</th>
//                                 <th>Capacity</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {eventList.map((event) => (
//                                 <tr key={event.id}>
//                                     <td>{event.name}</td>
//                                     <td>{event.description}</td>
//                                     <td>{event.start_date}</td>
//                                     <td>{event.end_date}</td>
//                                     <td>{event.location.city + ', ' + event.location.state}</td>
//                                     <td>{event.capacity}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//     );
// }

// export default DashboardSection; 

//-------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import '../section/DashboardSection.css';

function DashboardSection() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState({ city: '', state: '' });
    const [capacity, setCapacity] = useState('');
    const [eventList, setEvents] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
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
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Event Created:', data);
                addEvent(data);  // Add the new event directly to the event list
            } else {
                console.error('Failed to create event:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addEvent = (newEvent) => {
        setEvents([...eventList, newEvent]);  // Adds the new event to the existing list
    };

    // Fetch events initially and on dependency change
    useEffect(() => {
        fetchEvents();
    }, []);  // Dependency array is empty to run only once after component mounts

    const fetchEvents = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3004/api/event', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log("Fetched data:", data);  // Log the data to see what you are receiving
            if (response.ok && Array.isArray(data)) {
                setEvents(data);  // Only set to state if it is an array
            } else {
                console.error('Data received is not an array or response not ok:', data);
                setEvents([]); // Default to an empty array if there's any issue
            }
        } catch (error) {
            console.error('Network error:', error);
            setEvents([]); // Default to an empty array if there's a network error
        }
    };
    

    return (
        <div className="events-table-container">
            <form onSubmit={handleSubmit}>
                <h2>Create New Event</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
                <input type="text" value={location.city} onChange={(e) => setLocation({ ...location, city: e.target.value })} placeholder="City" />
                <input type="text" value={location.state} onChange={(e) => setLocation({ ...location, state: e.target.value })} placeholder="State" />
                <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
                <button type="submit">Create Event</button>
            </form>
            <h1>Events Dashboard</h1>
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
                    {eventList.map((event) => (
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
    );
}

export default DashboardSection;

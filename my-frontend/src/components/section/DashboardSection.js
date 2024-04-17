
import React, { useState, useEffect } from 'react';
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
// Demonstrating Data into Tables ----------------------------still working -----------------------
// const [events, setEvents] = useState([]);
const [eventList, setEvents] = useState([]);

// Correctly setting up fetchEvents to use GET method
    const fetchEvents = async () => {
        try {
        const response = await fetch('http://localhost:3004/api/event', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const responseObject = await response.json(); // This is the response object
        if (response.ok) {
            const eventData = responseObject.data; // Access the data property that contains the array
            if (Array.isArray(eventData)) {
                const parsedEvents = eventData.map(event => ({
                    ...event,
                    // Check if location is a string and a valid JSON before parsing
                    location: typeof event.location === 'string' ? JSON.parse(event.location) : event.location,
                    start_date: new Date(event.start_date).toLocaleDateString(), // Format date
                    end_date: new Date(event.end_date).toLocaleDateString(), // Format date
                }));
                setEvents(parsedEvents);
            } else {
                console.error('Data property received is not an array:', eventData);
            }
        } else {
            console.error('Failed to fetch events:', responseObject.message);
        }
    } catch (error) {
        console.error('Error when fetching events:', error);
    }
};

        useEffect(() => {
            fetchEvents();
        }, []);

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
                    <div className="events-table-container">
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
                        <td>{event.location.city + ', ' + event.location.state}</td>
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

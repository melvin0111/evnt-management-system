import React, { useState, useEffect } from 'react';
import './TicketForm.css'; // Ensure this is the correct path to your CSS file

function TicketForm() {
    const [events, setEvents] = useState([]);
    const [tickets, setTickets] = useState({});

    useEffect(() => {
        fetchEventsAndTickets();
    }, []);

    const fetchEventsAndTickets = async () => {
        const token = localStorage.getItem('token');
        try {
            const eventResponse = await fetch('http://localhost:3004/api/event', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (eventResponse.ok) {
                const eventData = await eventResponse.json();
                setEvents(eventData.data);
                eventData.data.forEach(event => {
                    fetchTicketsForEvent(event.id, token);
                });
            } else {
                console.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchTicketsForEvent = async (eventId, token) => {
        try {
            const ticketResponse = await fetch(`http://localhost:3004/api/event/${eventId}/ticket`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (ticketResponse.ok) {
                const ticketData = await ticketResponse.json();
                setTickets(prevTickets => ({
                    ...prevTickets,
                    [eventId]: ticketData.data
                }));
            } else {
                console.error(`Failed to fetch tickets for event ${eventId}`);
            }
        } catch (error) {
            console.error(`Error fetching tickets for event ${eventId}:`, error);
        }
    };

    return (
        <div className="tickets-table-container">
            <h1>Tickets Overview</h1>
            {events.map(event => (
                <div key={event.id}>
                    <h3>{event.name} - Tickets</h3>
                    <table className="tickets-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets[event.id]?.map(ticket => (
                                <tr key={ticket.ticketId}>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.ticket_type}</td>
                                    <td>{ticket.quantity}</td>
                                    <td>${ticket.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default TicketForm;
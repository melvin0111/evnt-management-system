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
        //---------------------------------------------------- DELETE TICKETS ----------------------------------
        const deleteTicket = async (id) => {
            if (!id) {
                console.error('Ticket ID is undefined');
                return;  // Prevent making a request with an undefined ticket ID
            }
            console.log('Deleting ticket with ID:', id); // This should log a defined ticket ID, not undefined
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            try {
                const response = await fetch(`http://localhost:3004/api/event/ticket/${id}`, {
                    method: 'DELETE', // Specify the method to be DELETE
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                if (response.ok) {
                    // Successfully deleted the ticket
                    console.log('Ticket deleted successfully');
                    // Update your tickets state to remove the deleted ticket
                    setTickets(prevTickets => {
                        const updatedTickets = { ...prevTickets };
                        for (const eventId in updatedTickets) {
                            updatedTickets[eventId] = updatedTickets[eventId].filter(ticket => ticket.id !== id);
                        }
                        return updatedTickets;
                    });
                } else {
                    const errorData = await response.json();
                    console.error('Failed to delete the ticket:', errorData.message);
                    // Optionally, show an error message to the user
                }
            } catch (error) {
                console.error('Error deleting the ticket:', error);
                // Optionally, show an error message to the user
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
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets[event.id]?.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.ticket_type}</td>
                                    <td>{ticket.quantity}</td>
                                    <td>${ticket.price}</td>
                                    <td> <button onClick={() => deleteTicket(ticket.id)}>Delete</button></td>
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

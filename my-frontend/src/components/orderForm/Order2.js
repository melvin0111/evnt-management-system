import React, { useState, useEffect } from 'react';

import '../orderForm/Order2.css';

function OrdersPage() {
    const [events, setEvents] = useState([]);
    const [expenses, setExpenses] = useState({});
    const [tickets, setTickets] = useState({});

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
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
                    fetchExpensesForEvent(event.id, token);
                    fetchTicketsForEvent(event.id, token); // Fetch tickets for each event
                });
            } else {
                console.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchExpensesForEvent = async (eventId, token) => {
        try {
            const expenseResponse = await fetch(`http://localhost:3004/api/event/${eventId}/expense`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (expenseResponse.ok) {
                const expenseData = await expenseResponse.json();
                setExpenses(prevExpenses => ({
                    ...prevExpenses,
                    [eventId]: expenseData.data
                }));
            } else {
                console.error(`Failed to fetch expenses for event ${eventId}`);
            }
        } catch (error) {
            console.error(`Error fetching expenses for event ${eventId}:`, error);
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
        <div className="expenses-table-container">
            <h1>Event Financial Overview</h1>
            {events.map(event => (
                <div key={event.id}>
                    <h3>{event.name}</h3>
                    <table className="expenses-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Tickets Sold</th>
                                <th>Total Revenue</th>
                                <th> Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Assuming each event has one expense and one set of tickets */}
                            {expenses[event.id]?.map((expense) => {
                                const ticketInfo = tickets[event.id]?.[0]; // Taking the first set of tickets
                                const revenue = ticketInfo ? ticketInfo.quantity * ticketInfo.price : 0;
                                const profit = revenue - expense.amount; // Calculate profit
                                return (
                                    <tr key={expense.id}>
                                        <td>{expense.description}</td>
                                        <td>${expense.amount.toFixed(2)}</td>
                                        <td>{ticketInfo ? ticketInfo.quantity : '-'}</td>
                                        <td>${ticketInfo ? (ticketInfo.quantity * ticketInfo.price).toFixed(2) : '-'}</td>
                                        <td>${profit.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default OrdersPage;

// import React from 'react';
// import { useNavigate } from 'react-router-dom'
// import '../orderForm/Order2.css'

// // const OrdersPage = () => {
//   function OrdersPage (){
//     // Sample event data
//     const events = [
//       { name1: 'Event 1', location: 'Location 1', ticketCost: 50, managerPayment: 100 },
//       { name1: 'Event 2', location: 'Location 2', ticketCost: 75, managerPayment: 120 },
//       // Add more event data as needed
//     ];
    
//     const navigate = useNavigate(''); 
  
//     const handlePayment = (e) => {
//       e.preventDefault();
//       // For now, we're assuming any login attempt is successful
//       console.log("Entering Payment Page...");
//       // Redirect to a specific route on successful login
//       navigate('/dashboard/Payment'); 
//     }; 
  
//     return (
//       <div className="orders-container">
//       <h1>Orders</h1>
//         {events.map((event, index) => (
//           <div className="event-container" key={index}>
//             <div className="event-details">
//               <h2>{event.name1}</h2>
//               <div></div>
//               <p>Location: {event.location}</p>
//               <p>Ticket Cost: ${event.ticketCost}</p>
//               <p>Manager Payment: ${event.managerPayment}</p>
//               <button onClick={handlePayment} className="payment-button">
//                   Proceed to Payment
//               </button>
//             </div>
//             <div className="total-expenses">
//               <h2>Total Expenses</h2>
//               <h4>${event.ticketCost + event.managerPayment}</h4>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default OrdersPage;

import React, { useState, useEffect } from 'react';
import '../orderForm/Order2.css'; // Ensure you have the appropriate CSS for this component

function OrdersPage() {
    const [events, setEvents] = useState([]);
    const [expenses, setExpenses] = useState({});

    useEffect(() => {
        fetchEventsAndExpenses();
    }, []);

    const fetchEventsAndExpenses = async () => {
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

    return (
        <div className="expenses-table-container">
            <h1>Event Expenses Overview</h1>
            {events.map(event => (
                <div key={event.id}>
                    <h3>{event.name} - Expenses</h3>
                    <table className="expenses-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses[event.id]?.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.description}</td>
                                    <td>${expense.amount.toFixed(2)}</td>
                                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default OrdersPage;


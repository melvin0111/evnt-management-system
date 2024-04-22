// import React, { useState, useEffect } from 'react';
// import '../orderForm/Order2.css'; // Ensure you have the appropriate CSS for this component

// function OrdersPage() {
//     const [events, setEvents] = useState([]);
//     const [expenses, setExpenses] = useState({});

//     useEffect(() => {
//         fetchEventsAndExpenses();
//     }, []);

//     const fetchEventsAndExpenses = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const eventResponse = await fetch('http://localhost:3004/api/event', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (eventResponse.ok) {
//                 const eventData = await eventResponse.json();
//                 setEvents(eventData.data);
//                 eventData.data.forEach(event => {
//                     fetchExpensesForEvent(event.id, token);
//                 });
//             } else {
//                 console.error('Failed to fetch events');
//             }
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     const fetchExpensesForEvent = async (eventId, token) => {
//         try {
//             const expenseResponse = await fetch(`http://localhost:3004/api/event/${eventId}/expense`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             if (expenseResponse.ok) {
//                 const expenseData = await expenseResponse.json();
//                 setExpenses(prevExpenses => ({
//                     ...prevExpenses,
//                     [eventId]: expenseData.data
//                 }));
//             } else {
//                 console.error(`Failed to fetch expenses for event ${eventId}`);
//             }
//         } catch (error) {
//             console.error(`Error fetching expenses for event ${eventId}:`, error);
//         }
//     };

//     return (
//         <div className="expenses-table-container">
//             <h1>Event Expenses Overview</h1>
//             {events.map(event => (
//                 <div key={event.id}>
//                     <h3>{event.name} - Expenses</h3>
//                     <table className="expenses-table">
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Amount</th>
//                                 <th>Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {expenses[event.id]?.map((expense) => (
//                                 <tr key={expense.id}>
//                                     <td>{expense.description}</td>
//                                     <td>${expense.amount.toFixed(2)}</td>
//                                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default OrdersPage;
//   -------------------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import '../orderForm/Order2.css';

// function OrdersPage() {
//     const [events, setEvents] = useState([]);
//     const [expenses, setExpenses] = useState({});
//     const [orders, setOrders] = useState({});

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const fetchEvents = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const eventResponse = await fetch('http://localhost:3004/api/event', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (eventResponse.ok) {
//                 const eventData = await eventResponse.json();
//                 setEvents(eventData.data);
//                 eventData.data.forEach(event => {
//                     fetchExpensesForEvent(event.id, token);
//                     fetchOrdersForEvent(event.id, token);
//                 });
//             } else {
//                 console.error('Failed to fetch events');
//             }
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     const fetchExpensesForEvent = async (eventId, token) => {
//         try {
//             const expenseResponse = await fetch(`http://localhost:3004/api/event/${eventId}/expense`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             if (expenseResponse.ok) {
//                 const expenseData = await expenseResponse.json();
//                 setExpenses(prevExpenses => ({
//                     ...prevExpenses,
//                     [eventId]: expenseData.data
//                 }));
//             } else {
//                 console.error(`Failed to fetch expenses for event ${eventId}`);
//             }
//         } catch (error) {
//             console.error(`Error fetching expenses for event ${eventId}:`, error);
//         }
//     };

//     const fetchOrdersForEvent = async (eventId, token) => {
//         try {
//             const ordersResponse = await fetch(`http://localhost:3004/api/order/${eventId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             if (ordersResponse.ok) {
//                 const ordersData = await ordersResponse.json();
//                 setOrders(prevOrders => ({
//                     ...prevOrders,
//                     [eventId]: ordersData.data
//                 }));
//             } else {
//                 console.error(`Failed to fetch orders for event ${eventId}`);
//             }
//         } catch (error) {
//             console.error(`Error fetching orders for event ${eventId}:`, error);
//         }
//     };

//     return (
//         <div className="expenses-table-container">
//             <h1>Event Financial Overview</h1>
//             {events.map(event => (
//                 <div key={event.id}>
//                     <h3>{event.name}</h3>
//                     <table className="expenses-table">
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Amount</th>
//                                 <th>Tickets Sold</th>
//                                 <th>Total Revenue</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {expenses[event.id]?.map((expense) => (
//                                 <tr key={expense.id}>
//                                     <td>{expense.description}</td>
//                                     <td>${expense.amount.toFixed(2)}</td>
//                                     <td>{orders[event.id]?.quantity ?? '-'}</td>
//                                     <td>${orders[event.id]?.total_amount?.toFixed(2) ?? '-'}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default OrdersPage;


// --------------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import '../orderForm/Order2.css';

// function OrdersPage() {
//     const [events, setEvents] = useState([]);
//     const [expenses, setExpenses] = useState({});
//     const [orders, setOrders] = useState({});

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const fetchEvents = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const eventResponse = await fetch('http://localhost:3004/api/event', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (eventResponse.ok) {
//                 const eventData = await eventResponse.json();
//                 setEvents(eventData.data);
//                 eventData.data.forEach(event => {
//                     fetchExpensesForEvent(event.id, token);
//                     fetchOrdersForEvent(event.id, token);
//                 });
//             } else {
//                 console.error('Failed to fetch events');
//             }
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     const fetchExpensesForEvent = async (eventId, token) => {
//         try {
//             const expenseResponse = await fetch(`http://localhost:3004/api/event/${eventId}/expense`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             if (expenseResponse.ok) {
//                 const expenseData = await expenseResponse.json();
//                 setExpenses(prevExpenses => ({
//                     ...prevExpenses,
//                     [eventId]: expenseData.data
//                 }));
//             } else {
//                 console.error(`Failed to fetch expenses for event ${eventId}`);
//             }
//         } catch (error) {
//             console.error(`Error fetching expenses for event ${eventId}:`, error);
//         }
//     };

//     const fetchOrdersForEvent = async (eventId, token) => {
//         try {
//             const ordersResponse = await fetch(`http://localhost:3004/api/order/${eventId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             if (ordersResponse.ok) {
//                 const ordersResult = await ordersResponse.json(); // Assuming this gives us { data: [...orders] }
//                 const ordersData = ordersResult.data; // Accessing the 'data' property which contains the orders array
//                 const totalQuantity = ordersData.reduce((acc, order) => acc + order.quantity, 0);
//                 const totalAmount = ordersData.reduce((acc, order) => acc + order.total_amount, 0);
//                 setOrders(prevOrders => ({
//                     ...prevOrders,
//                     [eventId]: { totalQuantity, totalAmount }
//                 }));
//             } else {
//                 console.error(`Failed to fetch orders for event ${eventId}`);
//             }
//         } catch (error) {
//             console.error(`Error fetching orders for event ${eventId}:`, error);
//         }
//     };
    
//     return (
//         <div className="expenses-table-container">
//             <h1>Event Financial Overview</h1>
//             {events.map(event => (
//                 <div key={event.id}>
//                     <h3>{event.name}</h3>
//                     <table className="expenses-table">
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Amount</th>
//                                 <th>Tickets Sold</th>
//                                 <th>Total Revenue</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {expenses[event.id]?.map((expense) => (
//                                 <tr key={expense.id}>
//                                     <td>{expense.description}</td>
//                                     <td>${expense.amount.toFixed(2)}</td>
//                                     <td>{orders[event.id]?.totalQuantity ?? '-'}</td>
//                                     <td>${orders[event.id]?.totalAmount?.toFixed(2) ?? '-'}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default OrdersPage;
// -------------------------------------------------------------------------------------------------
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
                                <th>Description</th>
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

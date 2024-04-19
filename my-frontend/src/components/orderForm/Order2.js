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

function OrdersPage({ eventId }) {
    const [orders, setOrders] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrdersAndExpenses = async () => {
            setIsLoading(true);
            try {
                const ordersResponse = await fetch(`http://localhost:3004/api/order/event/${eventId}`);
                const expensesResponse = await fetch(`http://localhost:3004/api/event/${eventId}/expense`);
                
                if (ordersResponse.ok && expensesResponse.ok) {
                    const ordersData = await ordersResponse.json();
                    const expensesData = await expensesResponse.json();

                    setOrders(ordersData);
                    setExpenses(expensesData);
                } else {
                    // Handle errors here, such as displaying a message to the user
                    console.error("Failed to fetch orders or expenses");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setIsLoading(false);
        };

        fetchOrdersAndExpenses();
    }, [eventId]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Orders for Event {eventId}</h2>
            {orders.map(order => (
                <div key={order.id}>
                    <p>Order ID: {order.id}, Quantity: {order.quantity}, Total: {order.total}</p>
                </div>
            ))}
            <h2>Expenses for Event {eventId}</h2>
            {expenses.map(expense => (
                <div key={expense.id}>
                    <p>Expense ID: {expense.id}, Amount: {expense.amount}, Description: {expense.description}</p>
                </div>
            ))}
        </div>
    );
}

export default OrdersPage;

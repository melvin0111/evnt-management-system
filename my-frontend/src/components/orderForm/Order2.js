import React from 'react';
import { useNavigate } from 'react-router-dom'
import '../orderForm/Order2.css'

const OrdersPage = () => {
  // function OrdersPage (){
    // Sample event data
    const events = [
      { name1: 'Event 1', location: 'Location 1', ticketCost: 50, managerPayment: 100 },
      { name1: 'Event 2', location: 'Location 2', ticketCost: 75, managerPayment: 120 },
      // Add more event data as needed
    ];
    
    const navigate = useNavigate(''); 
  
    const handlePayment = (e) => {
      e.preventDefault();
      // For now, we're assuming any login attempt is successful
      console.log("Entering Payment Page...");
      // Redirect to a specific route on successful login
      navigate('/dashboard/Payment'); 
    }; 
  
    return (
      <div className="orders-container">
      <h1>Orders</h1>
        {events.map((event, index) => (
          <div className="event-container" key={index}>
            <div className="event-details">
              <h2>{event.name1}</h2>
              <div></div>
              <p>Location: {event.location}</p>
              <p>Ticket Cost: ${event.ticketCost}</p>
              <p>Manager Payment: ${event.managerPayment}</p>
              <button onClick={handlePayment} className="payment-button">
                  Proceed to Payment
              </button>
            </div>
            <div className="total-expenses">
              <h2>Total Expenses</h2>
              <h4>${event.ticketCost + event.managerPayment}</h4>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default OrdersPage;
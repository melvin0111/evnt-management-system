import React from 'react';
import '../ticketForm/TicketForm.css'; // Assuming you have or will create a CSS file for styling

const TicketForm = () => {
  const tickets = [
    {
      event_id: 'EVT1001',
      ticketType: 'VIP',
      price: 150,
      quantity: 50,
      description: 'VIP access with additional benefits'
    },
    {
      event_id: 'EVT1002',
      ticketType: 'General',
      price: 75,
      quantity: 100,
      description: 'General admission'
    }
  ];

  return (
    <div className="ticket-form">
      <h1>Ticket Information</h1>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Ticket Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.event_id}</td>
              <td>{ticket.ticketType}</td>
              <td>${ticket.price}</td>
              <td>{ticket.quantity}</td>
              <td>{ticket.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketForm;

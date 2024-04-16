import React from 'react'
import '../App.css';
import DashboardNav from '../components/navigation/DashboardNav';
import TicketForm from '../components/ticketForm/TicketForm';

function Tickets() {
  return (
    <div>
      <DashboardNav />
      <TicketForm />
    </div>
  )
}

export default Tickets

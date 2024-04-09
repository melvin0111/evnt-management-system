import React from 'react';
import '../App.css';
import DashboardNav from '../components/navigation/DashboardNav';
import DashboardSection from '../components/section/DashboardSection';

function Dashboard() {
  return (
    <div>
      <DashboardNav />
      <DashboardSection />
    </div>
  )
}

export default Dashboard

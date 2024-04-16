import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//need to import navbar, 

//Pages
import Home from './pages/Home';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Orders from './pages/Orders';
import Tickets from './pages/Tickets';
import Payment from './pages/Payment';
import Settings from './pages/Settings';

// Useless Pages (just for show)
  import Products from './pages/Products'
  import Services from './pages/Services'
//Components
import Footer from './components/footer/Footer'
import NavBar from './components/navigation/NavBar';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<> <NavBar /> <Home /> <Footer /> </>} /> 
          <Route path='/services' element={<><NavBar /><Services /><Footer /></>} />
          <Route path='/products' element={<><NavBar /><Products /><Footer /></>} />
          <Route path='/login' element={<><NavBar /><Login /><Footer /></>} />
          <Route path='/signup' element={<><NavBar /><SignUp /><Footer /></>} />

          
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path ='/dashboard/Orders' element = {<> <Orders /> </> } />
          <Route path='/dashboard/Tickets' element={<> <Tickets /> </> } />
          <Route path='/dashboard/Payment' element={<> <Payment /> </> } />
          <Route path='/dashboard/Settings' element={<> <Settings /> </> } />
        </Routes>
      </Router>
  );
}

export default App;

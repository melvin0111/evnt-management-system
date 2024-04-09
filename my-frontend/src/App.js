import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//need to import navbar, 

//Pages
import Home from './pages/Home';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';

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
        </Routes>
      </Router>
  );
}

export default App;

import React from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Homepage.jsx';
import Dashboard from './Pages/Dashboardpage.jsx';
import Login from './Pages/Loginpage.jsx';
import User from './Pages/Userpage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CssBaseline from '@mui/material/CssBaseline';

import './style.css';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />

        {/* Full-width page content */}
        <Box
          sx={{
            flex: 1,
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            padding: 0,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarRentalHome from './page/CarRentalHome';
import CarDetails from './page/CarDetails';
import Navbar from './components/Navbar';
import BookingConfirmation from './components/BookingConfirmation';
import PaymentGateway from './components/CheckOut';
import AdminPage from './components/AdminPage';
import Login from './page/Login';
import Footer from './components/Footer';
import Register from './page/Register';

const App = () => {
  return (

    <Router>

      <Navbar />


      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={< AdminPage />} />

        <Route path="/" element={<CarRentalHome />} />
        <Route path="/car-details/:carId" element={<CarDetails />} />
        <Route path="/book-now/:carName" element={<BookingConfirmation />} />
        <Route path="/checkout/:carName" element={<PaymentGateway />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

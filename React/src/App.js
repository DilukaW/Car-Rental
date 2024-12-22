// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarRentalHome from './page/CarRentalHome';
import CarDetails from './page/CarDetails';
import Navbar from './components/Navbar';
import BookingConfirmation from './page/BookingConfirmation';
import PaymentGateway from './page/CheckOut';
import AdminPage from './page/AdminPage';
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
        <Route path="/book-now/:carId" element={<BookingConfirmation />} />
        <Route path="/checkout" element={<PaymentGateway />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

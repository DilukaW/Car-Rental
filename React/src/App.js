// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarRentalHome from './components/CarRentalHome';
import CarDetails from './components/CarDetails';
import Navbar from './components/Navbar';
import BookingConfirmation from './components/BookingConfirmation';
import PaymentGateway from './components/CheckOut';

const App = () => {
  return (

    <Router>
      <Routes>

        <Route path="/" element={<CarRentalHome />} />
        <Route path="/car-details/:carId" element={<CarDetails />} />
        <Route path="/book-now/:carName" element={<BookingConfirmation />} />
        <Route path="/checkout/:carName" element={<PaymentGateway />} />

      </Routes>

    </Router>
  );
};

export default App;

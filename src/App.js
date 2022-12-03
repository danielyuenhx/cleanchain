import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/Home/HomePage';
import LocationPage from './components/Location/LocationPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:locationId" element={<LocationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

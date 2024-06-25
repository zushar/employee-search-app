import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import FavoritesDatails from './components/FavoritesDatails';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<EmployeeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/favoritesDatails/:id" element={<FavoritesDatails />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

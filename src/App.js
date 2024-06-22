import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import Favorites from './components/Favorites';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="container mx-auto p-4">
          <nav className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold">Employee Search</Link>
            <Link to="/favorites" className="text-xl">Favorites</Link>
          </nav>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [company, setCompany] = useState('google');

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const addFavorite = (employee) => {
    const isAlreadyFavorite = favorites.some(emp => emp.login.uuid === employee.login.uuid);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, employee];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(emp => emp.login.uuid !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const globalState = {
    employees,
    setEmployees,
    favorites,
    addFavorite,
    removeFavorite,
    company,
    setCompany
  };

  return (
    <AppContext.Provider value={globalState}>
      {children}
    </AppContext.Provider>
  );
};

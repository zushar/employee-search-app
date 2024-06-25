import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [dosNotAvQuery, setDosNotAvQuery] = useState(true);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const addFavorite = (employee) => {
    const isAlreadyFavorite = favorites.some(emp => emp.login.username === employee.login.username);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, employee];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(emp => emp.login.username !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const globalState = {
    favorites,
    addFavorite,
    removeFavorite,
    dosNotAvQuery,
    setDosNotAvQuery,
  };

  return (
    <AppContext.Provider value={globalState}>
      {children}
    </AppContext.Provider>
  );
};

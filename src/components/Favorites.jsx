import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(AppContext);
 
  if(favorites.length === 0) {
    return <div>No favorites added yet</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map(employee => (
        <div key={employee.login.uuid} className="border p-4 flex flex-col items-center">
          <img src={employee.picture.large} alt={employee.name.first} className="rounded-full mb-4" />
          <h2 className="text-xl mb-2">{employee.name.first} {employee.name.last}</h2>
          <p className="text-gray-600">{employee.dob.age} years old</p>
          <p className="text-gray-600">{employee.location.city}, {employee.location.country}</p>
          <Link to={`/employee/${employee.login.uuid}`} className="text-blue-500 mt-2">View Details</Link>
          <button
            onClick={() => removeFavorite(employee.login.uuid)}
            className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
          >
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;


import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppContext } from '../context/AppContext';
import L from 'leaflet';

// Fixing marker issue with leaflet and react-leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FavoritesDatails = () => {
  const { id } = useParams();
  const { favorites, addFavorite, removeFavorite } = useContext(AppContext);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const foundEmployee =  favorites.find(emp => emp.login.username === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    } else {
      setEmployee(null);
    }
  }, [id, favorites]);

  if (!employee) return <div className='justify-center text-xl'>Employee not found</div>;

  const isFavorite = favorites.some(emp => emp.login.username === employee.login.username);

  return (
    <div className="border p-4">
      <img src={employee.picture.large} alt={employee.name.first} className="rounded-full mb-4" />
      <h2 className="text-xl mb-2">{employee.name.first} {employee.name.last}</h2>
      <p className="text-gray-600">{employee.dob.age} years old</p>
      <p className="text-gray-600">{employee.location.city}, {employee.location.country}</p>
      <p className="text-gray-600">Email: {employee.email}</p>
      <p className="text-gray-600">Phone: {employee.phone}</p>
      <p className="text-gray-600">Address: {employee.location.street.number} {employee.location.street.name}, {employee.location.city}, {employee.location.state}, {employee.location.country}</p>
      <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} zoom={13} scrollWheelZoom={true} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}>
          <Popup>
            {employee.name.first} {employee.name.last}
          </Popup>
        </Marker>
      </MapContainer>
      {isFavorite ? (
        <button
          onClick={() => removeFavorite(employee.login.uuid)}
          className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
        >
          Remove from Favorites
        </button>
      ) : (
        <button
          onClick={() => addFavorite(employee)}
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
        >
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default FavoritesDatails;

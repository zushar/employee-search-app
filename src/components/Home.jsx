import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import navImge from '../imge/image.png';

export default function Home() {
  const { addFavorite, favorites, removeFavorite, dosNotAvQuery, setDosNotAvQuery } = useContext(AppContext);
  const [companyInput, setCompanyInput] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('google');
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const query = searchParams.get('search');

  const fetchEmployeesDefault = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=4&seed=google`);
      setEmployees(response.data.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${query}`);
      setEmployees(response.data.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchEmployees(query);
      setCompanyInput(query);
      setDosNotAvQuery(false);
      setCompany(query);
    } else {
      fetchEmployeesDefault();
    }
// eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    if (location.pathname === '/' && !query) {
      setCompanyInput('');
      setDosNotAvQuery(true);
      fetchEmployeesDefault();
    }
// eslint-disable-next-line
  }, [location.pathname, query]);

  const handleCompanyChange = () => {
    if (companyInput === '') return;
    navigate(`/?search=${companyInput}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCompanyChange();
    }
  };

  if (loading) return <div className='justify-center text-xl'>Loading...</div>;
  if (error) return <div className='justify-center text-xl'>Error fetching data</div>;

  return (
    <div>
      {dosNotAvQuery && <div className="justify-center mb-4">
        <img src={navImge} alt="navImage" className="w-full h-52" />
      </div>}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter company..."
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 mr-2"
        />
        <button onClick={handleCompanyChange} className="bg-blue-500 text-white py-2 px-4 rounded">Search Company Employees</button>
      </div>
      <div className='flex justify-center mb-6'>
        {dosNotAvQuery ? <h1 className='text-6xl font-bold font-serif'>Employees of the Month</h1>
          : <h1 className='text-6xl font-bold font-serif'>{`Employees of ${query} company`}</h1>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map(employee => (
          <div key={employee.login.username} className="border p-4 flex flex-col items-center">
            <img src={employee.picture.large} alt={employee.name.first} className="rounded-full mb-4" />
            <h2 className="text-xl mb-2">{employee.name.first} {employee.name.last}</h2>
            <p className="text-gray-600">{employee.dob.age} years old</p>
            <p className="text-gray-600">{employee.location.city}, {employee.location.country}</p>
            <Link to={`/employee/?company=${company}&id=${employee.login.username}`} className="text-blue-500 mt-2">View Details</Link>
            {favorites.some(emp => emp.login.username === employee.login.username) ? (
              <button
                onClick={() => removeFavorite(employee.login.username)}
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
        ))}
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { employees, setEmployees, addFavorite, favorites, removeFavorite, company, setCompany } = useContext(AppContext);
  const [companyInput, setCompanyInput] = useState(company);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
        setEmployees(response.data.results);
        console.log(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (company) {
      fetchEmployees();
    }
  }, [company, setEmployees]);

  useEffect(() => {
    setCompanyInput(company);
  }, [company]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCompanyChange = () => {
    if (companyInput !== company) {
      setCompany(companyInput);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCompanyChange();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const filteredEmployees = employees.filter(employee =>
    employee.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name.last.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 w-full mb-4"
      />
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter company..."
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 mr-2"
        />
        <button onClick={handleCompanyChange} className="bg-blue-500 text-white py-2 px-4 rounded">Search by Company</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map(employee => (
          <div key={employee.login.uuid} className="border p-4 flex flex-col items-center">
            <img src={employee.picture.large} alt={employee.name.first} className="rounded-full mb-4" />
            <h2 className="text-xl mb-2">{employee.name.first} {employee.name.last}</h2>
            <p className="text-gray-600">{employee.dob.age} years old</p>
            <p className="text-gray-600">{employee.location.city}, {employee.location.country}</p>
            <Link to={`/employee/${employee.login.uuid}`} className="text-blue-500 mt-2">View Details</Link>
            {favorites.some(emp => emp.login.uuid === employee.login.uuid) ? (
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
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;

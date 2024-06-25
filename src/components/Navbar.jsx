import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold">Employee Search</Link>
        <Link to="/favorites" className="text-xl">Favorites</Link>
    </nav>
  )
}

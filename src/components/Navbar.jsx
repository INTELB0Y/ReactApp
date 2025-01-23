import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Владивосток
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-200">Главная</Link>
            <Link to="/attractions" className="hover:text-gray-200">Достопримечательности</Link>
            <Link to="/contacts" className="hover:text-gray-200">Контакты</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
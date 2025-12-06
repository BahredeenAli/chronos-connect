import { Link, useLocation } from 'react-router-dom';
import { Calendar, LayoutGrid, PlusCircle } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: LayoutGrid },
    { href: '/weekly-schedule', label: 'Weekly Schedule', icon: Calendar },
    { href: '/request-meeting', label: 'New Meeting', icon: PlusCircle },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              KaziFlow
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-white'
                      : 'text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}>
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
       {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around py-2">
        {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={`mobile-${href}`}
                to={href}
                className={`flex flex-col items-center w-full text-xs font-medium transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                <Icon className="w-6 h-6 mb-1" />
                <span>{label}</span>
              </Link>
            );
        })}
      </div>
    </header>
  );
};

export default Header;

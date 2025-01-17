import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Building2, Users, Menu, X, Plus } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/properties', icon: <Building2 size={20} />, label: 'Properties' },
    { path: '/posts', icon: <Plus size={20} />, label: 'Add Property' },
    { path: '/users', icon: <Users size={20} />, label: 'Users' },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 ' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 max-lg:text-center">Real Estate Admin</h1>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                  isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
                }`
              }
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
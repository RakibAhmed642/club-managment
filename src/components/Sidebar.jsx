import React from 'react';

    const Sidebar = () => {
      return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center mb-6">
            {/* Placeholder for logo */}
            <div className="w-8 h-8 bg-gray-500 rounded-full mr-2"></div>
            <span className="text-xl font-bold">dompet</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center mb-6">
            {/* Placeholder for profile picture */}
            <div className="w-8 h-8 bg-gray-500 rounded-full mr-2"></div>
            <span className="text-sm">H. William</span>
            {/* Placeholder for online status */}
            <span className="ml-1 w-3 h-3 bg-green-500 rounded-full"></span>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul>
              <li className="mb-2">
                <a href="#" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-700 bg-gray-900">
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-700">
                  Transactions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-700">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      );
    };

    export default Sidebar;

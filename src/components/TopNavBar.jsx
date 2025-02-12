import React from 'react';

    const TopNavBar = () => {
      return (
        <div className="bg-white shadow p-4 flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-grow mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 mr-4">
            {/* Placeholders for icons */}
            <button className="text-gray-500 hover:text-gray-700">Bell</button>
            <button className="text-gray-500 hover:text-gray-700">Chat</button>
            <button className="text-gray-500 hover:text-gray-700">Gear</button>
          </div>

          {/* Generate Report Button */}
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Generate Report
          </button>
        </div>
      );
    };

    export default TopNavBar;

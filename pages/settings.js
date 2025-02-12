import Layout from '../components/Layout';
    import { useState, useEffect } from 'react';

    export default function Settings() {
      const [theme, setTheme] = useState('light');
      const [clubName, setClubName] = useState(''); // State for club name

      useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }

        // Load club name from localStorage
        const savedClubName = localStorage.getItem('clubName');
        if (savedClubName) {
          setClubName(savedClubName);
        } else {
          setClubName("NAME")
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('theme', theme);
        // Save club name to localStorage
        localStorage.setItem('clubName', clubName);
      }, [theme, clubName]);

      const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      };

      return (
        <Layout>
          <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Settings</h1>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow space-y-4">
            <label className="flex items-center cursor-pointer">
              <span className="mr-3 text-gray-700 dark:text-gray-200">Dark Mode</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <div className="block bg-gray-400 w-14 h-8 rounded-full"></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                    theme === 'dark' ? 'transform translate-x-full' : ''
                  }`}
                ></div>
              </div>
            </label>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Club Name:
              </label>
              <input
                type="text"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="Enter Club Name"
              />
            </div>
          </div>
        </Layout>
      );
    }

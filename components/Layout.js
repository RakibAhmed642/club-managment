import Sidebar from './Sidebar';
    import { useEffect, useState } from 'react';

    export default function Layout({ children }) {
      const [theme, setTheme] = useState('light');
      const [clubName, setClubName] = useState('');

      useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
        const savedClubName = localStorage.getItem('clubName');
        if (savedClubName) {
          setClubName(savedClubName);
        } else {
          setClubName("NAME")
        }
      }, []);

      useEffect(() => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [theme]);

      return (
        <div className="flex">
          <Sidebar clubName={clubName} />
          <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            {children}
          </main>
        </div>
      );
    }

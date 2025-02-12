import React from 'react';
    import Sidebar from './components/Sidebar';
    import TopNavBar from './components/TopNavBar';
    import Dashboard from './pages/Dashboard';

    function App() {
      return (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-grow flex flex-col">
            <TopNavBar />
            <main className="flex-grow p-4">
              <Dashboard />
            </main>
          </div>
        </div>
      );
    }

    export default App;

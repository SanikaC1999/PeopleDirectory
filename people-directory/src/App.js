import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PeopleDirectory from './components/PeopleDirectory';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('register'); // Updated to manage page navigation

  const handleRegistration = () => {
    setCurrentPage('login');
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
    setCurrentPage('welcome');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        loggedInUser={loggedInUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleLogout={handleLogout}
      />

      <div className="flex flex-1">
        {loggedInUser && <Sidebar setCurrentPage={setCurrentPage} />} {/* Sidebar only after login */}

        <main className="p-6 bg-gray-50 flex-grow">
          {currentPage === 'register' && <Register onRegister={handleRegistration} />}
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'welcome' && loggedInUser && (
            <Welcome loggedInUser={loggedInUser} />
          )}
          {currentPage === 'people-directory' && <PeopleDirectory />}
        </main>
      </div>
    </div>
  );
}

export default App;

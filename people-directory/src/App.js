import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Holds the logged-in user's data
  const [currentPage, setCurrentPage] = useState('register'); // Determines which page to show

  const handleRegistration = () => {
    // After successful registration, move to the login page
    setCurrentPage('login');
  };

  const handleLogin = (user) => {
    // After successful login, set the logged-in user and move to the welcome page
    setLoggedInUser(user);
    setCurrentPage('welcome');
  };

  const handleLogout = () => {
    // Clear logged-in user and redirect to login
    setLoggedInUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar is always visible */}
      <Header
        loggedInUser={loggedInUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleLogout={handleLogout}
      />

      <div className="flex flex-1">
        {/* Sidebar is only visible after login */}
        {loggedInUser && <Sidebar />}

        <main className="p-6 bg-gray-50 flex-grow">
          {/* Conditionally render the appropriate component */}
          {currentPage === 'register' && <Register onRegister={handleRegistration} />}
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'welcome' && loggedInUser && (
            <Welcome loggedInUser={loggedInUser} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

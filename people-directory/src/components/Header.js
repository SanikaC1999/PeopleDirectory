import React, { useState } from 'react';

const Header = ({ loggedInUser, currentPage, setCurrentPage, handleLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 border-b">
      <div className="text-purple-600 text-3xl font-bold">PEOPLE.CO</div>
      <div className="flex items-center space-x-4">
        {currentPage === 'register' && (
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        )}
        {currentPage === 'login' && (
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage('register')}
          >
            Register
          </button>
        )}
        {loggedInUser && (
          <div className="relative flex items-center space-x-4">
            {/* Bell Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 016 6v3.586l.707.707A1 1 0 0116 14H4a1 1 0 01-.707-1.707L4 11.586V8a6 6 0 016-6zm-2 12a2 2 0 104 0h-4z" />
            </svg>

            {/* Profile Icon */}
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rounded-full border-2 border-purple-600 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6a1 1 0 001 1h10a1 1 0 001-1c0-3.31-2.69-6-6-6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 font-medium text-gray-700">
                {loggedInUser.firstName} {loggedInUser.lastName}
              </span>
              <svg
                className="w-4 h-4 ml-2 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

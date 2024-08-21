import React from 'react';

const Sidebar = ({ setCurrentPage }) => {
  return (
    <div className="w-64 h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-col space-y-4 p-4">
        <button
          className="flex items-center text-gray-600 hover:bg-gray-200 p-2 rounded-lg"
          onClick={() => setCurrentPage('overview')}
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.25a.75.75 0 000 1.5h1.25V14.5H3a.75.75 0 000 1.5h14a.75.75 0 000-1.5h-1.25V5.75H17a.75.75 0 000-1.5H3z" /></svg>
          Overview
        </button>
        <button
          className="flex items-center text-gray-600 hover:bg-gray-200 p-2 rounded-lg"
          onClick={() => setCurrentPage('people-directory')}
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 3.75a.75.75 0 00-1.5 0v.5H3.75A2.75 2.75 0 001 7v6a2.75 2.75 0 002.75 2.75h10.5A2.75 2.75 0 0017 13V7a2.75 2.75 0 00-2.75-2.75h-3.5v-.5a.75.75 0 00-1.5 0v.5h-1.5v-.5zM8.75 7.5h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 010-1.5zM4.75 10h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zM12.25 12h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 010-1.5z" /></svg>
          People Directory
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

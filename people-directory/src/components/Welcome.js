import React from 'react';

const Welcome = ({ loggedInUser }) => {
  return (
    <div className="welcome-screen">
      <h1 className="text-2xl font-bold">Welcome, {loggedInUser.firstName} {loggedInUser.lastName}!</h1>
    </div>
  );
};

export default Welcome;

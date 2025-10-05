import React from 'react';
import UserPrompts from './UserPrompts';
import './Dashboard.css';

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <p>Welcome, {user.displayName || user.phoneNumber}</p>
      <UserPrompts />
    </div>
  );
}

export default Dashboard;


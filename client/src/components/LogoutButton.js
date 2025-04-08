import React from 'react';
import '../styles/LogoutButton.css';

const LogoutButton = () => {
    const handleLogout = () => {
        // Clear any user session data if needed
        localStorage.clear();
        // Force a hard navigation to the login page
        window.location.href = '/login';
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton; 
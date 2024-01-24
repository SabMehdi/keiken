import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from './AuthContext'; // Import useAuth

function Navbar() {
  const { auth, setAuth } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token or authentication credentials
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username'); // Retrieve the username from local storage
    setIsAuthenticated(!!token);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token, username or credentials from local storage (or state management)
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    setAuth({ isAuthenticated: false, username: '' });

    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
          </ul>
          {!auth.isAuthenticated ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" activeClassName="active">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
            </ul>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Hello, {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
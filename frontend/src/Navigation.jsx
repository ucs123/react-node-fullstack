import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

function Navigation() {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📋 TodoApp
        </Link>
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/todos"
                  className={`nav-link ${isActive('/todos') ? 'active' : ''}`}
                >
                  My Todos
                </Link>
              </li>
              <li>
                <span className="user-info">
                  Welcome, {user.username}!
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/auth"
                className={`nav-link ${isActive('/auth') ? 'active' : ''}`}
              >
                Sign In
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navStyle = {
    backgroundColor: '#007bff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const logoStyle = {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  }

  const navLinksStyle = {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  }

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255,255,255,0.2)',
    fontWeight: 'bold'
  }

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          📋 TodoApp
        </Link>
        <ul style={navLinksStyle}>
          <li>
            <Link
              to="/"
              style={isActive('/') ? activeLinkStyle : linkStyle}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/todos"
              style={isActive('/todos') ? activeLinkStyle : linkStyle}
            >
              My Todos
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={isActive('/about') ? activeLinkStyle : linkStyle}
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
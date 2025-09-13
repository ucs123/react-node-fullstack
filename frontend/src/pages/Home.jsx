import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to TodoApp
        </h1>
        <p className="hero-subtitle">
          Organize your tasks efficiently with our simple and powerful todo application.
        </p>
        
        <div className="hero-actions">
          <Link
            to="/todos"
            className="cta-btn"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="cta-btn secondary"
          >
            Learn More
          </Link>
        </div>

        <div className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">✅ Easy Task Management</h3>
              <p className="feature-description">Create, edit, and organize your tasks with our intuitive interface.</p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">🚀 Fast & Responsive</h3>
              <p className="feature-description">Built with React and modern web technologies for optimal performance.</p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">📱 Always Available</h3>
              <p className="feature-description">Access your todos from anywhere with our web-based application.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
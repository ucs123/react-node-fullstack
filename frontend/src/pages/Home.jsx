import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ padding: '3rem 0' }}>
        <h1 style={{ fontSize: '3rem', color: '#333', marginBottom: '1rem' }}>
          Welcome to TodoApp
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          Organize your tasks efficiently with our simple and powerful todo application.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link
            to="/todos"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '1rem 2rem',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            Get Started
          </Link>
          <Link
            to="/about"
            style={{
              backgroundColor: 'transparent',
              color: '#007bff',
              padding: '1rem 2rem',
              textDecoration: 'none',
              borderRadius: '8px',
              border: '2px solid #007bff',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Learn More
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>✅ Easy Task Management</h3>
            <p style={{ color: '#666' }}>Create, edit, and organize your tasks with our intuitive interface.</p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>🚀 Fast & Responsive</h3>
            <p style={{ color: '#666' }}>Built with React and modern web technologies for optimal performance.</p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>📱 Always Available</h3>
            <p style={{ color: '#666' }}>Access your todos from anywhere with our web-based application.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
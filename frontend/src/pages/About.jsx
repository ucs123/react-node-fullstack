import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#333', marginBottom: '2rem' }}>About TodoApp</h1>
        
        <div style={{ lineHeight: '1.6', color: '#555' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            TodoApp is a full-stack web application built to help you manage your daily tasks efficiently. 
            Whether you're organizing work projects or personal errands, our simple and intuitive interface 
            makes task management a breeze.
          </p>

          <h2 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Features</h2>
          <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Create and organize todos with titles and descriptions</li>
            <li style={{ marginBottom: '0.5rem' }}>Mark tasks as complete or incomplete</li>
            <li style={{ marginBottom: '0.5rem' }}>Delete completed or unwanted tasks</li>
            <li style={{ marginBottom: '0.5rem' }}>View creation dates for all your todos</li>
            <li style={{ marginBottom: '0.5rem' }}>Real-time updates with a responsive interface</li>
          </ul>

          <h2 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Technology Stack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ color: '#007bff', marginBottom: '0.5rem' }}>Frontend</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>React 18</li>
                <li>React Router</li>
                <li>Vite Build Tool</li>
                <li>Modern CSS</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#007bff', marginBottom: '0.5rem' }}>Backend</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>RESTful API</li>
                <li>In-memory Storage</li>
              </ul>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
              Ready to get organized?
            </p>
            <Link
              to="/todos"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '0.8rem 1.5rem',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              Start Managing Your Todos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
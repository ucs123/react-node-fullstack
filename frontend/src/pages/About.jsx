import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1 className="about-title">About TodoApp</h1>
        
        <div className="about-text">
          <p>
            TodoApp is a full-stack web application built to help you manage your daily tasks efficiently. 
            Whether you're organizing work projects or personal errands, our simple and intuitive interface 
            makes task management a breeze.
          </p>

          <h2 className="section-title">Features</h2>
          <ul>
            <li>Create and organize todos with titles and descriptions</li>
            <li>Mark tasks as complete or incomplete</li>
            <li>Delete completed or unwanted tasks</li>
            <li>View creation dates for all your todos</li>
            <li>Real-time updates with a responsive interface</li>
          </ul>

          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-section">
              <h3 className="tech-title">Frontend</h3>
              <ul>
                <li>React 18</li>
                <li>React Router</li>
                <li>Vite Build Tool</li>
                <li>SCSS Styling</li>
              </ul>
            </div>
            <div className="tech-section">
              <h3 className="tech-title">Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>RESTful API</li>
                <li>MVC Architecture</li>
              </ul>
            </div>
          </div>

          <div className="contact-section">
            <p className="contact-title">
              Ready to get organized?
            </p>
            <Link
              to="/todos"
              className="contact-link"
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
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation.jsx'
import Home from './pages/Home.jsx'
import TodoPage from './pages/TodoPage.jsx'
import About from './pages/About.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Navigation />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/todos" element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
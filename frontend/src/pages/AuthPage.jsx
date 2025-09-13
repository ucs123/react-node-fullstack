import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { user, login, register } = useAuth()

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!isLogin && formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      let result
      if (isLogin) {
        result = await login(formData.email, formData.password)
      } else {
        result = await register(formData.username, formData.email, formData.password)
      }

      if (!result.success) {
        setError(result.error)
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '3rem', 
        maxWidth: '1000px', 
        width: '100%', 
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        {/* Form Section */}
        <div style={{ padding: '2rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem', 
            color: '#333',
            textAlign: 'center'
          }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ 
            color: '#666', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            {isLogin ? 'Sign in to your account' : 'Join us to manage your todos'}
          </p>

          {error && (
            <div style={{ 
              backgroundColor: '#fee', 
              color: '#c33', 
              padding: '0.75rem', 
              borderRadius: '6px', 
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '2px solid #ddd', 
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  required={!isLogin}
                />
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '2px solid #ddd', 
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '0.75rem', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #eee'
          }}>
            <span style={{ color: '#666' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={toggleMode}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#007bff', 
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '1rem', 
            color: '#333'
          }}>
            📋 Organize Your Life
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: '1.1rem', 
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            Take control of your tasks and boost your productivity with our 
            intuitive todo management system.
          </p>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            color: '#555' 
          }}>
            <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>✅</span>
              Create and organize tasks easily
            </li>
            <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>🚀</span>
              Track your progress in real-time
            </li>
            <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>🔒</span>
              Secure and private to your account
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
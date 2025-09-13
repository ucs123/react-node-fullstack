// Load environment variables from .env file
require('dotenv').config();

// Configuration file that uses environment variables
const config = {
  // Server Configuration
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',

  // JWT Configuration  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    algorithm: process.env.JWT_ALGORITHM || 'HS256'
  },

  // Security Configuration
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: process.env.CORS_CREDENTIALS === 'true' || false
  },

  // Database Configuration (for future use)
  database: {
    url: process.env.DATABASE_URL,
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS) || 10
  },

  // Rate Limiting (for future use)
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  }
};

// Validation: Check for required environment variables
const requiredSecrets = ['JWT_SECRET'];

requiredSecrets.forEach(secret => {
  if (!process.env[secret]) {
    console.error(`❌ Missing required environment variable: ${secret}`);
    console.log('Please set this in your .env file');
    process.exit(1);
  }
});

// Log configuration (non-sensitive values only)
if (config.nodeEnv === 'development') {
  console.log('🔧 Configuration loaded:', {
    port: config.port,
    host: config.host,
    nodeEnv: config.nodeEnv,
    jwtExpiresIn: config.jwt.expiresIn,
    bcryptSaltRounds: config.bcrypt.saltRounds,
    corsOrigin: config.cors.origin
  });
}

module.exports = config;
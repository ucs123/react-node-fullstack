# Required Secrets Configuration

Set these as **Replit Secrets** (not in a .env file for security):

## Required Secrets
- `JWT_SECRET` - Secret key for JWT token signing (already configured ✅)

## Optional Environment Variables
You can set these as Replit Secrets or environment variables:

- `JWT_EXPIRES_IN` - JWT token expiration (default: 24h)
- `JWT_ALGORITHM` - JWT signing algorithm (default: HS256)
- `BCRYPT_SALT_ROUNDS` - Password hashing rounds (default: 10)
- `CORS_ORIGIN` - Allowed CORS origins (default: *)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - Database connection string (for future database integration)

## How to Set Secrets in Replit
1. Go to your workspace
2. Find the "Secrets" tool in the left sidebar
3. Click "New Secret"
4. Enter the key name and value
5. Secrets are automatically available as `process.env.KEY_NAME`

## Security Note
Never put sensitive values like JWT secrets in .env files or commit them to version control!
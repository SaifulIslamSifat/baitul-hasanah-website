import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';

export const COOKIE_NAME = 'bh_token';

export const cookieOptions = {
  httpOnly: true,
  secure: env.isProd,
  // Frontend (Vercel) and API are on different sites in production, so SameSite=None is required there.
  // CSRF is mitigated separately by the origin check in middleware/security.js.
  sameSite: env.isProd ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export function signToken(userId) {
  return jwt.sign({ sub: String(userId) }, env.jwtSecret, { expiresIn: env.jwtExpiresIn, algorithm: 'HS256' });
}

// Loads the user from the cookie and re-checks their CURRENT status/role in the database,
// so suspending an account takes effect immediately.
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Authentication required' });
    if (user.status !== 'active') return res.status(403).json({ message: 'Account is not active', status: user.status });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Authentication required' });
  }
}

export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'Forbidden' });

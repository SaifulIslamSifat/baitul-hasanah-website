import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

// Brute-force protection for login/register.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again later.' },
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// Cookie auth + SameSite=None needs an explicit CSRF guard:
// state-changing requests must come from an allowed origin.
export function originCheck(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const origin = req.get('origin');
  if (origin && env.clientOrigins.includes(origin)) return next();
  res.status(403).json({ message: 'Forbidden origin' });
}

export function notFound(req, res) {
  res.status(404).json({ message: 'Not found' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.name === 'ZodError') {
    return res.status(400).json({ message: 'Validation failed', errors: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })) });
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' }); // never leak internals
}

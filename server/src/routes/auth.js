import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from '../models/User.js';
import Member from '../models/Member.js';
import { COOKIE_NAME, cookieOptions, signToken, requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';

const router = Router();

const mobile = z.string().trim().regex(/^(\+?88)?01[3-9]\d{8}$/, 'Enter a valid Bangladeshi mobile number');
const password = z
  .string()
  .min(8, 'At least 8 characters')
  .max(72, 'At most 72 characters')
  .regex(/[A-Za-z]/, 'Must contain a letter')
  .regex(/\d/, 'Must contain a number');

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().toLowerCase().email().max(254),
    mobile,
    password,
    confirmPassword: z.string(),
  })
  .strict() // rejects unknown fields, so role/status can never be injected
  .refine((d) => d.password === d.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' });

const loginSchema = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(72) }).strict();

// Public registration: ALWAYS creates a pending general member. There is no public admin signup.
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    if (await User.exists({ email: data.email })) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }
    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      passwordHash,
      role: 'member',
      status: 'pending',
    });
    await Member.create({ user: user._id });
    res.status(201).json({ message: 'Registration received. An admin must approve your account before you can log in.' });
  } catch (e) {
    next(e);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password: pw } = loginSchema.parse(req.body);
    const user = await User.findOne({ email }).select('+passwordHash');
    // Same message for unknown email and wrong password (no account enumeration).
    const ok = user && (await bcrypt.compare(pw, user.passwordHash));
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Your account is not active yet', status: user.status });
    }
    user.lastLoginAt = new Date();
    await user.save();
    res.cookie(COOKIE_NAME, signToken(user._id), cookieOptions);
    res.json({ user: user.toSafeJSON() });
  } catch (e) {
    next(e);
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  res.json({ message: 'Logged out' });
});

router.get('/me', requireAuth, (req, res) => res.json({ user: req.user.toSafeJSON() }));

export default router;

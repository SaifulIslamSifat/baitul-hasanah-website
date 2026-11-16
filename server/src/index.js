import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import { apiLimiter, originCheck, notFound, errorHandler } from './middleware/security.js';

const app = express();
app.set('trust proxy', 1); // behind the hosting provider's proxy (correct client IPs for rate limiting)

app.use(helmet());
app.use(
  cors({
    origin: (origin, cb) => (!origin || env.clientOrigins.includes(origin) ? cb(null, true) : cb(new Error('CORS blocked'))),
    credentials: true,
  })
);
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());
app.use(mongoSanitize()); // strips $ and . operators from input (NoSQL injection)
app.use('/api', apiLimiter, originCheck);

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
// Phase 3+: /api/me/*, /api/admin/*, /api/public/* (aggregates only)

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => app.listen(env.port, () => console.log(`API listening on :${env.port}`)))
  .catch((e) => {
    console.error('Failed to start:', e.message);
    process.exit(1);
  });

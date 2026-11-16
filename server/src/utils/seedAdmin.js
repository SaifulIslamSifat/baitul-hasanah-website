// Creates the FIRST admin from environment variables. Run once: npm run seed:admin
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import '../config/env.js';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Member from '../models/Member.js';

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
  console.error('Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (min 12 chars) in .env first.');
  process.exit(1);
}

await connectDB();
const email = ADMIN_EMAIL.trim().toLowerCase();
if (await User.exists({ email })) {
  console.log('A user with that email already exists. Nothing changed.');
} else {
  const user = await User.create({
    fullName: ADMIN_NAME,
    email,
    mobile: '00000000000', // placeholder; admin can update later
    passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
    role: 'admin',
    status: 'active',
    approvedAt: new Date(),
  });
  await Member.create({ user: user._id, memberType: 'policy' });
  console.log(`Admin created: ${email}. Remove ADMIN_PASSWORD from .env now.`);
}
await mongoose.disconnect();

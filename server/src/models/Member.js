import mongoose from 'mongoose';

// Organizational membership profile linked 1:1 to a website account.
// Constitution (Art. 3): two kinds of members — general and policy-making.
const memberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    memberType: { type: String, enum: ['general', 'policy'], default: 'general' },
    joinedAt: { type: Date, default: Date.now },
    // Monthly commitment in BDT (constitution minimum: 100). Whole taka only.
    monthlyPledge: { type: Number, default: 100, min: 100, validate: Number.isInteger },
    notes: { type: String, maxlength: 1000 },
  },
  { timestamps: true }
);

export default mongoose.model('Member', memberSchema);

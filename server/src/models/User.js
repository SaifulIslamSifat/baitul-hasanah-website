import mongoose from 'mongoose';

// Website account. NID / identity documents are intentionally NOT stored here.
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    mobile: { type: String, required: true, trim: true, maxlength: 20 },
    passwordHash: { type: String, required: true, select: false },
    // 'member' = general member; 'admin' = authorized committee member
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
    // New accounts start as 'pending' until an admin approves them.
    status: { type: String, enum: ['pending', 'active', 'rejected', 'suspended', 'inactive'], default: 'pending', index: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: Date,
    lastLoginAt: Date,
  },
  { timestamps: true }
);

userSchema.methods.toSafeJSON = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    mobile: this.mobile,
    role: this.role,
    status: this.status,
    createdAt: this.createdAt,
  };
};

export default mongoose.model('User', userSchema);

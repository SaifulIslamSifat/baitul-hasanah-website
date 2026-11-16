import mongoose from 'mongoose';

const { Schema } = mongoose;

export const Announcement = mongoose.model(
  'Announcement',
  new Schema(
    {
      title: { bn: { type: String, required: true, maxlength: 200 }, en: { type: String, maxlength: 200 } },
      body: { bn: { type: String, required: true, maxlength: 10000 }, en: { type: String, maxlength: 10000 } },
      category: { type: String, enum: ['announcement', 'meeting', 'community', 'project', 'event'], default: 'announcement' },
      imageUrls: [{ type: String, maxlength: 500 }],
      published: { type: Boolean, default: false, index: true },
      publishedAt: Date,
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
  )
);

// Only aggregated, admin-approved figures. Never contains per-member data.
export const FinancialReport = mongoose.model(
  'FinancialReport',
  new Schema(
    {
      period: { type: String, enum: ['monthly', 'yearly'], required: true },
      year: { type: Number, required: true, index: true },
      month: { type: Number, min: 1, max: 12 }, // only for monthly
      totals: {
        monthlyDonations: { type: Number, default: 0 },
        voluntaryDeposits: { type: Number, default: 0 },
        qardDisbursed: { type: Number, default: 0 },
        qardRepaid: { type: Number, default: 0 },
        outstandingLoans: { type: Number, default: 0 },
        availableBalance: { type: Number, default: 0 },
      },
      published: { type: Boolean, default: false, index: true },
      publishedAt: Date,
      approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
  )
);

export const AuditLog = mongoose.model(
  'AuditLog',
  new Schema(
    {
      actor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      action: { type: String, required: true }, // e.g. donation.update, donation.delete
      entity: { type: String, required: true },
      entityId: Schema.Types.ObjectId,
      before: Schema.Types.Mixed,
      after: Schema.Types.Mixed,
      ip: String,
    },
    { timestamps: { createdAt: true, updatedAt: false } }
  )
);

// Single document holding editable site content (contact, committee, payment info, activity statuses).
export const OrganizationSettings = mongoose.model(
  'OrganizationSettings',
  new Schema(
    {
      key: { type: String, default: 'main', unique: true },
      contact: { email: String, phone: String, address: String },
      social: { facebook: String, youtube: String },
      memberFormUrl: String,
      paymentInstructions: { bn: String, en: String },
      activityStatus: { type: Map, of: { type: String, enum: ['active', 'planned'] } },
      committee: [{ name: String, role: String, photoUrl: String, order: Number }],
    },
    { timestamps: true }
  )
);

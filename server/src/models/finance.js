import mongoose from 'mongoose';

const { Schema } = mongoose;
const ref = (name, extra = {}) => ({ type: Schema.Types.ObjectId, ref: name, ...extra });
// All money is stored as whole BDT (integers) to avoid floating-point errors.
const taka = { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: 'Amount must be a whole number' } };
const METHODS = ['cash', 'bkash', 'nagad', 'bank', 'other'];

// ---- Ledger: every money movement, one category each (never mixed into one balance) ----
export const LEDGER_CATEGORIES = [
  'monthly_donation',
  'voluntary_deposit',
  'qard_disbursement',
  'qard_repayment',
  'other_donation',
  'deposit_withdrawal',
];

const transactionSchema = new Schema(
  {
    txId: { type: String, required: true, unique: true }, // e.g. BH-20261117-ab12cd
    category: { type: String, enum: LEDGER_CATEGORIES, required: true, index: true },
    member: ref('User', { index: true }), // optional (e.g. other donations)
    amount: taka,
    date: { type: Date, required: true, index: true },
    method: { type: String, enum: METHODS, default: 'cash' },
    reference: { type: String, trim: true, maxlength: 100 }, // bKash/Nagad trx id etc.
    recordedBy: ref('User', { required: true }),
    verified: { type: Boolean, default: false },
    notes: { type: String, maxlength: 500 },
    // Link to the domain record that produced this entry
    source: { kind: { type: String, enum: ['donation', 'deposit', 'loan', 'repayment', 'manual'] }, id: Schema.Types.ObjectId },
  },
  { timestamps: true }
);
// Prevent the same external payment reference from being recorded twice.
transactionSchema.index({ reference: 1, method: 1 }, { unique: true, partialFilterExpression: { reference: { $type: 'string' } } });

// ---- Monthly donations ----
const donationSchema = new Schema(
  {
    member: ref('User', { required: true, index: true }),
    month: { type: String, required: true, match: /^\d{4}-(0[1-9]|1[0-2])$/ }, // YYYY-MM
    amount: taka,
    paymentDate: { type: Date, required: true },
    method: { type: String, enum: METHODS, default: 'cash' },
    reference: { type: String, trim: true, maxlength: 100 },
    verified: { type: Boolean, default: false },
    recordedBy: ref('User', { required: true }),
    transaction: ref('Transaction'),
  },
  { timestamps: true }
);

// ---- Voluntary deposits & withdrawals (separate from donations) ----
const depositSchema = new Schema(
  {
    member: ref('User', { required: true, index: true }),
    type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    amount: taka,
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'completed' },
    recordedBy: ref('User', { required: true }),
    transaction: ref('Transaction'),
    notes: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

// ---- Qard Hasan ----
const applicationSchema = new Schema(
  {
    member: ref('User', { required: true, index: true }),
    reason: { type: String, required: true, maxlength: 1000 },
    amount: taka,
    proposedInstallments: { type: Number, required: true, min: 1, max: 60 },
    status: { type: String, enum: ['submitted', 'under_review', 'approved', 'rejected', 'withdrawn'], default: 'submitted', index: true },
    reviewedBy: ref('User'),
    reviewedAt: Date,
    decisionNote: { type: String, maxlength: 1000 },
  },
  { timestamps: true }
);

const loanSchema = new Schema(
  {
    application: ref('QardHasanApplication', { required: true, unique: true }),
    member: ref('User', { required: true, index: true }),
    principal: taka, // No interest, profit or automatic charges are ever added.
    disbursedAt: { type: Date, required: true },
    schedule: [
      {
        dueDate: { type: Date, required: true },
        amount: taka,
      },
    ],
    status: { type: String, enum: ['active', 'completed', 'rescheduled'], default: 'active', index: true },
    approvedBy: ref('User', { required: true }),
    transaction: ref('Transaction'),
  },
  { timestamps: true }
);

const repaymentSchema = new Schema(
  {
    loan: ref('QardHasanLoan', { required: true, index: true }),
    member: ref('User', { required: true, index: true }),
    amount: taka,
    paidAt: { type: Date, required: true },
    method: { type: String, enum: METHODS, default: 'cash' },
    reference: { type: String, trim: true, maxlength: 100 },
    recordedBy: ref('User', { required: true }),
    transaction: ref('Transaction'),
  },
  { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
export const Donation = mongoose.model('Donation', donationSchema);
export const Deposit = mongoose.model('Deposit', depositSchema);
export const QardHasanApplication = mongoose.model('QardHasanApplication', applicationSchema);
export const QardHasanLoan = mongoose.model('QardHasanLoan', loanSchema);
export const LoanRepayment = mongoose.model('LoanRepayment', repaymentSchema);

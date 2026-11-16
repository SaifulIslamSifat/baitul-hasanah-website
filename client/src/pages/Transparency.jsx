import { useState } from 'react';
import { Wallet, PiggyBank, HandCoins, Undo2, Hourglass, Landmark, ShieldCheck } from 'lucide-react';
import { PageHero, Notice } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';

// Phase 1: no public reports are published yet, so no figures are shown (nothing is invented).
// Phase 5 will load published aggregates from GET /api/reports/public.
const metricDefs = [
  ['donations', Wallet],
  ['deposits', PiggyBank],
  ['disbursed', HandCoins],
  ['repaid', Undo2],
  ['outstanding', Hourglass],
  ['balance', Landmark],
];

export default function Transparency() {
  const { t } = useLang();
  const r = t.transparency;
  useSeo(r.title, r.sub);
  const thisYear = new Date().getFullYear();
  const [view, setView] = useState('monthly');
  const [year, setYear] = useState(String(thisYear));
  const [month, setMonth] = useState('all');
  const years = Array.from({ length: thisYear - 2022 + 1 }, (_, i) => String(thisYear - i));
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <PageHero title={r.title} sub={r.sub} />
      <div className="container-page space-y-8 py-14">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl border border-emerald-900/15 bg-white p-1">
            {['monthly', 'yearly'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${view === v ? 'bg-emerald-800 text-white' : 'text-emerald-800 hover:bg-emerald-50'}`}
              >
                {r[v]}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm">
            {r.year}
            <select className="field !w-auto !py-1.5" value={year} onChange={(e) => setYear(e.target.value)}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </label>
          {view === 'monthly' && (
            <label className="flex items-center gap-2 text-sm">
              {r.month}
              <select className="field !w-auto !py-1.5" value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="all">{r.all}</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </label>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metricDefs.map(([key, Icon]) => (
            <div key={key} className="card">
              <div className="flex items-center gap-3 text-emerald-800">
                <Icon size={22} />
                <span className="text-sm font-medium text-slate-600">{r.metrics[key]}</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-300">—</p>
            </div>
          ))}
        </div>

        <div className="card text-center text-slate-500">{r.empty}</div>

        <Notice tone="green">
          <span className="flex items-center gap-2"><ShieldCheck size={16} /> {r.privacy}</span>
        </Notice>
      </div>
    </>
  );
}

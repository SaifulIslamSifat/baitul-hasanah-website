import { Info } from 'lucide-react';

export function PageHero({ title, sub }) {
  return (
    <section className="border-b border-emerald-900/5 bg-gradient-to-b from-emerald-50/70 to-white">
      <div className="container-page py-12 text-center sm:py-16">
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        <div className="gold-rule" />
        {sub && <p className="mx-auto mt-4 max-w-2xl text-slate-600">{sub}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({ title, sub, center = true }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      {center && <div className="gold-rule" />}
      {sub && <p className={`mt-3 max-w-2xl text-slate-600 ${center ? 'mx-auto' : ''}`}>{sub}</p>}
    </div>
  );
}

export function Notice({ children, tone = 'gold' }) {
  const tones = {
    gold: 'border-gold-300 bg-gold-50 text-gold-700',
    green: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  };
  return (
    <div className={`flex gap-3 rounded-xl border p-4 text-sm ${tones[tone]}`} role="note">
      <Info size={18} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function StatusBadge({ active, t }) {
  return <span className={active ? 'badge-active' : 'badge-planned'}>{active ? t.common.active : t.common.planned}</span>;
}

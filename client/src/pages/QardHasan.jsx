import { Link } from 'react-router-dom';
import { CheckCircle2, ListChecks } from 'lucide-react';
import { PageHero, Notice } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';

export default function QardHasan() {
  const { t, lang } = useLang();
  const q = t.qard;
  useSeo(q.title, q.what.slice(0, 150));
  const num = (n) => n.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en');

  return (
    <>
      <PageHero title={q.title} sub={q.sub} />
      <div className="container-page max-w-4xl space-y-8 py-14">
        <div className="card">
          <h2 className="text-xl">{q.whatTitle}</h2>
          <p className="mt-3 leading-relaxed">{q.what}</p>
        </div>

        <div className="card">
          <h2 className="text-xl">{q.whoTitle}</h2>
          <p className="mt-3 leading-relaxed">{q.who}</p>
        </div>

        <div className="card">
          <h2 className="flex items-center gap-2 text-xl"><ListChecks size={22} className="text-emerald-700" />{q.stepsTitle}</h2>
          <ol className="mt-4 space-y-3">
            {q.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">{num(i + 1)}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="card">
          <h2 className="text-xl">{q.repayTitle}</h2>
          <ul className="mt-4 space-y-3">
            {q.repay.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-700" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <Notice>
          <strong>{q.noticeTitle}: </strong>
          {q.notice}
        </Notice>

        <div className="text-center">
          <Link to="/login" className="btn-primary">{q.apply}</Link>
          <p className="mt-3 text-sm text-slate-500">{q.applyHint}</p>
        </div>
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { PageHero, StatusBadge } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';
import { activities } from '../lib/activities.js';

export default function Activities() {
  const { t } = useLang();
  useSeo(t.activities.title, t.activities.sub);

  return (
    <>
      <PageHero title={t.activities.title} sub={t.activities.sub} />
      <div className="container-page space-y-6 py-14">
        {activities.map(({ key, icon: Icon, active }) => {
          const [title, body] = t.activities.items[key];
          return (
            <section
              key={key}
              id={key}
              className={`card flex flex-col gap-4 sm:flex-row sm:items-start ${active ? 'border-emerald-700/30 ring-1 ring-emerald-700/20' : ''}`}
            >
              <span className={`rounded-2xl p-4 ${active ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Icon size={28} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl">{title}</h2>
                  <StatusBadge active={active} t={t} />
                </div>
                <p className="mt-2 text-slate-600">{body}</p>
                {active && (
                  <Link to="/qard-hasan" className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:underline">
                    {t.common.learnMore} →
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

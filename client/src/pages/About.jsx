import { CalendarDays, ShieldCheck, Users } from 'lucide-react';
import { PageHero, SectionTitle } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';
import { activities } from '../lib/activities.js';

export default function About() {
  const { t, lang } = useLang();
  const a = t.about;
  useSeo(a.title, a.history.slice(0, 150));

  return (
    <>
      <PageHero title={a.title} />
      <div className="container-page space-y-16 py-14">
        <section className="grid gap-6 md:grid-cols-3">
          <div className="card md:col-span-2">
            <h2 className="text-xl">{a.historyTitle}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{a.history}</p>
          </div>
          <div className="card flex flex-col items-center justify-center text-center">
            <CalendarDays className="text-gold-600" size={30} />
            <p className="mt-2 text-sm text-slate-500">{a.estTitle}</p>
            <p className="text-xl font-bold text-emerald-900">{a.estValue}</p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h3 className="text-lg">{t.home.visionTitle}</h3>
            <p className="mt-2 text-slate-600">{t.home.vision}</p>
          </div>
          <div className="card">
            <h3 className="text-lg">{t.home.missionTitle}</h3>
            <p className="mt-2 text-slate-600">{t.home.mission}</p>
          </div>
        </section>

        <section>
          <SectionTitle title={a.objectivesTitle} />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {activities.map(({ key }, i) => (
              <li key={key} className="card flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-sm font-bold text-white">
                  {(i + 1).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en')}
                </span>
                <div>
                  <h4 className="font-semibold text-emerald-900">{t.activities.items[key][0]}</h4>
                  <p className="mt-1 text-sm text-slate-600">{t.activities.items[key][1]}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle title={a.principlesTitle} />
          <ul className="mx-auto mt-8 max-w-3xl space-y-3">
            {a.principles.map((p) => (
              <li key={p} className="card flex items-start gap-3 !p-4">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-700" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle title={a.governanceTitle} sub={a.governance} />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {a.memberTypes.map(([title, body]) => (
              <div key={title} className="card">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-emerald-700" />
                  <h4 className="font-semibold">{title}</h4>
                </div>
                <p className="mt-2 text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title={a.committeeTitle} />
          {/* Committee names/photos will come from the admin panel (organizationSettings). Nothing is invented here. */}
          <div className="card mx-auto mt-8 max-w-2xl text-center text-slate-500">{a.committeeEmpty}</div>
        </section>
      </div>
    </>
  );
}

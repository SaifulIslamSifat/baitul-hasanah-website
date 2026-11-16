import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Target, HandCoins, FileBarChart, Newspaper } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import { SectionTitle, StatusBadge } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';
import { activities } from '../lib/activities.js';

// Subtle, slow-moving geometric shapes behind the hero (no heavy patterns).
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl animate-drift-slow" />
      <div className="absolute -right-16 top-24 h-64 w-64 rounded-full bg-gold-100/80 blur-3xl animate-drift" />
      <svg className="absolute right-[8%] top-10 h-24 w-24 text-gold-300/50 animate-drift" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M50 4l12 26 28 4-20 20 5 28-25-14-25 14 5-28L10 34l28-4z" />
      </svg>
      <svg className="absolute bottom-6 left-[6%] h-20 w-20 text-emerald-300/40 animate-drift-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M50 4l12 26 28 4-20 20 5 28-25-14-25 14 5-28L10 34l28-4z" />
      </svg>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const h = t.home;
  useSeo(t.brand.name, h.heroIntro.slice(0, 150));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white">
        <HeroBackdrop />
        <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-5">
          <div className="animate-rise text-center lg:col-span-3 lg:text-left">
            <span className="badge bg-gold-100 text-gold-700">{h.since}</span>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{t.brand.name}</h1>
            <p className="mt-3 text-lg font-medium text-gold-700 sm:text-xl">{t.brand.tagline}।</p>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-600 lg:mx-0">{h.heroIntro}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link to="/about" className="btn-primary">
                {h.ctaAbout} <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn-outline">
                {h.ctaJoin}
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-2">
            <Logo size={300} className="drop-shadow-xl animate-rise max-h-[260px] sm:max-h-[300px]" />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container-page py-16">
        <SectionTitle title={h.overviewTitle} sub={h.overviewBody} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="card card-hover">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800"><Eye size={22} /></span>
              <h3 className="text-lg">{h.visionTitle}</h3>
            </div>
            <p className="mt-3 text-slate-600">{h.vision}</p>
          </div>
          <div className="card card-hover">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-gold-50 p-2.5 text-gold-600"><Target size={22} /></span>
              <h3 className="text-lg">{h.missionTitle}</h3>
            </div>
            <p className="mt-3 text-slate-600">{h.mission}</p>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionTitle title={h.activitiesTitle} sub={h.activitiesSub} />

          <div className="mt-10 overflow-hidden rounded-2xl bg-emerald-900 p-6 text-white shadow-lift sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span className="rounded-2xl bg-white/10 p-4 text-gold-300"><HandCoins size={32} /></span>
              <div className="flex-1">
                <span className="badge bg-gold-400 text-emerald-950">{t.common.active}</span>
                <h3 className="mt-2 text-xl !text-white">{h.activeHighlightTitle}</h3>
                <p className="mt-1 max-w-2xl text-emerald-100/90">{h.activeHighlightBody}</p>
              </div>
              <Link to="/qard-hasan" className="btn-gold shrink-0">
                {t.common.learnMore} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map(({ key, icon: Icon, active }) => {
              const [title, body] = t.activities.items[key];
              return (
                <Link to="/activities" key={key} className="card card-hover block">
                  <div className="flex items-start justify-between">
                    <span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800"><Icon size={22} /></span>
                    <StatusBadge active={active} t={t} />
                  </div>
                  <h3 className="mt-4 text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{body}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats (no invented numbers) */}
      <section className="container-page py-16">
        <SectionTitle title={h.statsTitle} sub={h.statsSub} />
        <div className="card mt-8 text-center text-slate-500">{h.statsEmpty}</div>
      </section>

      {/* Latest updates */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionTitle title={h.newsTitle} />
          <div className="card mt-8 flex flex-col items-center gap-3 text-center text-slate-500">
            <Newspaper size={28} className="text-emerald-700" />
            {h.newsEmpty}
            <Link to="/news" className="text-sm font-semibold text-emerald-800 hover:underline">
              {h.allNews}
            </Link>
          </div>
        </div>
      </section>

      {/* Transparency preview */}
      <section className="container-page py-16">
        <div className="card flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <span className="rounded-2xl bg-emerald-50 p-4 text-emerald-800"><FileBarChart size={30} /></span>
          <div className="flex-1">
            <h3 className="text-xl">{h.transTitle}</h3>
            <p className="mt-1 text-slate-600">{h.transBody}</p>
          </div>
          <Link to="/transparency" className="btn-primary shrink-0">{h.transCta}</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-800 px-6 py-12 text-center text-white shadow-lift">
          <h2 className="text-2xl !text-white sm:text-3xl">{h.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100/90">{h.ctaBody}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/register" className="btn-gold">{h.ctaJoin}</Link>
            <Link to="/constitution" className="btn border border-white/30 text-white hover:bg-white/10">
              {t.nav.constitution}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import Logo from './Logo.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

const links = [
  ['/', 'home'],
  ['/about', 'about'],
  ['/activities', 'activities'],
  ['/qard-hasan', 'qard'],
  ['/transparency', 'transparency'],
  ['/constitution', 'constitution'],
  ['/news', 'news'],
  ['/contact', 'contact'],
];

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkCls = ({ isActive }) =>
    `rounded-lg px-2.5 py-2 text-sm font-medium transition ${
      isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-emerald-50/60 hover:text-emerald-800'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur transition ${
        scrolled ? 'border-emerald-900/10 shadow-card' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5" aria-label={t.brand.name}>
          <Logo size={44} />
          <span className="hidden leading-tight sm:block">
            <span className="block text-base font-bold text-emerald-900">{t.brand.name}</span>
            <span className="block text-[11px] text-gold-700">{t.brand.en}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {links.map(([to, key]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkCls}>
              {t.nav[key]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-900/15 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
            aria-label={t.common.language}
          >
            <Languages size={15} />
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
          <Link to="/login" className="btn-outline hidden !py-1.5 md:inline-flex">
            {t.nav.login}
          </Link>
          <Link to="/register" className="btn-primary hidden !py-1.5 md:inline-flex">
            {t.nav.register}
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-50 xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t.nav.menu}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-emerald-900/10 bg-white xl:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map(([to, key]) => (
              <NavLink key={to} to={to} end={to === '/'} className={linkCls}>
                {t.nav[key]}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2">
              <Link to="/login" className="btn-outline flex-1">
                {t.nav.login}
              </Link>
              <Link to="/register" className="btn-primary flex-1">
                {t.nav.register}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

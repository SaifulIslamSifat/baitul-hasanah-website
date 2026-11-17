import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Languages,
  ChevronDown,
  Info,
  FileText,
  FileBarChart,
  Sparkles,
  HandCoins,
} from 'lucide-react';
import Logo from './Logo.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

function DropdownMenu({ label, isActive, children, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 120);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${
          isActive || isOpen
            ? 'bg-emerald-50 text-emerald-800'
            : 'text-slate-600 hover:bg-emerald-50/60 hover:text-emerald-800'
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-800' : 'text-slate-400'}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-2xl border border-emerald-900/10 bg-white/95 p-2 shadow-xl backdrop-blur-md ring-1 ring-black/5 animate-in fade-in zoom-in-95 before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']">
          <div className="flex flex-col gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive: itemActive }) =>
                    `group flex items-start gap-3 rounded-xl p-2.5 transition text-left ${
                      itemActive
                        ? 'bg-emerald-50/90 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-emerald-50/60 hover:text-emerald-900'
                    }`
                  }
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-800 group-hover:bg-emerald-100 group-hover:text-emerald-900">
                    <Icon size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-medium leading-tight">{item.title}</span>
                      {item.badge && (
                        <span className="badge-active text-[10px] py-0 px-1.5">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.sub && (
                      <p className="mt-0.5 text-xs text-slate-500 leading-snug line-clamp-1">
                        {item.sub}
                      </p>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(true);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(true);
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

  const isAboutActive = ['/about', '/constitution', '/transparency'].includes(pathname);
  const isActivitiesActive = ['/activities', '/qard-hasan'].includes(pathname);

  const aboutSubItems = [
    { to: '/about', title: t.nav.about, sub: t.nav.aboutSub, icon: Info },
    { to: '/constitution', title: t.nav.constitution, sub: t.nav.constitutionSub, icon: FileText },
    { to: '/transparency', title: t.nav.transparency, sub: t.nav.transparencySub, icon: FileBarChart },
  ];

  const activitiesSubItems = [
    { to: '/activities', title: t.nav.allActivities, sub: t.nav.activitiesSub, icon: Sparkles },
    { to: '/qard-hasan', title: t.nav.qard, sub: t.nav.qardSub, icon: HandCoins, badge: t.common.active },
  ];

  const singleLinkCls = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${
      isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-emerald-50/60 hover:text-emerald-800'
    }`;

  const mobileSubLinkCls = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
      isActive ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-50'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition ${
        scrolled ? 'border-emerald-900/10 shadow-card' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={t.brand.name}>
          <Logo size={42} />
          <span className="hidden leading-tight sm:block whitespace-nowrap">
            <span className="block text-base font-bold text-emerald-900">{t.brand.name}</span>
            <span className="block text-[11px] text-gold-700">{t.brand.en}</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={singleLinkCls}>
            {t.nav.home}
          </NavLink>

          <DropdownMenu
            label={t.nav.about}
            isActive={isAboutActive}
            items={aboutSubItems}
          />

          <DropdownMenu
            label={t.nav.activities}
            isActive={isActivitiesActive}
            items={activitiesSubItems}
          />

          <NavLink to="/news" className={singleLinkCls}>
            {t.nav.news}
          </NavLink>

          <NavLink to="/contact" className={singleLinkCls}>
            {t.nav.contact}
          </NavLink>
        </nav>

        {/* Actions (Language Switcher, Login, Register, Mobile Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-900/15 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 whitespace-nowrap transition"
            aria-label={t.common.language}
          >
            <Languages size={15} />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>
          <Link to="/login" className="btn-outline hidden !py-1.5 md:inline-flex whitespace-nowrap">
            {t.nav.login}
          </Link>
          <Link to="/register" className="btn-primary hidden !py-1.5 md:inline-flex whitespace-nowrap">
            {t.nav.register}
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t.nav.menu}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="border-t border-emerald-900/10 bg-white shadow-lg lg:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-4">
            <NavLink to="/" end className={singleLinkCls}>
              {t.nav.home}
            </NavLink>

            {/* Mobile About Accordion */}
            <div className="rounded-xl border border-emerald-900/5 bg-slate-50/50 p-1.5">
              <button
                type="button"
                onClick={() => setMobileAboutOpen((v) => !v)}
                className="flex w-full items-center justify-between px-2.5 py-1.5 text-sm font-semibold text-slate-800"
              >
                <span>{t.nav.about}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileAboutOpen && (
                <div className="mt-1 flex flex-col gap-0.5 pl-2">
                  {aboutSubItems.map((item) => (
                    <NavLink key={item.to} to={item.to} className={mobileSubLinkCls}>
                      <item.icon size={15} className="text-emerald-700 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Activities Accordion */}
            <div className="rounded-xl border border-emerald-900/5 bg-slate-50/50 p-1.5">
              <button
                type="button"
                onClick={() => setMobileActivitiesOpen((v) => !v)}
                className="flex w-full items-center justify-between px-2.5 py-1.5 text-sm font-semibold text-slate-800"
              >
                <span>{t.nav.activities}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${mobileActivitiesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileActivitiesOpen && (
                <div className="mt-1 flex flex-col gap-0.5 pl-2">
                  {activitiesSubItems.map((item) => (
                    <NavLink key={item.to} to={item.to} className={mobileSubLinkCls}>
                      <item.icon size={15} className="text-emerald-700 shrink-0" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="badge-active text-[10px] py-0 px-1.5 ml-auto">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/news" className={singleLinkCls}>
              {t.nav.news}
            </NavLink>

            <NavLink to="/contact" className={singleLinkCls}>
              {t.nav.contact}
            </NavLink>

            <div className="mt-3 flex gap-2 pt-2 border-t border-slate-100">
              <Link to="/login" className="btn-outline flex-1 text-center justify-center">
                {t.nav.login}
              </Link>
              <Link to="/register" className="btn-primary flex-1 text-center justify-center">
                {t.nav.register}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import { Notice } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';
import { siteConfig } from '../lib/siteConfig.js';

// UI shells only. They are wired to the API in Phase 2 (POST /api/auth/register, /login).
function Shell({ title, children }) {
  return (
    <div className="container-page flex justify-center py-12">
      <div className="card w-full max-w-md">
        <div className="mb-4 flex flex-col items-center">
          <Logo size={88} />
          <h1 className="mt-3 text-2xl">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Login() {
  const { t } = useLang();
  const a = t.auth;
  useSeo(a.loginTitle);
  return (
    <Shell title={a.loginTitle}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Notice>{a.backendOff}</Notice>
        <div>
          <label className="label" htmlFor="email">{a.email}</label>
          <input id="email" type="email" autoComplete="email" className="field" disabled />
        </div>
        <div>
          <label className="label" htmlFor="pw">{a.password}</label>
          <input id="pw" type="password" autoComplete="current-password" className="field" disabled />
        </div>
        <button className="btn-primary w-full" disabled>{a.loginBtn}</button>
        <p className="text-center text-sm text-slate-600">
          {a.noAccount} <Link to="/register" className="font-semibold text-emerald-800 hover:underline">{t.nav.register}</Link>
        </p>
      </form>
    </Shell>
  );
}

export function Register() {
  const { t } = useLang();
  const a = t.auth;
  useSeo(a.registerTitle);
  const url = siteConfig.memberFormUrl;
  return (
    <Shell title={a.registerTitle}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Notice>{a.pendingNote}</Notice>
        <div>
          <label className="label" htmlFor="fn">{a.fullName}</label>
          <input id="fn" autoComplete="name" className="field" disabled />
        </div>
        <div>
          <label className="label" htmlFor="em">{a.email}</label>
          <input id="em" type="email" autoComplete="email" className="field" disabled />
        </div>
        <div>
          <label className="label" htmlFor="mb">{a.mobile}</label>
          <input id="mb" type="tel" autoComplete="tel" className="field" disabled />
        </div>
        <div>
          <label className="label" htmlFor="p1">{a.password}</label>
          <input id="p1" type="password" autoComplete="new-password" className="field" disabled />
        </div>
        <div>
          <label className="label" htmlFor="p2">{a.confirm}</label>
          <input id="p2" type="password" autoComplete="new-password" className="field" disabled />
        </div>
        <p className="text-xs text-slate-500">{a.noNid}</p>
        <button className="btn-primary w-full" disabled>{a.registerBtn}</button>
        <p className="text-center text-xs text-slate-500">{a.backendOff}</p>

        <div className="border-t border-slate-200 pt-4 text-center">
          {url ? (
            <a href={url} target="_blank" rel="noreferrer" className="btn-outline w-full">
              {a.officialForm} <ExternalLink size={14} />
            </a>
          ) : (
            <p className="text-sm text-slate-500">{a.formMissing}</p>
          )}
        </div>
        <p className="text-center text-sm text-slate-600">
          {a.haveAccount} <Link to="/login" className="font-semibold text-emerald-800 hover:underline">{t.nav.login}</Link>
        </p>
      </form>
    </Shell>
  );
}

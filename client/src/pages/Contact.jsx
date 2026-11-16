import { Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react';
import { PageHero, Notice } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';
import { siteConfig } from '../lib/siteConfig.js';

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  useSeo(c.title, c.sub);
  const { contact, social } = siteConfig;
  const na = <span className="text-slate-400">{t.common.notProvided}</span>;

  return (
    <>
      <PageHero title={c.title} sub={c.sub} />
      <div className="container-page grid gap-8 py-14 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            [Mail, c.emailLabel, contact.email],
            [Phone, c.phoneLabel, contact.phone],
            [MapPin, c.addressLabel, contact.address],
          ].map(([Icon, label, value]) => (
            <div key={label} className="card flex items-center gap-4 !p-4">
              <span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800"><Icon size={20} /></span>
              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-medium">{value || na}</p>
              </div>
            </div>
          ))}
          <div className="card !p-4">
            <p className="text-xs text-slate-500">{c.socialLabel}</p>
            <div className="mt-2 flex gap-3 text-emerald-800">
              {social.facebook ? <a href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a> : null}
              {social.youtube ? <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a> : null}
              {!social.facebook && !social.youtube && na}
            </div>
          </div>
        </div>

        {/* Form is disabled until the backend endpoint exists; no fake "success" is shown. */}
        <form className="card space-y-4 lg:col-span-3" onSubmit={(e) => e.preventDefault()}>
          <Notice>{c.unavailable}</Notice>
          <div>
            <label className="label" htmlFor="cname">{c.name}</label>
            <input id="cname" className="field" disabled />
          </div>
          <div>
            <label className="label" htmlFor="cemail">{c.email}</label>
            <input id="cemail" type="email" className="field" disabled />
          </div>
          <div>
            <label className="label" htmlFor="cmsg">{c.message}</label>
            <textarea id="cmsg" rows={5} className="field" disabled />
          </div>
          <button className="btn-primary" disabled>{c.send}</button>
        </form>
      </div>
    </>
  );
}

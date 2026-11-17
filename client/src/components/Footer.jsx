import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react';
import Logo from './Logo.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { siteConfig } from '../lib/siteConfig.js';

export default function Footer() {
  const { t, lang } = useLang();
  const { contact, social } = siteConfig;
  const address = lang === 'en' && contact.addressEn ? contact.addressEn : contact.address;
  const quick = [
    ['/about', 'about'],
    ['/activities', 'activities'],
    ['/qard-hasan', 'qard'],
    ['/transparency', 'transparency'],
    ['/constitution', 'constitution'],
    ['/contact', 'contact'],
  ];
  const na = <span className="text-emerald-200/60">{t.common.notProvided}</span>;

  return (
    <footer className="mt-20 bg-emerald-950 text-emerald-100">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={64} className="rounded-lg bg-white p-1" />
            <div>
              <p className="text-lg font-bold text-white">{t.brand.name}</p>
              <p className="text-xs text-gold-300">{t.brand.en}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-emerald-100/80">{t.brand.tagline}</p>
          <p className="mt-1 text-sm text-emerald-100/60">{t.footer.about}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-300">{t.footer.links}</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {quick.map(([to, key]) => (
              <li key={to}>
                <Link to={to} className="text-emerald-100/80 hover:text-white">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-300">{t.footer.contact}</h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-emerald-400" />
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="text-emerald-100/90 hover:text-white hover:underline">
                  {contact.email}
                </a>
              ) : na}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-emerald-400" />
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="text-emerald-100/90 hover:text-white hover:underline">
                  {contact.phone}
                </a>
              ) : na}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-emerald-400" />
              <span className="text-emerald-100/90">{address || na}</span>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white"><Facebook size={20} /></a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-white"><Youtube size={20} /></a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-emerald-100/60">
        © {new Date().getFullYear()} {t.brand.name} · {t.footer.rights}
      </div>
    </footer>
  );
}

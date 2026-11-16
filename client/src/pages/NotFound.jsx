import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';

export default function NotFound() {
  const { t } = useLang();
  useSeo('404');
  return (
    <div className="container-page flex flex-col items-center py-20 text-center">
      <Logo size={110} />
      <p className="mt-6 text-6xl font-bold text-gold-500">404</p>
      <h1 className="mt-2 text-2xl">{t.notFound.title}</h1>
      <p className="mt-2 text-slate-600">{t.notFound.body}</p>
      <Link to="/" className="btn-primary mt-6">{t.notFound.back}</Link>
    </div>
  );
}

import { Newspaper } from 'lucide-react';
import { PageHero } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';

// Phase 5 will list published announcements from GET /api/announcements.
export default function News() {
  const { t } = useLang();
  useSeo(t.news.title, t.news.sub);
  return (
    <>
      <PageHero title={t.news.title} sub={t.news.sub} />
      <div className="container-page max-w-3xl py-14">
        <div className="card flex flex-col items-center gap-3 text-center text-slate-500">
          <Newspaper size={30} className="text-emerald-700" />
          {t.news.empty}
        </div>
      </div>
    </>
  );
}

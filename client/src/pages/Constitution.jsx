import { Download, FileText } from 'lucide-react';
import { PageHero, Notice } from '../components/ui.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../lib/useSeo.js';
import { siteConfig } from '../lib/siteConfig.js';

export default function Constitution() {
  const { t } = useLang();
  const c = t.constitution;
  useSeo(c.title, c.draftNotice);

  return (
    <>
      <PageHero title={c.title} />
      <div className="container-page grid gap-10 py-14 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="card sticky top-24 !p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-900"><FileText size={16} /> {c.title}</p>
            <ul className="space-y-1 text-sm">
              {c.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <a href={siteConfig.constitution.pdfUrl} download className="btn-primary mt-4 w-full">
              <Download size={16} /> {c.download}
            </a>
          </div>
        </aside>

        <div className="space-y-6 lg:col-span-3">
          {siteConfig.constitution.isDraft && (
            <Notice>
              <span className="badge-draft mr-2">{t.common.draft}</span>
              {c.draftNotice}
            </Notice>
          )}
          {c.sections.map((s) => (
            <section key={s.id} id={s.id} className="card scroll-mt-24">
              <h2 className="text-xl">{s.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-gold-500">
                {s.items.map((it) => <li key={it} className="leading-relaxed">{it}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

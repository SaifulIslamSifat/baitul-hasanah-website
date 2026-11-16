import { useEffect } from 'react';

// Sets a per-page <title> and meta description (SEO-friendly titles).
export function useSeo(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | বায়তুল হাসানাহ্‌ · Baitul Hasanah` : 'বায়তুল হাসানাহ্‌ | Baitul Hasanah';
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.name = 'description';
        document.head.appendChild(m);
      }
      m.content = description;
    }
  }, [title, description]);
}

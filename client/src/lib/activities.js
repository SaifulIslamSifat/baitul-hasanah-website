import { HandCoins, BookOpen, Compass, Landmark, Library, Palette } from 'lucide-react';

// `active` is the default status taken from the constitution (only Qard Hasan is running).
// Later the admin panel can override this via organizationSettings.
export const activities = [
  { key: 'qard', icon: HandCoins, active: true },
  { key: 'quran', icon: BookOpen, active: false },
  { key: 'counseling', icon: Compass, active: false },
  { key: 'mosque', icon: Landmark, active: false },
  { key: 'library', icon: Library, active: false },
  { key: 'culture', icon: Palette, active: false },
];

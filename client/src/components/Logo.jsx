// The official emblem is displayed unmodified: only uniform scaling via height (width auto).
export default function Logo({ size = 48, className = '' }) {
  return (
    <img
      src={size > 128 ? '/logo.png' : '/logo-small.png'}
      alt="বায়তুল হাসানাহ্‌ — Baitul Hasanah emblem"
      style={{ height: size, width: 'auto' }}
      className={`select-none object-contain ${className}`}
      draggable="false"
    />
  );
}

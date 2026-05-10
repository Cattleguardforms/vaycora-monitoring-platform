import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'OBS Reviews', href: '/obs-reviews' },
  { label: 'Assets', href: '/assets' },
  { label: 'Admin', href: '/admin' },
  { label: 'Branding', href: '/admin/branding' }
];

export function AppShell({ children, active = 'Dashboard' }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="appShell">
      <aside className="sidebar">
        <Link href="/dashboard" className="brandMark">
          <span className="brandIcon">VM</span>
          <span>
            Vaycora<br />Monitoring
          </span>
        </Link>

        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`navItem ${active === item.label ? 'active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="placeholderTag">
          Architecture mode: placeholder rooms are built first, then each room gets hardened as the workflow is wired.
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}

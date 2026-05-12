import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="loginPage">
      <section className="loginCard">
        <div className="loginHero">
          <div className="brandMark">
            <span className="brandIcon">VC</span>
            <span>Vaycora Command Center</span>
          </div>
          <h1 className="h1">Fleet, asset, sensor, and SunTech device command center.</h1>
          <p>
            One core platform for vehicles, assets, porta-potties, RVs, containers, BLE sensors, wired events, and future livestock tracking.
          </p>
          <div className="placeholderTag" style={{ marginTop: 24 }}>
            SunTech ingestion route is live at /api/vaycora/ingest/suntech. The Vaycora Core dashboard is live at /vaycora.
          </div>
        </div>
        <div className="loginForm">
          <div>
            <p className="kicker">Vaycora Core v0.1</p>
            <h2>Enter the command center</h2>
            <p className="muted">Demo access for now. Supabase Auth and tenant permissions will be wired next.</p>
          </div>
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Password" type="password" />
          <Link href="/vaycora" className="btn accent" style={{ textAlign: 'center' }}>Open Vaycora Core</Link>
          <Link href="/dashboard" className="btn secondary" style={{ textAlign: 'center' }}>Old Dashboard</Link>
        </div>
      </section>
    </main>
  );
}

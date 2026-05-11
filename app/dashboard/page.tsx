import { AppShell } from '@/components/AppShell';
import { ReviewTable } from '@/components/ReviewTable';
import { statCards } from '@/data/mock';

export default function DashboardPage() {
  return (
    <AppShell active="Dashboard">
      <section className="heroPanel">
        <div>
          <p className="kicker">Private Operations Command</p>
          <h1 className="h1">Asset intelligence with executive control.</h1>
          <p className="muted" style={{ maxWidth: 620 }}>
            A luxury command layer for monitored assets, OBS review events, sensor intelligence, chain-of-custody, service actions, and future fleet operations.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
            <span className="pill accent">White-label ready</span>
            <span className="pill">OBS module active</span>
            <span className="pill">Asset operations base</span>
          </div>
        </div>

        <div className="heroMetricGrid">
          {statCards.map((card) => (
            <div className="heroMetric" key={card.label}>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <div className="topbar">
            <div>
              <p className="kicker">Review Intelligence</p>
              <h2 className="cardTitle">Recent OBS Reviews</h2>
              <p className="muted">Live review table placeholder. This room will connect to Supabase and device events next.</p>
            </div>
            <span className="pill warn">Needs data wiring</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <ReviewTable />
          </div>
        </div>

        <div className="card">
          <p className="kicker">Build Sequence</p>
          <h2 className="cardTitle">Luxury shell first. Hardware-agnostic platform next.</h2>
          <p className="muted">
            This interface is being shaped as a premium white-label operations system, not a basic admin dashboard.
          </p>
          <div className="luxuryDivider" style={{ margin: '20px 0' }} />
          <div className="statusRail">
            <div className="statusItem"><span>UI/UX shell</span><span className="pill good">Upgraded</span></div>
            <div className="statusItem"><span>Branding layer</span><span className="pill warn">Preview</span></div>
            <div className="statusItem"><span>Supabase schema</span><span className="pill">Next</span></div>
            <div className="statusItem"><span>Device/sensor API</span><span className="pill">Next</span></div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

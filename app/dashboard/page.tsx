import { AppShell } from '@/components/AppShell';
import { ReviewTable } from '@/components/ReviewTable';
import { statCards } from '@/data/mock';

export default function DashboardPage() {
  return (
    <AppShell active="Dashboard">
      <div className="topbar">
        <div>
          <p className="kicker">OBS Monitoring</p>
          <h1 className="h1">Dashboard</h1>
          <p className="muted">Architecture room for review counts, flagged records, asset status, and recent activity.</p>
        </div>
        <span className="pill accent">Placeholder Architecture</span>
      </div>

      <section className="grid stats">
        {statCards.map((card) => (
          <div className="card" key={card.label}>
            <p className="muted">{card.label}</p>
            <div className="statNumber">{card.value}</div>
            <span className="pill">{card.note}</span>
          </div>
        ))}
      </section>

      <section className="grid two" style={{ marginTop: 18 }}>
        <div className="card">
          <h2 className="cardTitle">Recent OBS Reviews</h2>
          <p className="muted">This is the live review table placeholder. It will be connected to Supabase next.</p>
          <ReviewTable />
        </div>
        <div className="card">
          <h2 className="cardTitle">Room Build Plan</h2>
          <p className="muted">We are building the full architecture first with place cards, then hardening each room.</p>
          <div className="placeholderTag">Next room: Supabase schema and real auth.</div>
        </div>
      </section>
    </AppShell>
  );
}

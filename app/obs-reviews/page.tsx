import { AppShell } from '@/components/AppShell';
import { ReviewTable } from '@/components/ReviewTable';

export default function ObsReviewsPage() {
  return (
    <AppShell active="OBS Reviews">
      <section className="heroPanel">
        <div>
          <p className="kicker">OBS Review Intelligence</p>
          <h1 className="h1">Review records with executive control.</h1>
          <p className="muted" style={{ maxWidth: 620 }}>
            Premium review queue for OBS monitor records, flagged events, escalations, notes, decisions, and future sensor-driven alerts.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
            <span className="pill accent">Lane 8 module</span>
            <span className="pill">Queue workflow</span>
            <span className="pill">Decision history planned</span>
          </div>
        </div>

        <div className="heroMetricGrid">
          <div className="heroMetric"><strong>New</strong><span>Incoming reviews</span></div>
          <div className="heroMetric"><strong>Flag</strong><span>Escalation path</span></div>
          <div className="heroMetric"><strong>Clear</strong><span>Decision capture</span></div>
          <div className="heroMetric"><strong>Audit</strong><span>History later</span></div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <div className="topbar">
            <div>
              <p className="kicker">Review Queue</p>
              <h2 className="cardTitle">OBS review records</h2>
              <p className="muted">Live review queue placeholder for new, in review, flagged, cleared, escalated, and archived records.</p>
            </div>
            <button className="btn accent">Add Placeholder Review</button>
          </div>
          <div style={{ marginTop: 16 }}>
            <ReviewTable />
          </div>
        </div>

        <div className="card">
          <p className="kicker">Harden Tree</p>
          <h2 className="cardTitle">OBS module hardening</h2>
          <div className="statusRail">
            <div className="statusItem"><span>Review queue UI</span><span className="pill good">Built</span></div>
            <div className="statusItem"><span>Review detail room</span><span className="pill">Next</span></div>
            <div className="statusItem"><span>Status transitions</span><span className="pill">Planned</span></div>
            <div className="statusItem"><span>Decision audit trail</span><span className="pill warn">Planned</span></div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

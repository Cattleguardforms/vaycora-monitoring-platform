import Link from "next/link";
import { getPayloadAdminData } from "@/lib/vaycora/repository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatTime(value?: string | null) {
  if (!value) return "Never";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

export default async function PayloadAdminPage() {
  const { stats, payloads } = await getPayloadAdminData();

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <section className="heroPanel">
        <div>
          <Link href="/vaycora" className="pill">← Back to Command Center</Link>
          <p className="kicker" style={{ marginTop: 24 }}>Admin Debug Console</p>
          <h1 className="h1">SunTech payloads.</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            This page reads directly from Postgres and shows incoming SunTech payloads, parse status, matched devices, matched assets, generated events, and location writes.
          </p>
        </div>
        <div className="heroMetricGrid">
          <div className="heroMetric"><strong>{stats.payloads}</strong><span>Total payloads</span></div>
          <div className="heroMetric"><strong>{stats.parsedPayloads}</strong><span>Parsed</span></div>
          <div className="heroMetric"><strong>{stats.events}</strong><span>Events</span></div>
          <div className="heroMetric"><strong>{stats.locations}</strong><span>Locations</span></div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <p className="kicker">Database Status</p>
          <h2 className="cardTitle">Vaycora Core counters</h2>
          <div className="statusRail" style={{ marginTop: 18 }}>
            <div className="statusItem"><span><strong>Tenants</strong><br /><small className="muted">Customer account records</small></span><span className="pill">{stats.tenants}</span></div>
            <div className="statusItem"><span><strong>Devices</strong><br /><small className="muted">Provisioned SunTech hardware</small></span><span className="pill">{stats.devices}</span></div>
            <div className="statusItem"><span><strong>Assets</strong><br /><small className="muted">Tracked things assigned to devices</small></span><span className="pill">{stats.assets}</span></div>
            <div className="statusItem"><span><strong>Latest Payload</strong><br /><small className="muted">Most recent received_at timestamp</small></span><span className="pill accent">{formatTime(stats.latestPayloadAt)}</span></div>
          </div>
        </div>

        <div className="card">
          <p className="kicker">Test Endpoint</p>
          <h2 className="cardTitle">Live ingestion route</h2>
          <p className="muted">Post JSON or key-value SunTech payloads here. This is the endpoint we will give SunTech once we confirm the required protocol and ACK.</p>
          <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
            <code className="placeholderTag">POST /api/vaycora/ingest/suntech</code>
            <Link href="/api/vaycora/stats" className="btn secondary">Open Stats API</Link>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="topbar">
          <div>
            <p className="kicker">Payload Log</p>
            <h2 className="cardTitle">Recent SunTech messages</h2>
          </div>
          <span className="pill accent">{payloads.length} shown</span>
        </div>

        <div className="tableWrap" style={{ marginTop: 16 }}>
          <table>
            <thead>
              <tr>
                <th>Received</th>
                <th>Device</th>
                <th>Asset</th>
                <th>Status</th>
                <th>Events</th>
                <th>Locations</th>
                <th>Payload</th>
              </tr>
            </thead>
            <tbody>
              {payloads.map((payload) => (
                <tr key={payload.id}>
                  <td>{formatTime(payload.receivedAt)}<br /><span className="muted">{payload.sourceIp ?? "unknown IP"}</span></td>
                  <td><strong>{payload.deviceIdentifier ?? "Unknown"}</strong><br /><span className="muted">{payload.deviceModel ?? payload.deviceId ?? "unmatched"}</span></td>
                  <td>{payload.assetName ? <><strong>{payload.assetName}</strong><br /><span className="muted">{payload.assetType}</span></> : <span className="muted">No matched asset</span>}</td>
                  <td><span className={payload.parseStatus === "parsed" ? "pill good" : "pill bad"}>{payload.parseStatus}</span></td>
                  <td>{payload.eventCount}</td>
                  <td>{payload.locationCount}</td>
                  <td><Link className="pill" href={`/vaycora/admin/payloads/${payload.id}`}>View</Link></td>
                </tr>
              ))}
              {payloads.length === 0 ? <tr><td colSpan={7}>No payloads received yet.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

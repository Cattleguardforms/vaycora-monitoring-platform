import Link from "next/link";
import { getVaycoraDashboardData } from "@/lib/vaycora/repository";
import type { Asset } from "@/lib/vaycora/types";

function formatAssetType(type: string) {
  return type.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function formatTime(value?: string) {
  if (!value) return "Never";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function getDeviceForAsset(asset: Asset, devices: Awaited<ReturnType<typeof getVaycoraDashboardData>>["devices"]) {
  return devices.find((device) => device.id === asset.assignedDeviceId);
}

const portalCards = [
  ["Fleet", "OBD vehicles, ignition, trips, speed, VIN intelligence, video telematics, and vehicle health.", "Enabled"],
  ["Assets", "Trailers, containers, equipment, generators, solar trackers, and battery assets.", "Enabled"],
  ["Sanitation", "Porta-potty fill, tip, movement, site assignment, and service-needed workflows.", "Enabled"],
  ["Manufacturing", "Machine start/stop, runtime, downtime, fault state, and production-event visibility.", "Planned"],
  ["Admin", "Device provisioning, payload debugging, tenants, and integration operations.", "Enabled"],
];

export default async function VaycoraPage() {
  const { tenants, assets, devices, events, rawPayloads, source } = await getVaycoraDashboardData();
  const activeDevices = devices.filter((device) => device.status === "active").length;
  const serviceDueAssets = assets.filter((asset) => asset.status === "service_due" || asset.status === "alert").length;
  const tenant = tenants[0] ?? { name: "Vaycora", slug: "vaycora", status: "trial", enabledPortals: [] };

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <section className="heroPanel">
        <div>
          <p className="kicker">Vaycora Core v0.1</p>
          <h1 className="h1">Tracking core command center.</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            One SunTech ingestion core for vehicles, assets, sensors, porta-potties, RVs, containers, video telematics, manufacturing uptime, and future livestock workflows.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <span className="pill accent">SunTech ingestion live</span>
            <span className="pill">Data source: {source}</span>
            <span className="pill">Multi-portal architecture</span>
            <Link className="pill good" href="/vaycora/admin/payloads">Open Payload Admin</Link>
          </div>
        </div>
        <div className="heroMetricGrid">
          <div className="heroMetric"><strong>{assets.length}</strong><span>Tracked assets</span></div>
          <div className="heroMetric"><strong>{activeDevices}</strong><span>Active devices</span></div>
          <div className="heroMetric"><strong>{serviceDueAssets}</strong><span>Needs attention</span></div>
          <div className="heroMetric"><strong>{rawPayloads.length}</strong><span>Recent payloads</span></div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <div className="topbar">
            <div>
              <p className="kicker">Live Map Placeholder</p>
              <h2 className="cardTitle">Current asset positions</h2>
              <p className="muted">This is now reading asset/device/event data from Postgres when the database is available.</p>
            </div>
            <Link className="btn secondary" href="/api/vaycora/ingest/suntech">Ingestion Health</Link>
          </div>

          <div style={{ position: "relative", minHeight: 430, marginTop: 22, borderRadius: 28, overflow: "hidden", border: "1px solid var(--color-border)", background: "linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02))" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
            <div style={{ position: "absolute", left: "18%", top: "58%", width: "72%", height: 8, transform: "rotate(-12deg)", borderRadius: 999, background: "rgba(201,164,92,.28)" }} />
            <div style={{ position: "absolute", left: "52%", top: "14%", width: 8, height: "72%", transform: "rotate(45deg)", borderRadius: 999, background: "rgba(201,164,92,.22)" }} />
            {assets.map((asset, index) => {
              const positions = [
                { left: "38%", top: "45%" },
                { left: "55%", top: "35%" },
                { left: "68%", top: "58%" },
                { left: "46%", top: "66%" },
                { left: "72%", top: "30%" },
              ];
              const position = positions[index % positions.length];
              return (
                <Link key={asset.id} href={`/vaycora/assets/${asset.id}`} style={{ position: "absolute", ...position, transform: "translate(-50%, -50%)" }}>
                  <span className="brandIcon" style={{ width: 54, height: 54, fontSize: 18 }}>{asset.assetType === "vehicle" ? "V" : asset.assetType === "porta_potty" ? "P" : asset.assetType === "container" ? "C" : "A"}</span>
                  <span className="pill" style={{ position: "absolute", left: "50%", top: 62, transform: "translateX(-50%)", whiteSpace: "nowrap" }}>{asset.displayIdentifier}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <aside className="grid">
          <div className="card">
            <p className="kicker">Tenant</p>
            <h2 className="cardTitle">{tenant.name}</h2>
            <p className="muted">{tenant.slug} · {tenant.status}</p>
            <div className="luxuryDivider" style={{ margin: "18px 0" }} />
            <div className="statusRail">
              {portalCards.map(([title, body, status]) => (
                <div className="statusItem" key={title}>
                  <span><strong>{title}</strong><br /><small className="muted">{body}</small></span>
                  <span className={status === "Enabled" ? "pill good" : "pill warn"}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="grid two">
        <div className="card">
          <div className="topbar">
            <div>
              <p className="kicker">Asset Registry</p>
              <h2 className="cardTitle">Vehicles, containers, sanitation, machines, and field assets</h2>
            </div>
            <span className="pill accent">{rawPayloads.length} recent payloads</span>
          </div>
          <div className="tableWrap" style={{ marginTop: 16 }}>
            <table>
              <thead><tr><th>Asset</th><th>Type</th><th>Device</th><th>Status</th><th>Last Seen</th></tr></thead>
              <tbody>
                {assets.map((asset) => {
                  const device = getDeviceForAsset(asset, devices);
                  return (
                    <tr key={asset.id}>
                      <td><Link href={`/vaycora/assets/${asset.id}`}><strong>{asset.name}</strong><br /><span className="muted">{asset.displayIdentifier}</span></Link></td>
                      <td>{formatAssetType(asset.assetType)}</td>
                      <td><strong>{device?.model ?? "Unassigned"}</strong><br /><span className="muted">{device?.imei}</span></td>
                      <td><span className={asset.status === "service_due" ? "pill warn" : "pill good"}>{asset.status}</span></td>
                      <td>{formatTime(asset.lastSeenAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <p className="kicker">Latest Events</p>
          <div className="statusRail" style={{ marginTop: 16 }}>
            {events.map((event) => {
              const asset = assets.find((item) => item.id === event.assetId);
              return (
                <div className="statusItem" key={event.id}>
                  <span><strong>{event.eventType}</strong><br /><small className="muted">{asset?.name ?? "Unknown"} · {formatTime(event.eventTime)}</small></span>
                  <span className="pill">{event.source}</span>
                </div>
              );
            })}
            {events.length === 0 ? <p className="muted">No events yet. Send a test payload to see events here.</p> : null}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="topbar">
          <div>
            <p className="kicker">Payload Debugger</p>
            <h2 className="cardTitle">Recent SunTech payloads</h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link className="btn secondary" href="/vaycora/admin/payloads">Open Payload Admin</Link>
            <Link className="btn secondary" href="/api/vaycora/db-check">Database Check</Link>
          </div>
        </div>
        <div className="tableWrap" style={{ marginTop: 16 }}>
          <table>
            <thead><tr><th>Received</th><th>Device</th><th>Status</th><th>Format</th><th>Payload ID</th></tr></thead>
            <tbody>
              {rawPayloads.map((payload) => (
                <tr key={payload.id}>
                  <td>{formatTime(payload.receivedAt)}</td>
                  <td><strong>{payload.deviceIdentifier ?? "Unknown"}</strong><br /><span className="muted">{payload.deviceId ?? "unmatched"}</span></td>
                  <td><span className={payload.parseStatus === "parsed" ? "pill good" : "pill bad"}>{payload.parseStatus}</span></td>
                  <td>{payload.payloadFormat}</td>
                  <td><Link className="pill" href={`/vaycora/admin/payloads/${payload.id}`}>{payload.id}</Link></td>
                </tr>
              ))}
              {rawPayloads.length === 0 ? <tr><td colSpan={5}>No payloads yet.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

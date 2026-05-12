import Link from "next/link";
import { getPayloadAdminData, getVaycoraDashboardData } from "@/lib/vaycora/repository";
import { PortalHero } from "../../_components/portal-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supportedReports = [
  ["OBD", "Vehicle diagnostic report: VIN, DTC, MIL, odometer, fuel, supported PIDs"],
  ["OTR", "OBD travel report: trip, speed, RPM, fuel used, MPG, runtime"],
  ["PID", "Selected PID report: clean sensor values from licensed OBD data"],
  ["OVD", "Diagnostic trouble code report"],
  ["JID", "J1939 heavy-duty report for larger rigs and equipment"],
  ["FTR", "Fine tracking GPS report"],
];

export default async function SunTechParserPage() {
  const [{ rawPayloads }, { stats, payloads }] = await Promise.all([getVaycoraDashboardData(), getPayloadAdminData()]);

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <PortalHero
        kicker="SunTech Parser"
        title="Raw reports become usable fields."
        body="This room is for the integration layer. SunTech raw messages should be parsed here, then pushed into Fleet, Rentals, Assets, Sanitation, Manufacturing, and Video as real operational values."
        stats={[[String(stats.payloads), "Payloads"], [String(stats.parsedPayloads), "Parsed"], [String(stats.events), "Events"], [String(rawPayloads.length), "Recent"]]}
      />

      <section className="grid two">
        <div className="card">
          <p className="kicker">Supported SunTech Reports</p>
          <h2 className="cardTitle">Protocol rooms</h2>
          <div className="statusRail" style={{ marginTop: 18 }}>
            {supportedReports.map(([code, description]) => (
              <div className="statusItem" key={code}>
                <span><strong>{code}</strong><br /><small className="muted">{description}</small></span>
                <span className="pill">Parser</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="kicker">Data Flow</p>
          <h2 className="cardTitle">Where the data belongs</h2>
          <div className="statusRail" style={{ marginTop: 18 }}>
            <div className="statusItem"><span><strong>Fuel / VIN / DTC</strong><br /><small className="muted">Goes to Fleet and Rentals.</small></span><Link className="pill" href="/vaycora/fleet">Fleet</Link></div>
            <div className="statusItem"><span><strong>Geofence / return readiness</strong><br /><small className="muted">Goes to Rental Protection.</small></span><Link className="pill" href="/vaycora/rentals">Rentals</Link></div>
            <div className="statusItem"><span><strong>Fill / battery / door</strong><br /><small className="muted">Goes to Sanitation or Assets.</small></span><Link className="pill" href="/vaycora/assets">Assets</Link></div>
            <div className="statusItem"><span><strong>Camera / ADAS / DMS</strong><br /><small className="muted">Goes to Video Telematics.</small></span><Link className="pill" href="/vaycora/video">Video</Link></div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="topbar">
          <div><p className="kicker">Recent Raw Payloads</p><h2 className="cardTitle">Technical debug stays here</h2></div>
          <Link className="btn secondary" href="/vaycora/admin/payloads">Open Admin Payloads</Link>
        </div>
        <div className="tableWrap" style={{ marginTop: 16 }}>
          <table>
            <thead><tr><th>Received</th><th>Device</th><th>Status</th><th>Format</th><th>Matched Asset</th></tr></thead>
            <tbody>
              {payloads.slice(0, 10).map((payload) => (
                <tr key={payload.id}>
                  <td>{new Date(payload.receivedAt).toLocaleString()}</td>
                  <td>{payload.deviceIdentifier ?? "Unknown"}</td>
                  <td><span className={payload.parseStatus === "parsed" ? "pill good" : "pill bad"}>{payload.parseStatus}</span></td>
                  <td>{payload.payloadFormat}</td>
                  <td>{payload.assetName ?? "Unmatched"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

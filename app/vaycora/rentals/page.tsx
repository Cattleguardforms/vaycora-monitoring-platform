import Link from "next/link";
import { getVaycoraDashboardData } from "@/lib/vaycora/repository";
import { AssetMiniCard, MetricBar, PortalHero, metadataBoolean, metadataNumber, metadataString } from "../_components/portal-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RentalsPortalPage() {
  const { assets } = await getVaycoraDashboardData();
  const rentals = assets.filter((asset) => metadataBoolean(asset, "rental_mode") || asset.assetType === "rv");
  const openIssues = rentals.reduce((count, asset) => count + (Array.isArray(asset.metadata?.alerts_to_send) ? asset.metadata.alerts_to_send.length : 0), 0);

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <PortalHero
        kicker="Rental Protection"
        title="Managed rental control."
        body="Return readiness, geofence enforcement, fuel, propane, water, dump status, cleaning, inspection, and customer actions for high-value rental equipment."
        stats={[[String(rentals.length), "Rental units"], [String(openIssues), "Open issues"], [String(rentals.filter((a) => metadataString(a, "geofence_status") === "violation").length), "Geofence violations"], ["Required", "Managed monitoring"]]}
      />

      <section className="grid two">
        <div className="card">
          <div className="topbar">
            <div>
              <p className="kicker">Rental Actions</p>
              <h2 className="cardTitle">Active return and risk workflow</h2>
            </div>
            <Link className="btn secondary" href="/vaycora/rentals/alerts">Open Alert Center</Link>
          </div>
          <div className="statusRail" style={{ marginTop: 18 }}>
            {rentals.map((asset) => (
              <div className="statusItem" key={asset.id}>
                <span><strong>{asset.displayIdentifier} — {asset.name}</strong><br /><small className="muted">{metadataString(asset, "rental_customer") ?? "Customer"} · due in {metadataNumber(asset, "hours_until_return") ?? "—"} hours</small></span>
                <span className={metadataString(asset, "geofence_status") === "violation" ? "pill bad" : "pill warn"}>{metadataNumber(asset, "return_readiness_score") ?? 0}% ready</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="kicker">Policy</p>
          <h2 className="cardTitle">Required on managed services</h2>
          <p className="muted">If Vaycora is responsible for a managed rental program, monitoring should be required on every asset. That protects insurance exposure, deposits, return disputes, service readiness, and high-value equipment.</p>
          <div className="luxuryDivider" style={{ margin: "18px 0" }} />
          <div className="statusRail">
            <div className="statusItem"><span><strong>Geofence</strong><br /><small className="muted">Customer cannot leave approved zone without alert.</small></span><span className="pill bad">Enforced</span></div>
            <div className="statusItem"><span><strong>Return Readiness</strong><br /><small className="muted">Fuel, propane, water, dump and cleaning checks.</small></span><span className="pill warn">4-hour check</span></div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="topbar"><div><p className="kicker">Rental Units</p><h2 className="cardTitle">Viable rental information, not raw payloads</h2></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 18, marginTop: 18 }}>
          {rentals.map((asset) => (
            <AssetMiniCard key={asset.id} asset={asset}>
              <MetricBar label="Fuel" value={metadataNumber(asset, "fuel_level")} required={metadataNumber(asset, "required_fuel_level")} />
              <MetricBar label="Fresh water" value={metadataNumber(asset, "fresh_water")} required={metadataNumber(asset, "required_fresh_water")} />
              <MetricBar label="Propane" value={metadataNumber(asset, "propane_level")} required={metadataNumber(asset, "required_propane_level")} />
              <div className="statusRail">
                <div className="statusItem"><span><strong>Gray water</strong></span><span className={metadataBoolean(asset, "gray_water_dumped") ? "pill good" : "pill bad"}>{metadataBoolean(asset, "gray_water_dumped") ? "Dumped" : "Not dumped"}</span></div>
                <div className="statusItem"><span><strong>Black water</strong></span><span className={metadataBoolean(asset, "black_water_dumped") ? "pill good" : "pill bad"}>{metadataBoolean(asset, "black_water_dumped") ? "Dumped" : "Not dumped"}</span></div>
              </div>
            </AssetMiniCard>
          ))}
        </div>
      </section>
    </main>
  );
}

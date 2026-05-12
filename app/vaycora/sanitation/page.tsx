import { getVaycoraDashboardData } from "@/lib/vaycora/repository";
import { AssetMiniCard, MetricBar, PortalHero, metadataNumber, metadataString } from "../_components/portal-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SanitationPortalPage() {
  const { assets } = await getVaycoraDashboardData();
  const units = assets.filter((asset) => asset.assetType === "porta_potty");

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <PortalHero
        kicker="Sanitation"
        title="Service units and fill status."
        body="Porta-potty, restroom trailer, site assignment, fill level, fresh water, tip status, and service-needed workflows."
        stats={[[String(units.length), "Units"], [String(units.filter((a) => a.status === "service_due").length), "Service due"], ["Fill", "Level tracking"], ["Routes", "Coming next"]]}
      />
      <section className="card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 18 }}>
          {units.map((asset) => (
            <AssetMiniCard key={asset.id} asset={asset}>
              <MetricBar label="Fill level" value={metadataNumber(asset, "fill_level")} />
              <MetricBar label="Fresh water" value={metadataNumber(asset, "fresh_water")} />
              <MetricBar label="Battery" value={asset.internalBatteryLevel} />
              <div className="statusRail">
                <div className="statusItem"><span><strong>Site</strong><br /><small className="muted">{metadataString(asset, "site_name") ?? "No site assigned"}</small></span><span className="pill">Site</span></div>
                <div className="statusItem"><span><strong>Tip status</strong><br /><small className="muted">{metadataString(asset, "tip_status") ?? "Unknown"}</small></span><span className="pill good">Sensor</span></div>
              </div>
            </AssetMiniCard>
          ))}
        </div>
      </section>
    </main>
  );
}

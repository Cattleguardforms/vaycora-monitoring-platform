import { getVaycoraDashboardData } from "@/lib/vaycora/repository";
import { AssetMiniCard, MetricBar, PortalHero, metadataNumber, metadataString } from "../_components/portal-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AssetsPortalPage() {
  const { assets } = await getVaycoraDashboardData();
  const assetRows = assets.filter((asset) => ["container", "generator", "equipment"].includes(asset.assetType));

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <PortalHero
        kicker="Assets"
        title="Containers, generators, and equipment."
        body="This room is for non-vehicle assets: containers, trailers, generators, machines, tool trailers, tanks, and high-value field equipment."
        stats={[[String(assetRows.length), "Assets"], [String(assetRows.filter((a) => a.status === "active").length), "Active"], [String(assetRows.filter((a) => a.status === "alert").length), "Alerts"], ["GPS", "Live tracking"]]}
      />
      <section className="card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 18 }}>
          {assetRows.map((asset) => (
            <AssetMiniCard key={asset.id} asset={asset}>
              <MetricBar label="Battery" value={asset.internalBatteryLevel ?? metadataNumber(asset, "asset_battery")} />
              <MetricBar label="Fuel" value={metadataNumber(asset, "fuel_level")} />
              <MetricBar label="Propane" value={metadataNumber(asset, "propane_level")} />
              <MetricBar label="Load" value={metadataNumber(asset, "load_percent")} />
              <MetricBar label="OEE" value={metadataNumber(asset, "oee")} />
              <div className="statusRail">
                <div className="statusItem"><span><strong>Door / Seal</strong><br /><small className="muted">{metadataString(asset, "door_status") ?? "—"} · {metadataString(asset, "seal_status") ?? "—"}</small></span><span className="pill">Asset</span></div>
                <div className="statusItem"><span><strong>Power / State</strong><br /><small className="muted">{metadataString(asset, "power_state") ?? metadataString(asset, "machine_state") ?? "—"}</small></span><span className="pill good">Monitor</span></div>
              </div>
            </AssetMiniCard>
          ))}
        </div>
      </section>
    </main>
  );
}

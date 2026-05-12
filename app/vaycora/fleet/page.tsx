import { getVaycoraDashboardData } from "@/lib/vaycora/repository";
import { AssetMiniCard, MetricBar, PortalHero, metadataNumber, metadataString } from "../_components/portal-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FleetPortalPage() {
  const { assets, devices } = await getVaycoraDashboardData();
  const fleet = assets.filter((asset) => asset.assetType === "vehicle");
  const active = fleet.filter((asset) => asset.status === "active").length;

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <PortalHero
        kicker="Fleet"
        title="Vehicles, OBD, and driver data."
        body="Fuel, VIN, odometer, engine hours, diagnostics, ignition, speed, driver score, and video telematics belong in this room. Raw SunTech messages feed these cards as clean vehicle information."
        stats={[[String(fleet.length), "Vehicles"], [String(active), "Active"], [String(devices.filter((d) => d.model === "ST9730").length), "Video units"], ["OBD", "VIN/PID ready"]]}
      />
      <section className="card">
        <div className="topbar"><div><p className="kicker">Fleet Workboard</p><h2 className="cardTitle">Usable vehicle intelligence</h2></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 18, marginTop: 18 }}>
          {fleet.map((asset) => (
            <AssetMiniCard key={asset.id} asset={asset}>
              <MetricBar label="Fuel" value={metadataNumber(asset, "fuel_level")} />
              <MetricBar label="Oil life" value={metadataNumber(asset, "oil_life")} />
              <MetricBar label="Driver score" value={metadataNumber(asset, "driver_score")} />
              <div className="statusRail">
                <div className="statusItem"><span><strong>VIN</strong><br /><small className="muted">{metadataString(asset, "vin") ?? "VIN discovery pending"}</small></span><span className="pill">OBD</span></div>
                <div className="statusItem"><span><strong>Diagnostics</strong><br /><small className="muted">{metadataString(asset, "diagnostic_status") ?? "No diagnostic status yet"}</small></span><span className="pill good">Monitor</span></div>
                <div className="statusItem"><span><strong>Camera</strong><br /><small className="muted">{metadataString(asset, "camera_status") ?? "No camera"}</small></span><span className="pill">Video</span></div>
              </div>
            </AssetMiniCard>
          ))}
        </div>
      </section>
    </main>
  );
}

import { getVaycoraDashboardData } from "@/lib/vaycora/repository";
import { AssetMiniCard, MetricBar, PortalHero, metadataNumber, metadataString } from "../_components/portal-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VideoPortalPage() {
  const { assets, devices } = await getVaycoraDashboardData();
  const videoAssets = assets.filter((asset) => metadataString(asset, "camera_status") || devices.some((device) => device.id === asset.assignedDeviceId && device.model === "ST9730"));

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <PortalHero
        kicker="Video Telematics"
        title="Cameras, ADAS, and DMS."
        body="ST9730 video units, road camera, driver camera, clips, driver score, ADAS events, DMS events, and safety evidence live here."
        stats={[[String(videoAssets.length), "Video assets"], [String(videoAssets.filter((a) => metadataString(a, "camera_status") === "online").length), "Online cameras"], [String(videoAssets.reduce((sum, a) => sum + (metadataNumber(a, "adas_events_today") ?? 0), 0)), "ADAS today"], [String(videoAssets.reduce((sum, a) => sum + (metadataNumber(a, "dms_events_today") ?? 0), 0)), "DMS today"]]}
      />
      <section className="card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 18 }}>
          {videoAssets.map((asset) => (
            <AssetMiniCard key={asset.id} asset={asset}>
              <MetricBar label="Driver score" value={metadataNumber(asset, "driver_score")} />
              <MetricBar label="Fuel" value={metadataNumber(asset, "fuel_level")} />
              <div className="statusRail">
                <div className="statusItem"><span><strong>Camera status</strong><br /><small className="muted">{metadataString(asset, "camera_status") ?? "Unknown"}</small></span><span className="pill good">Live</span></div>
                <div className="statusItem"><span><strong>Road camera</strong><br /><small className="muted">{metadataString(asset, "road_camera") ?? "Unknown"}</small></span><span className="pill">Road</span></div>
                <div className="statusItem"><span><strong>Driver camera</strong><br /><small className="muted">{metadataString(asset, "driver_camera") ?? "Unknown"}</small></span><span className="pill">DMS</span></div>
                <div className="statusItem"><span><strong>Latest clip</strong><br /><small className="muted">{metadataString(asset, "latest_clip_status") ?? "No clip"}</small></span><span className="pill accent">Evidence</span></div>
              </div>
            </AssetMiniCard>
          ))}
        </div>
      </section>
    </main>
  );
}

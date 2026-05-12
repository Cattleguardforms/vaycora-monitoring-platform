import type { Asset } from "@/lib/vaycora/types";

export function metadataNumber(asset: Asset, key: string) {
  const value = asset.metadata?.[key];
  return typeof value === "number" ? value : undefined;
}

export function metadataString(asset: Asset, key: string) {
  const value = asset.metadata?.[key];
  return typeof value === "string" ? value : undefined;
}

export function metadataBoolean(asset: Asset, key: string) {
  const value = asset.metadata?.[key];
  return typeof value === "boolean" ? value : undefined;
}

export function formatAssetType(type: string) {
  return type.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function MetricBar({ label, value, required }: { label: string; value?: number; required?: number }) {
  const safeValue = Math.max(0, Math.min(100, value ?? 0));

  return (
    <div style={{ display: "grid", gap: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <span className="muted">{label}{typeof required === "number" ? ` / req ${required}%` : ""}</span>
        <strong>{typeof value === "number" ? `${Math.round(value)}%` : "—"}</strong>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.09)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
        <div style={{ width: `${safeValue}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, var(--color-gold), var(--color-accent))" }} />
      </div>
    </div>
  );
}

export function PortalHero({ kicker, title, body, stats }: { kicker: string; title: string; body: string; stats: Array<[string, string]> }) {
  return (
    <section className="heroPanel">
      <div>
        <p className="kicker">{kicker}</p>
        <h1 className="h1">{title}</h1>
        <p className="muted" style={{ maxWidth: 780 }}>{body}</p>
      </div>
      <div className="heroMetricGrid">
        {stats.map(([value, label]) => (
          <div className="heroMetric" key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
      </div>
    </section>
  );
}

export function AssetMiniCard({ asset, children }: { asset: Asset; children: React.ReactNode }) {
  return (
    <div className="card" style={{ display: "grid", gap: 16 }}>
      <div className="topbar">
        <div>
          <p className="kicker">{formatAssetType(asset.assetType)}</p>
          <h2 className="cardTitle">{asset.name}</h2>
          <p className="muted">{asset.displayIdentifier}</p>
        </div>
        <span className={asset.status === "active" ? "pill good" : asset.status === "service_due" || asset.status === "alert" ? "pill warn" : "pill"}>{asset.status}</span>
      </div>
      {children}
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const themeOptions = [
  {
    name: "Operations Dark",
    key: "operations-dark",
    description: "Dark command-center feel for field operations, rentals, fleet, and asset monitoring.",
    colors: ["#050807", "#123c2b", "#d6b66e", "#f97316"],
  },
  {
    name: "Clean Enterprise",
    key: "clean-enterprise",
    description: "Light branded customer portal for professional renters, municipalities, and enterprise accounts.",
    colors: ["#f7f1e5", "#fffaf0", "#123c2b", "#e96f12"],
  },
  {
    name: "Industrial Safety",
    key: "industrial-safety",
    description: "High-contrast operations style for manufacturing, equipment, power, and safety workflows.",
    colors: ["#10130f", "#263023", "#f5b84b", "#ef4444"],
  },
];

export default function BrandSettingsPage() {
  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <section className="heroPanel">
        <div>
          <p className="kicker">Brand Settings</p>
          <h1 className="h1">White-label room.</h1>
          <p className="muted" style={{ maxWidth: 780 }}>
            Temporary brand control area for logo, customer name, portal colorway, theme, and UI feel. This is where customers or partners will make the software feel like their own.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <span className="pill accent">White-label ready</span>
            <span className="pill">Logo upload</span>
            <span className="pill">Colorway</span>
            <span className="pill">Portal modules</span>
          </div>
        </div>
        <div className="heroMetricGrid">
          <div className="heroMetric"><strong>3</strong><span>Theme presets</span></div>
          <div className="heroMetric"><strong>Logo</strong><span>Upload ready</span></div>
          <div className="heroMetric"><strong>Colors</strong><span>Accent controls</span></div>
          <div className="heroMetric"><strong>UX</strong><span>Portal style</span></div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <p className="kicker">Customer Brand</p>
          <h2 className="cardTitle">Portal identity</h2>
          <div className="formGrid" style={{ marginTop: 18 }}>
            <label>
              Company / portal name
              <input defaultValue="Vaycora Demo Operations" />
            </label>
            <label>
              Accent color
              <input type="color" defaultValue="#e96f12" />
            </label>
            <label>
              Logo upload
              <input type="file" />
            </label>
            <label>
              Portal type
              <select defaultValue="rental">
                <option value="rental">Rental Protection</option>
                <option value="fleet">Fleet</option>
                <option value="assets">Assets</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="sanitation">Sanitation</option>
              </select>
            </label>
          </div>

          <div className="brandPreview">
            <span className="brandIcon">V</span>
            <span>
              <strong>Vaycora Demo Operations</strong><br />
              <small className="muted">Preview of customer branded portal header</small>
            </span>
          </div>
        </div>

        <aside className="card">
          <p className="kicker">White-label Model</p>
          <h2 className="cardTitle">Why this matters</h2>
          <p className="muted">
            Every customer, dealer, partner, or vertical can keep the same Vaycora core while changing logo, colors, wording, modules, and dashboard feel.
          </p>
          <div className="luxuryDivider" style={{ margin: "18px 0" }} />
          <div className="statusRail">
            <div className="statusItem"><span><strong>Partner portals</strong><br /><small className="muted">SunTech or dealer branded experiences.</small></span><span className="pill good">Ready</span></div>
            <div className="statusItem"><span><strong>Customer portals</strong><br /><small className="muted">Rental companies can make it their own.</small></span><span className="pill good">Ready</span></div>
            <div className="statusItem"><span><strong>Industry portals</strong><br /><small className="muted">Fleet, rentals, assets, sanitation, manufacturing.</small></span><span className="pill accent">Multi-lane</span></div>
          </div>
        </aside>
      </section>

      <section className="card">
        <div className="topbar">
          <div>
            <p className="kicker">Theme Presets</p>
            <h2 className="cardTitle">Change the feel</h2>
          </div>
          <span className="pill warn">Preview only</span>
        </div>
        <div className="themeRow" style={{ marginTop: 18 }}>
          {themeOptions.map((theme, index) => (
            <div className={`themeCard ${index === 0 ? "selected" : ""}`} key={theme.key}>
              <h3>{theme.name}</h3>
              <p className="muted">{theme.description}</p>
              <div className="swatches">
                {theme.colors.map((color) => <span className="swatch" key={color} style={{ background: color }} />)}
              </div>
              <span className={index === 0 ? "pill accent" : "pill"}>{index === 0 ? "Current" : "Preview"}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

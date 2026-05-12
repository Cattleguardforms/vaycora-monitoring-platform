import { getBrandSettings } from "@/lib/vaycora/repository";
import { saveBrandSettingsAction } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const colorPresets = [
  { name: "Vaycora Green", primary: "#123c2b", accent: "#e96f12", background: "dark" },
  { name: "Clean White", primary: "#102a24", accent: "#2563eb", background: "white" },
  { name: "Rental Blue", primary: "#102a43", accent: "#0ea5e9", background: "white" },
  { name: "Equipment Orange", primary: "#1f2937", accent: "#f97316", background: "light" },
  { name: "Industrial Gray", primary: "#111827", accent: "#f59e0b", background: "light" },
];

function fieldStyle() {
  return { background: "#fff", color: "#111827", borderColor: "#d1d5db" };
}

export default async function BrandSettingsPage({ searchParams }: { searchParams?: Promise<{ saved?: string }> }) {
  const settings = await getBrandSettings();
  const params = await searchParams;
  const saved = params?.saved === "1";

  return (
    <main className="pageFrame" style={{ padding: "28px 18px 46px" }}>
      <section className="card" style={{ background: "#fff", color: "#111827", borderColor: "rgba(17,24,39,.12)" }}>
        <div className="topbar">
          <div>
            <p className="kicker" style={{ color: "#9a5a00" }}>Brand Settings</p>
            <h1 style={{ margin: "6px 0 8px", fontSize: 42, letterSpacing: "-0.055em" }}>Customize the portal</h1>
            <p style={{ color: "#4b5563", margin: 0, maxWidth: 760 }}>
              Simple white-label controls for logo, name, color, background, and portal style.
            </p>
          </div>
          <span className={saved ? "pill good" : "pill accent"}>{saved ? "Saved" : "Live settings"}</span>
        </div>
      </section>

      <form action={saveBrandSettingsAction} className="grid">
        <section className="grid two">
          <div className="card" style={{ background: "#fff", color: "#111827", borderColor: "rgba(17,24,39,.12)" }}>
            <p className="kicker" style={{ color: "#9a5a00" }}>Step 1</p>
            <h2 className="cardTitle">Basic brand information</h2>
            <div className="formGrid" style={{ marginTop: 18 }}>
              <label style={{ color: "#374151" }}>
                Company / portal name
                <input name="companyName" defaultValue={settings.companyName} style={fieldStyle()} />
              </label>
              <label style={{ color: "#374151" }}>
                Short name shown in header
                <input name="shortName" defaultValue={settings.shortName} style={fieldStyle()} />
              </label>
              <label style={{ color: "#374151" }}>
                Logo URL for now
                <input name="logoUrl" defaultValue={settings.logoUrl ?? ""} placeholder="https://example.com/logo.png" style={fieldStyle()} />
              </label>
              <label style={{ color: "#374151" }}>
                Portal type
                <select name="portalType" defaultValue={settings.portalType} style={fieldStyle()}>
                  <option value="rental">Rental Protection</option>
                  <option value="fleet">Fleet</option>
                  <option value="assets">Assets</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="video">Video Telematics</option>
                </select>
              </label>
            </div>
          </div>

          <div className="card" style={{ background: "#fff", color: "#111827", borderColor: "rgba(17,24,39,.12)" }}>
            <p className="kicker" style={{ color: "#9a5a00" }}>Step 2</p>
            <h2 className="cardTitle">Colors and background</h2>
            <div className="formGrid" style={{ marginTop: 18 }}>
              <label style={{ color: "#374151" }}>
                Primary color
                <input name="primaryColor" type="color" defaultValue={settings.primaryColor} style={fieldStyle()} />
              </label>
              <label style={{ color: "#374151" }}>
                Accent color
                <input name="accentColor" type="color" defaultValue={settings.accentColor} style={fieldStyle()} />
              </label>
              <label style={{ color: "#374151" }}>
                Background
                <select name="backgroundMode" defaultValue={settings.backgroundMode} style={fieldStyle()}>
                  <option value="white">White</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
              <label style={{ color: "#374151" }}>
                Dashboard style
                <select name="dashboardStyle" defaultValue={settings.dashboardStyle} style={fieldStyle()}>
                  <option value="simple">Simple</option>
                  <option value="operations">Operations</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="card" style={{ background: "#fff", color: "#111827", borderColor: "rgba(17,24,39,.12)" }}>
          <div className="topbar">
            <div>
              <p className="kicker" style={{ color: "#9a5a00" }}>Step 3</p>
              <h2 className="cardTitle">Quick color presets</h2>
              <p style={{ color: "#4b5563", marginTop: 0 }}>Copy these values into the color controls for now. Next pass, these buttons can auto-fill.</p>
            </div>
          </div>
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {colorPresets.map((preset) => (
              <div key={preset.name} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "center", padding: 16, border: "1px solid #e5e7eb", borderRadius: 18, background: "#f9fafb" }}>
                <div>
                  <strong>{preset.name}</strong><br />
                  <span style={{ color: "#6b7280" }}>Primary {preset.primary} · Accent {preset.accent} · Background {preset.background}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 999, background: preset.primary, border: "1px solid #d1d5db" }} />
                  <span style={{ width: 34, height: 34, borderRadius: 999, background: preset.accent, border: "1px solid #d1d5db" }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid two">
          <div className="card" style={{ background: "#fff", color: "#111827", borderColor: "rgba(17,24,39,.12)" }}>
            <p className="kicker" style={{ color: "#9a5a00" }}>Preview</p>
            <h2 className="cardTitle">Header preview</h2>
            <div style={{ marginTop: 18, padding: 18, borderRadius: 18, border: "1px solid #e5e7eb", background: "#f9fafb", display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{ width: 54, height: 54, borderRadius: 14, background: settings.primaryColor, color: "#fff", display: "grid", placeItems: "center", fontWeight: 900 }}>{settings.shortName.charAt(0) || "V"}</span>
              <span>
                <strong>{settings.companyName}</strong><br />
                <small style={{ color: "#6b7280" }}>{settings.portalType} portal · {settings.backgroundMode} · {settings.dashboardStyle}</small>
              </span>
            </div>
          </div>

          <div className="card" style={{ background: "#fff", color: "#111827", borderColor: "rgba(17,24,39,.12)" }}>
            <p className="kicker" style={{ color: "#9a5a00" }}>Save</p>
            <h2 className="cardTitle">Apply changes</h2>
            <p style={{ color: "#4b5563" }}>These fields now save to Postgres. The next step is applying the selected theme live to the workboard.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
              <button className="btn accent" type="submit">Save brand settings</button>
              <a className="btn secondary" href="/vaycora" style={{ color: "#111827", borderColor: "#d1d5db" }}>Back to Workboard</a>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getBrandSettings, saveBrandSettings } from "@/lib/vaycora/repository";

function asString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

export async function GET() {
  try {
    const settings = await getBrandSettings();
    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown brand settings error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const settings = await saveBrandSettings({
      tenantId: asString(body.tenantId, "tenant_demo"),
      companyName: asString(body.companyName, "Vaycora Demo Operations"),
      shortName: asString(body.shortName, "Vaycora"),
      portalType: asString(body.portalType, "rental"),
      primaryColor: asString(body.primaryColor, "#123c2b"),
      accentColor: asString(body.accentColor, "#e96f12"),
      backgroundMode: asString(body.backgroundMode, "dark"),
      dashboardStyle: asString(body.dashboardStyle, "operations"),
      logoUrl: typeof body.logoUrl === "string" ? body.logoUrl : null,
    });

    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown brand save error" },
      { status: 500 }
    );
  }
}

import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/vaycora/db";
import { normalizePayloadFormat, parseSunTechPayload } from "@/lib/vaycora/suntech-parser";

type DeviceRow = {
  id: string;
  tenant_id: string;
};

type AssetRow = {
  id: string;
  tenant_id: string;
};

export async function POST(request: NextRequest) {
  const rawPayload = await request.text();
  const sourceIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  const receivedAt = new Date().toISOString();
  const parseResult = parseSunTechPayload(rawPayload);
  const payloadFormat = normalizePayloadFormat(rawPayload);
  const payloadId = `payload_${randomUUID()}`;

  let device: DeviceRow | null = null;
  let asset: AssetRow | null = null;

  try {
    if (parseResult.normalized?.deviceIdentifier) {
      device = await queryOne<DeviceRow>(
        "select id, tenant_id from devices where device_identifier = $1 or imei = $1 limit 1",
        [parseResult.normalized.deviceIdentifier]
      );

      if (device) {
        asset = await queryOne<AssetRow>(
          "select id, tenant_id from assets where assigned_device_id = $1 limit 1",
          [device.id]
        );
      }
    }

    await query(
      `insert into device_payloads (id, provider, device_identifier, device_id, tenant_id, raw_payload, payload_format, source_ip, received_at, parsed_at, parse_status, parse_error, ack_sent)
       values ($1, 'suntech', $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true)`,
      [
        payloadId,
        parseResult.normalized?.deviceIdentifier ?? null,
        device?.id ?? null,
        device?.tenant_id ?? asset?.tenant_id ?? null,
        rawPayload,
        payloadFormat,
        sourceIp,
        receivedAt,
        parseResult.status === "parsed" ? new Date().toISOString() : null,
        parseResult.status,
        parseResult.error ?? null,
      ]
    );

    if (parseResult.status === "parsed" && parseResult.normalized && device) {
      await query(
        "update devices set last_seen_at = $1, last_payload_at = $1, status = 'active', updated_at = now() where id = $2",
        [receivedAt, device.id]
      );
    }

    if (parseResult.status === "parsed" && parseResult.normalized && asset) {
      const normalized = parseResult.normalized;
      const hasLocation = typeof normalized.latitude === "number" && typeof normalized.longitude === "number";

      await query(
        `update assets
         set current_lat = coalesce($1, current_lat),
             current_lng = coalesce($2, current_lng),
             speed_mph = coalesce($3, speed_mph),
             heading = coalesce($4, heading),
             ignition_status = coalesce($5, ignition_status),
             battery_voltage = coalesce($6, battery_voltage),
             internal_battery_level = coalesce($7, internal_battery_level),
             external_power_status = coalesce($8, external_power_status),
             last_seen_at = $9,
             status = case when status = 'offline' then 'active' else status end,
             updated_at = now()
         where id = $10`,
        [
          normalized.latitude ?? null,
          normalized.longitude ?? null,
          normalized.speedMph ?? null,
          normalized.heading ?? null,
          normalized.ignitionStatus ?? null,
          normalized.batteryVoltage ?? null,
          normalized.internalBatteryLevel ?? null,
          normalized.externalPowerStatus ?? null,
          receivedAt,
          asset.id,
        ]
      );

      if (hasLocation) {
        const locationId = `loc_${randomUUID()}`;
        await query(
          `insert into location_history (id, tenant_id, asset_id, device_id, latitude, longitude, speed, heading, recorded_at, received_at, raw_payload_id)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            locationId,
            asset.tenant_id,
            asset.id,
            device.id,
            normalized.latitude,
            normalized.longitude,
            normalized.speedMph ?? null,
            normalized.heading ?? null,
            normalized.timestamp,
            receivedAt,
            payloadId,
          ]
        );
      }

      const eventId = `event_${randomUUID()}`;
      await query(
        `insert into events (id, tenant_id, asset_id, device_id, event_type, event_time, location_lat, location_lng, value_json, source, raw_payload_id)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, 'suntech', $10)`,
        [
          eventId,
          asset.tenant_id,
          asset.id,
          device.id,
          hasLocation ? "location.updated" : "device.online",
          normalized.timestamp,
          normalized.latitude ?? null,
          normalized.longitude ?? null,
          JSON.stringify(normalized),
          payloadId,
        ]
      );
    }

    return NextResponse.json({
      ok: parseResult.status === "parsed",
      provider: "suntech",
      receivedAt,
      sourceIp,
      payloadFormat,
      parseStatus: parseResult.status,
      payloadId,
      matchedDeviceId: device?.id ?? null,
      matchedAssetId: asset?.id ?? null,
      normalized: parseResult.normalized ?? null,
      error: parseResult.error ?? null,
      ack: "ACK_PLACEHOLDER",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        provider: "suntech",
        receivedAt,
        payloadFormat,
        parseStatus: parseResult.status,
        normalized: parseResult.normalized ?? null,
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "vaycora-suntech-ingestion",
    status: "ready",
    note: "POST raw SunTech JSON or key-value payloads here. Parsed payloads are stored in Postgres when DATABASE_URL is configured and setup has run.",
  });
}

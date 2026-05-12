import { query } from "./db";

export async function setupVaycoraSchema() {
  await query(`
    create table if not exists tenants (
      id text primary key,
      name text not null,
      slug text not null unique,
      status text not null default 'trial',
      enabled_portals jsonb not null default '["admin", "fleet", "assets"]'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists devices (
      id text primary key,
      tenant_id text references tenants(id),
      device_identifier text not null unique,
      imei text,
      manufacturer text not null default 'SunTech',
      model text not null default 'Unknown SunTech Device',
      status text not null default 'unassigned',
      firmware_version text,
      last_seen_at timestamptz,
      last_payload_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists assets (
      id text primary key,
      tenant_id text references tenants(id),
      asset_type text not null,
      name text not null,
      display_identifier text not null,
      status text not null default 'idle',
      assigned_device_id text references devices(id),
      current_lat double precision,
      current_lng double precision,
      speed_mph double precision,
      heading double precision,
      ignition_status boolean,
      battery_voltage double precision,
      internal_battery_level double precision,
      external_power_status boolean,
      last_seen_at timestamptz,
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists device_payloads (
      id text primary key,
      provider text not null default 'suntech',
      device_identifier text,
      device_id text references devices(id),
      tenant_id text references tenants(id),
      raw_payload text not null,
      payload_format text not null default 'unknown',
      source_ip text,
      received_at timestamptz not null default now(),
      parsed_at timestamptz,
      parse_status text not null default 'received',
      parse_error text,
      ack_sent boolean not null default false,
      created_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists events (
      id text primary key,
      tenant_id text references tenants(id),
      asset_id text references assets(id),
      device_id text references devices(id),
      event_type text not null,
      event_time timestamptz not null,
      location_lat double precision,
      location_lng double precision,
      value_json jsonb not null default '{}'::jsonb,
      source text not null default 'suntech',
      raw_payload_id text references device_payloads(id),
      created_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists location_history (
      id text primary key,
      tenant_id text references tenants(id),
      asset_id text references assets(id),
      device_id text references devices(id),
      latitude double precision not null,
      longitude double precision not null,
      speed double precision,
      heading double precision,
      recorded_at timestamptz not null,
      received_at timestamptz not null default now(),
      raw_payload_id text references device_payloads(id),
      created_at timestamptz not null default now()
    );
  `);

  await query(`
    insert into tenants (id, name, slug, status, enabled_portals)
    values ('tenant_demo', 'Vaycora Demo Operations', 'demo-ops', 'trial', '["admin", "fleet", "assets", "sanitation"]'::jsonb)
    on conflict (id) do nothing;
  `);

  await query(`
    insert into devices (id, tenant_id, device_identifier, imei, manufacturer, model, status)
    values
      ('device_obd_001', 'tenant_demo', '352099001761481', '352099001761481', 'SunTech', 'ST4505T', 'active'),
      ('device_asset_001', 'tenant_demo', '352099001761482', '352099001761482', 'SunTech', 'ST4955LCBW', 'active'),
      ('device_sanitation_001', 'tenant_demo', '352099001761483', '352099001761483', 'SunTech', 'ST4915LCBF', 'assigned')
    on conflict (id) do nothing;
  `);

  await query(`
    insert into assets (id, tenant_id, asset_type, name, display_identifier, status, assigned_device_id, current_lat, current_lng, speed_mph, heading, ignition_status, battery_voltage, internal_battery_level, external_power_status, last_seen_at, metadata)
    values
      ('asset_vehicle_001', 'tenant_demo', 'vehicle', 'Service Truck 14', 'TRK-014', 'active', 'device_obd_001', 35.4676, -97.5164, 37, 126, true, 12.6, null, true, '2026-05-11T15:14:00Z', '{"vin":"1FDXF46S12EA00001","year":2021,"make":"Ford","model":"F-250"}'::jsonb),
      ('asset_container_001', 'tenant_demo', 'container', 'Container OKC Yard A', 'CONT-2208', 'idle', 'device_asset_001', 35.4962, -97.5431, 0, 0, null, null, 92, null, '2026-05-11T15:12:00Z', '{"door_status":"closed","seal_status":"sealed"}'::jsonb),
      ('asset_porta_001', 'tenant_demo', 'porta_potty', 'Unit 118 - North Jobsite', 'PP-118', 'service_due', 'device_sanitation_001', 35.5201, -97.4928, 0, null, null, null, 67, null, '2026-05-11T14:58:00Z', '{"site_name":"North Jobsite","fill_level":86,"tip_status":"upright","last_serviced_at":"2026-05-08T18:30:00Z"}'::jsonb)
    on conflict (id) do nothing;
  `);
}

# OBS Required Sensor Modules

These sensor modules are now required for the Vaycora Monitoring Platform package model.

## Required customer-visible monitoring items

The product must include support for:

1. Gray water tank level
2. Fresh water tank level
3. Black water tank level
4. Propane tank level
5. Generator status

## Hardware boundary

The ST6560 standard OBS monitor provides the core vehicle/device data layer. Based on the uploaded ST6560 documentation, the standard monitor can support location, VIN, ignition, engine hours, mileage, speed, RPM, device/server check-in, LTE connectivity, BLE 5.3, J1939 ELD/FMS, OTA firmware, geofencing, and engine diagnostic support.

Tank levels and RV-specific generator state should be treated as external sensor modules unless the actual vehicle/generator bus exposes them through a supported data source.

## Package structure

### Standard OBS Monitor

Core included functions:

- Device online/offline
- Last check-in
- GPS location
- VIN / vehicle ID
- Ignition
- Mileage / odometer
- Speed
- RPM
- Engine hours
- Device power / backup battery status when exposed
- Engine diagnostics when exposed
- Fuel level only when exposed by the vehicle/FMS source
- Asset tracking
- Review queue flags

### Extended Sensor Package

Required modules:

- Gray water tank level module
- Fresh water tank level module
- Black water tank level module
- Propane tank level module
- Generator status module

Optional future modules:

- Temperature / humidity
- Door/contact
- Water leak
- Motion/vibration
- Battery/voltage
- Presence tag
- Custom sensor

## Sensor module model

Every sensor module should use the same internal structure:

```txt
Sensor Module
- sensor_id
- asset_id
- monitor_id
- sensor_type
- display_name
- reading_value
- reading_unit
- reading_status
- last_seen_at
- battery_level
- connection_status
- review_status
- notes
```

## Required sensor types

```txt
gray_water_level
fresh_water_level
black_water_level
propane_level
generator_status
```

## Recommended dashboard cards

- Gray Water
- Fresh Water
- Black Water
- Propane
- Generator

## Required review flags

Gray/Fresh/Black Water:

- Full
- Near full
- Empty / low
- Sensor missing
- No recent reading
- Reading abnormal

Propane:

- Low propane
- Critical propane
- Sensor missing
- No recent reading
- Reading abnormal

Generator:

- Running
- Off
- Fault detected
- No recent reading
- Sensor missing
- Runtime threshold exceeded
- Maintenance review needed

## Customer-facing product promise

The Standard OBS Monitor provides the core vehicle/device heartbeat and review layer. The Extended Sensor Package adds the RV/site intelligence layer: gray water, fresh water, black water, propane, and generator visibility.

## Build order

1. Add sensor module data model
2. Add sensor module placeholders to dashboard
3. Add sensor module cards to asset detail
4. Add required sensor types
5. Add mock readings for all five required modules
6. Add review flags for sensor problems
7. Add API payload shape for sensor readings
8. Integrate actual sensor hardware once vendor/source is selected

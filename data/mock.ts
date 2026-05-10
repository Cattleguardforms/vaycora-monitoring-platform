export const obsReviews = [
  { id: 'OBS-1001', monitorId: 'MON-2201', assetId: 'AST-001', status: 'Flagged', flag: 'Irregular check-in', lastReading: '2026-05-10 08:14', reviewer: 'Unassigned' },
  { id: 'OBS-1002', monitorId: 'MON-2204', assetId: 'AST-004', status: 'In Review', flag: 'Reading variance', lastReading: '2026-05-10 07:52', reviewer: 'Review Team' },
  { id: 'OBS-1003', monitorId: 'MON-2210', assetId: 'AST-009', status: 'Cleared', flag: 'None', lastReading: '2026-05-09 18:05', reviewer: 'Admin' },
  { id: 'OBS-1004', monitorId: 'MON-2216', assetId: 'AST-012', status: 'New', flag: 'New record', lastReading: '2026-05-10 09:03', reviewer: 'Unassigned' }
];

export const assets = [
  { assetId: 'AST-001', type: 'OBS Monitor', monitorId: 'MON-2201', serial: 'VC-OBS-001', status: 'Needs Review', location: 'North Yard', lastCheckIn: '12 min ago', condition: 'Watch' },
  { assetId: 'AST-004', type: 'OBS Monitor', monitorId: 'MON-2204', serial: 'VC-OBS-004', status: 'Installed', location: 'Maitland Site', lastCheckIn: '28 min ago', condition: 'Good' },
  { assetId: 'AST-009', type: 'Gateway', monitorId: 'MON-2210', serial: 'VC-GW-009', status: 'Available', location: 'Storage', lastCheckIn: '2 hr ago', condition: 'Ready' },
  { assetId: 'AST-012', type: 'OBS Monitor', monitorId: 'MON-2216', serial: 'VC-OBS-012', status: 'Missing', location: 'Unknown', lastCheckIn: '2 days ago', condition: 'Missing' }
];

export const statCards = [
  { label: 'New Records', value: '18', note: 'Awaiting review' },
  { label: 'Flagged', value: '7', note: 'Needs decision' },
  { label: 'Assets Live', value: '42', note: 'Installed or assigned' },
  { label: 'Missing', value: '2', note: 'Asset follow-up' }
];

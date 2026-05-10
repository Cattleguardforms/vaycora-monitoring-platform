import { assets } from '@/data/mock';

export function AssetTable() {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Type</th>
            <th>Monitor</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Location</th>
            <th>Last Check-In</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.assetId}>
              <td>{asset.assetId}</td>
              <td>{asset.type}</td>
              <td>{asset.monitorId}</td>
              <td>{asset.serial}</td>
              <td><span className="pill accent">{asset.status}</span></td>
              <td>{asset.location}</td>
              <td>{asset.lastCheckIn}</td>
              <td>{asset.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

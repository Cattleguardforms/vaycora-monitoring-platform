import { obsReviews } from '@/data/mock';

export function ReviewTable() {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Review ID</th>
            <th>Monitor</th>
            <th>Asset</th>
            <th>Status</th>
            <th>Flag</th>
            <th>Last Reading</th>
            <th>Reviewer</th>
          </tr>
        </thead>
        <tbody>
          {obsReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.monitorId}</td>
              <td>{review.assetId}</td>
              <td><span className="pill accent">{review.status}</span></td>
              <td>{review.flag}</td>
              <td>{review.lastReading}</td>
              <td>{review.reviewer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

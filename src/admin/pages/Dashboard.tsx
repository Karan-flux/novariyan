import React, { useEffect, useState } from 'react';

import { adminApi, type DashboardOverview } from '../api/client';

type DateRange = 'today' | '7' | '30' | '90' | 'custom';

function getRange(range: DateRange, customFrom: string, customTo: string) {
  if (range === 'custom') {
    return {
      from: new Date(`${customFrom}T00:00:00`).toISOString(),
      to: new Date(`${customTo}T23:59:59.999`).toISOString(),
    };
  }
  const end = new Date();
  const start = new Date(end);
  if (range === 'today') start.setHours(0, 0, 0, 0);
  else start.setDate(start.getDate() - Number(range));
  return { from: start.toISOString(), to: end.toISOString() };
}

export const Dashboard: React.FC<{ analyticsOnly?: boolean }> = ({ analyticsOnly = false }) => {
  const [range, setRange] = useState<DateRange>('30');
  const [customFrom, setCustomFrom] = useState(() => new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10));
  const [customTo, setCustomTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const dates = getRange(range, customFrom, customTo);
      setData(await adminApi.overview(dates.from, dates.to));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (range === 'custom' && (!customFrom || !customTo || customFrom > customTo)) return;
    void load();
  }, [range, customFrom, customTo]);

  const metrics = data?.metrics;
  const hasAnyData = Boolean(metrics && (
    metrics.totalLeads + metrics.totalBookings + metrics.visitors + metrics.pageViews > 0
  ));
  const cards = analyticsOnly
    ? [
      ['Visitors', metrics?.visitors],
      ['Unique visitors', metrics?.uniqueVisitors],
      ['Returning visitors', metrics?.returningVisitors],
      ['Page views', metrics?.pageViews],
      ['Conversion rate', metrics?.conversionRate === null ? null : metrics?.conversionRate === undefined ? undefined : `${metrics.conversionRate}%`],
    ]
    : [
      ['Total leads', metrics?.totalLeads],
      ['New leads', metrics?.newLeads],
      ['Bookings', metrics?.totalBookings],
      ['Upcoming bookings', metrics?.upcomingBookings],
      ['Completed bookings', metrics?.completedBookings],
      ['Cancelled bookings', metrics?.cancelledBookings],
      ['Visitors', metrics?.visitors],
      ['Unique visitors', metrics?.uniqueVisitors],
    ];

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-neutral-500">{analyticsOnly ? 'Traffic intelligence' : 'Studio overview'}</p>
          <h1 className="mt-2 font-display text-4xl">{analyticsOnly ? 'Analytics' : 'Dashboard'}</h1>
        </div>
        <label className="text-xs text-neutral-600">Date range
          <select value={range} onChange={(event) => setRange(event.target.value as DateRange)} className="ml-3 min-h-10 border border-black/20 bg-white px-3 text-sm text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
            <option value="today">Today</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option>
              <option value="custom">Custom range</option>
          </select>
        </label>
          {range === 'custom' && (
            <div className="flex flex-wrap gap-3">
              <label className="text-xs text-neutral-600">From<input type="date" value={customFrom} max={customTo} onChange={(event) => setCustomFrom(event.target.value)} className="ml-2 min-h-10 border border-black/20 bg-white px-3 text-sm text-black" /></label>
              <label className="text-xs text-neutral-600">To<input type="date" value={customTo} min={customFrom} onChange={(event) => setCustomTo(event.target.value)} className="ml-2 min-h-10 border border-black/20 bg-white px-3 text-sm text-black" /></label>
            </div>
          )}
      </div>

      {loading ? <p className="py-12 text-sm text-neutral-500">Loading real business data…</p> : error ? (
        <div role="alert" className="mt-8 border border-red-900/20 bg-red-50 p-5 text-sm text-red-900">
          <p>{error}</p><button type="button" onClick={() => void load()} className="mt-3 underline">Retry</button>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-px border border-black/10 bg-black/10 md:grid-cols-3 xl:grid-cols-4">
            {cards.map(([label, value]) => (
              <article key={String(label)} className="min-h-28 bg-white p-4 sm:p-5">
                <p className="text-xs text-neutral-500">{label}</p>
                <p className="mt-4 font-display text-3xl">{value === undefined || value === null || (!hasAnyData && value === 0) ? 'No data yet' : value}</p>
              </article>
            ))}
          </div>
          <section className="mt-10">
            <h2 className="font-display text-2xl">Top pages</h2>
            {!data?.topPages.length ? <p className="mt-4 text-sm text-neutral-500">No data yet</p> : (
              <div className="mt-4 overflow-x-auto border border-black/10 bg-white">
                <table className="w-full text-left text-sm"><thead className="border-b border-black/10 text-xs text-neutral-500"><tr><th scope="col" className="px-4 py-3">Page</th><th scope="col" className="px-4 py-3">Views</th></tr></thead>
                  <tbody>{data.topPages.map((page) => <tr key={page.path} className="border-b border-black/5"><td className="px-4 py-3">{page.path}</td><td className="px-4 py-3">{page.views}</td></tr>)}</tbody>
                </table>
              </div>
            )}
          </section>
          {!analyticsOnly && (
            <section className="mt-10">
              <h2 className="font-display text-2xl">Recent activity</h2>
              {!data?.recentActivity.length ? <p className="mt-4 text-sm text-neutral-500">No data yet</p> : (
                <ul className="mt-4 divide-y divide-black/10 border-y border-black/10 bg-white">
                  {data.recentActivity.map((activity) => (
                    <li key={activity.id} className="flex flex-col justify-between gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center">
                      <span>{activity.action.replaceAll('_', ' ')} · {activity.entity}</span>
                      <time className="text-xs text-neutral-500" dateTime={activity.createdAt}>{new Date(activity.createdAt).toLocaleString()}</time>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </>
      )}
    </section>
  );
};
import React, { useEffect, useState } from 'react';

import {
  adminApi,
  type BookingRecord,
  type BookingStatus,
  type LeadRecord,
  type LeadStatus,
  type Page,
} from '../api/client';

type RecordKind = 'leads' | 'contacts' | 'bookings';
type RecordItem = LeadRecord | BookingRecord;

const leadStatuses: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'CONVERTED', 'LOST', 'ARCHIVED'];
const bookingStatuses: BookingStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'ARCHIVED'];

export const Records: React.FC<{ kind: RecordKind }> = ({ kind }) => {
  const [data, setData] = useState<Page<RecordItem> | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [readFilter, setReadFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState('');
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [rescheduleDates, setRescheduleDates] = useState<Record<string, string>>({});
  const [rescheduleTimes, setRescheduleTimes] = useState<Record<string, string>>({});
  const isLead = kind !== 'bookings';

  const load = async () => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ page: String(page), pageSize: '25', sort: 'createdAt', order: 'desc' });
    if (search.trim()) params.set('search', search.trim());
    if (status) params.set('status', status);
    if (isLead && readFilter) params.set('isRead', readFilter);
    try {
      const response = isLead ? await adminApi.leads(params) : await adminApi.bookings(params);
      setData(response);
      setNoteDrafts(Object.fromEntries(response.items.map((item) => [item.id, item.adminNotes ?? ''])));
      setRescheduleDates(Object.fromEntries(response.items.filter((item): item is BookingRecord => 'preferredDate' in item).map((item) => [item.id, item.preferredDate])));
      setRescheduleTimes(Object.fromEntries(response.items.filter((item): item is BookingRecord => 'preferredTime' in item).map((item) => [item.id, item.preferredTime])));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, [kind, page, status, readFilter]);

  const updateStatus = async (item: RecordItem, nextStatus: string) => {
    setSavingId(item.id);
    setError('');
    try {
      if (isLead) await adminApi.updateLead(item.id, { status: nextStatus as LeadStatus });
      else await adminApi.updateBooking(item.id, { status: nextStatus as BookingStatus });
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update status.');
    } finally {
      setSavingId('');
    }
  };

  const toggleRead = async (item: LeadRecord) => {
    setSavingId(item.id);
    setError('');
    try {
      await adminApi.updateLead(item.id, { isRead: !item.isRead });
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update read state.');
    } finally {
      setSavingId('');
    }
  };

  const saveNotes = async (item: RecordItem) => {
    setSavingId(item.id);
    setError('');
    try {
      if (isLead) await adminApi.updateLead(item.id, { adminNotes: noteDrafts[item.id] ?? '' });
      else await adminApi.updateBooking(item.id, { adminNotes: noteDrafts[item.id] ?? '' });
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save notes.');
    } finally {
      setSavingId('');
    }
  };

  const reschedule = async (item: BookingRecord) => {
    setSavingId(item.id);
    setError('');
    try {
      await adminApi.updateBooking(item.id, {
        preferredDate: rescheduleDates[item.id] ?? item.preferredDate,
        preferredTime: rescheduleTimes[item.id] ?? item.preferredTime,
      });
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to reschedule booking.');
    } finally {
      setSavingId('');
    }
  };

  const statuses = isLead ? leadStatuses : bookingStatuses;

  return (
    <section>
      <div className="border-b border-black/10 pb-6">
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-neutral-500">Client operations</p>
        <h1 className="mt-2 font-display text-4xl">{kind === 'contacts' ? 'Contacts' : isLead ? 'Leads' : 'Bookings'}</h1>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="record-search">Search records</label>
        <input id="record-search" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { setPage(1); void load(); } }} placeholder="Search name, email, company…" className="min-h-10 flex-1 border border-black/20 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black" />
        <label className="sr-only" htmlFor="record-status">Filter by status</label>
        <select id="record-status" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="min-h-10 border border-black/20 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
          <option value="">All statuses</option>{statuses.map((value) => <option value={value} key={value}>{value}</option>)}
        </select>
        {isLead && (
          <label className="sr-only" htmlFor="record-read-filter">Filter by read state</label>
        )}
        {isLead && (
          <select id="record-read-filter" value={readFilter} onChange={(event) => { setReadFilter(event.target.value); setPage(1); }} className="min-h-10 border border-black/20 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
            <option value="">Read and unread</option><option value="false">Unread</option><option value="true">Read</option>
          </select>
        )}
        <button type="button" onClick={() => { setPage(1); void load(); }} className="min-h-10 border border-black/20 px-4 text-sm hover:bg-black hover:text-white">Search</button>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      {loading ? <p className="py-10 text-sm text-neutral-500">Loading records…</p> : !data?.items.length ? <p className="py-10 text-sm text-neutral-500">No data yet</p> : (
        <div className="mt-5 space-y-3">
          {data.items.map((item) => {
            const lead = isLead ? item as LeadRecord : null;
            const booking = !isLead ? item as BookingRecord : null;
            return (
              <article key={item.id} className="border border-black/10 bg-white p-4 sm:p-5">
                <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="mt-1 text-sm text-neutral-600">{item.email}{item.company ? ` · ${item.company}` : ''}</p>
                    <p className="mt-2 text-sm">{lead ? `${lead.service} · ${lead.budget}` : `${booking?.projectType} · ${booking?.budget}`}</p>
                    {booking && <p className="mt-1 text-xs text-neutral-500">Requested: {booking.preferredDate} · {booking.preferredTime}</p>}
                    <p className="mt-1 text-xs text-neutral-500">{item.source} · {new Date(item.createdAt).toLocaleString()}</p>
                    {lead && <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm text-neutral-700">{lead.message}</p>}
                  </div>
                  <label className="text-xs text-neutral-600">Status
                    <select disabled={savingId === item.id} value={item.status} onChange={(event) => void updateStatus(item, event.target.value)} className="ml-2 min-h-9 border border-black/20 bg-white px-2 text-sm text-black">
                      {statuses.map((value) => <option value={value} key={value}>{value}</option>)}
                    </select>
                  </label>
                </div>
                {lead && (
                  <button type="button" disabled={savingId === item.id} onClick={() => void toggleRead(lead)} className="mt-3 min-h-9 border border-black/15 px-3 text-xs hover:bg-black hover:text-white disabled:opacity-50">
                    Mark as {lead.isRead ? 'unread' : 'read'}
                  </button>
                )}
                {booking && (
                  <div className="mt-4 flex flex-col gap-2 border-t border-black/5 pt-4 sm:flex-row sm:items-end">
                    <label className="text-xs text-neutral-600">Reschedule date
                      <input type="date" value={rescheduleDates[item.id] ?? booking.preferredDate} onChange={(event) => setRescheduleDates((current) => ({ ...current, [item.id]: event.target.value }))} className="mt-1 block min-h-10 border border-black/20 px-3 text-sm text-black" />
                    </label>
                    <label className="text-xs text-neutral-600">Time
                      <input type="text" maxLength={100} value={rescheduleTimes[item.id] ?? booking.preferredTime} onChange={(event) => setRescheduleTimes((current) => ({ ...current, [item.id]: event.target.value }))} className="mt-1 block min-h-10 border border-black/20 px-3 text-sm text-black" />
                    </label>
                    <button type="button" disabled={savingId === item.id} onClick={() => void reschedule(booking)} className="min-h-10 border border-black/20 px-4 text-sm hover:bg-black hover:text-white disabled:opacity-50">Reschedule</button>
                  </div>
                )}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <label className="sr-only" htmlFor={`note-${item.id}`}>Internal notes</label>
                  <textarea id={`note-${item.id}`} rows={2} maxLength={5000} value={noteDrafts[item.id] ?? ''} onChange={(event) => setNoteDrafts((current) => ({ ...current, [item.id]: event.target.value }))} placeholder="Internal notes, visible to admins only" className="min-h-10 flex-1 resize-y border border-black/15 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black" />
                  <button type="button" disabled={savingId === item.id} onClick={() => void saveNotes(item)} className="min-h-10 border border-black/20 px-4 text-sm hover:bg-black hover:text-white disabled:opacity-50">Save notes</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {data && data.pagination.pages > 1 && (
        <nav aria-label="Record pages" className="mt-6 flex items-center justify-between text-sm">
          <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="min-h-10 border border-black/20 px-4 disabled:opacity-40">Previous</button>
          <span>Page {page} of {data.pagination.pages} · {data.pagination.total} records</span>
          <button type="button" disabled={page >= data.pagination.pages} onClick={() => setPage((current) => current + 1)} className="min-h-10 border border-black/20 px-4 disabled:opacity-40">Next</button>
        </nav>
      )}
    </section>
  );
};
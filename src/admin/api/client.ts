import { API_BASE_URL } from '../../config/api';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'WON'
  | 'CONVERTED'
  | 'LOST'
  | 'ARCHIVED';

export type BookingStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ARCHIVED';

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  company: string | null;
  service: string;
  budget: string;
  message: string;
  status: LeadStatus;
  source: string;
  isRead: boolean;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRecord {
  id: string;
  name: string;
  email: string;
  company: string | null;
  whatsapp: string;
  projectType: string;
  budget: string;
  preferredDate: string;
  preferredTime: string;
  status: BookingStatus;
  source: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardOverview {
  range: { from: string; to: string };
  metrics: {
    totalLeads: number;
    newLeads: number;
    totalBookings: number;
    upcomingBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    contactSubmissions: number;
    visitors: number;
    uniqueVisitors: number;
    returningVisitors: number;
    pageViews: number;
    conversionRate: number | null;
  };
  topPages: Array<{ path: string; views: number }>;
  recentActivity: Array<{
    id: string;
    action: string;
    entity: string;
    entityId: string | null;
    createdAt: string;
  }>;
}

export interface Page<T> {
  items: T[];
  pagination: { page: number; pageSize: number; total: number; pages: number };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });

  const body = await response.json().catch(() => null) as
    | { success?: boolean; message?: string }
    | null;

  if (!response.ok) {
    throw new Error(body?.message || 'The request could not be completed.');
  }

  return body as T;
}

export const adminApi = {
  login: (email: string, password: string) => request<{ success: true; admin: AdminUser }>(
    '/api/admin/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) },
  ),
  current: () => request<{ success: true; admin: AdminUser }>('/api/admin/auth/me'),
  logout: () => request<{ success: true }>('/api/admin/auth/logout', { method: 'POST' }),
  overview: (from: string, to: string) => request<{
    success: true;
  } & DashboardOverview>(`/api/admin/overview?${new URLSearchParams({ from, to })}`),
  leads: (params: URLSearchParams) => request<{ success: true } & Page<LeadRecord>>(
    `/api/admin/leads?${params}`,
  ),
  bookings: (params: URLSearchParams) => request<{ success: true } & Page<BookingRecord>>(
    `/api/admin/bookings?${params}`,
  ),
  updateLead: (id: string, data: { status?: LeadStatus; adminNotes?: string; isRead?: boolean }) => request<{ success: true; lead: LeadRecord }>(
    `/api/admin/leads/${encodeURIComponent(id)}`,
    { method: 'PATCH', body: JSON.stringify(data) },
  ),
  updateBooking: (id: string, data: {
    status?: BookingStatus;
    adminNotes?: string;
    preferredDate?: string;
    preferredTime?: string;
  }) => request<{ success: true; booking: BookingRecord }>(
    `/api/admin/bookings/${encodeURIComponent(id)}`,
    { method: 'PATCH', body: JSON.stringify(data) },
  ),
};
/**

* @license
* SPDX-License-Identifier: Apache-2.0
  */

import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/WhatsAppButton';
import { PageTransition } from './components/PageTransition';

import { CookieConsent } from './components/CookieConsent';
import { trackAnalyticsEvent } from './lib/analytics';
import { CONSENT_EVENT } from './lib/cookie-consent';

const AdminLayout = lazy(() => import('./admin/AdminLayout').then((module) => ({ default: module.AdminLayout })));
const AdminLogin = lazy(() => import('./admin/pages/Login').then((module) => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard').then((module) => ({ default: module.Dashboard })));
const AdminRecords = lazy(() => import('./admin/pages/Records').then((module) => ({ default: module.Records })));
const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Services = lazy(() => import('./pages/Services').then((module) => ({ default: module.Services })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then((module) => ({ default: module.ServiceDetail })));
const Work = lazy(() => import('./pages/Work').then((module) => ({ default: module.Work })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Reviews = lazy(() => import('./pages/Reviews').then((module) => ({ default: module.Reviews })));
const Blog = lazy(() => import('./pages/Blog').then((module) => ({ default: module.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then((module) => ({ default: module.BlogPost })));
const Booking = lazy(() => import('./pages/Booking').then((module) => ({ default: module.Booking })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));

function AnalyticsPageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;

    const trackPage = () => {
      const eventType = location.pathname === '/book'
        ? 'BOOKING_STARTED'
        : location.pathname.startsWith('/services/')
          ? 'SERVICE_VIEW'
          : location.pathname.startsWith('/work/')
            ? 'WORK_VIEW'
            : 'PAGE_VIEW';
      trackAnalyticsEvent(eventType, location.pathname);
    };

    trackPage();
    window.addEventListener(CONSENT_EVENT, trackPage);
    return () => window.removeEventListener(CONSENT_EVENT, trackPage);
  }, [location.pathname]);

  return null;
}

function NotFound() {
return ( <main
   className="flex min-h-[70vh] items-center justify-center px-6 py-24"
   aria-labelledby="not-found-title"
 > <div className="w-full max-w-3xl text-center"> <p className="mb-6 font-mono-tech text-xs uppercase tracking-[0.2em] text-black/50">
Error 404 </p>

    <h1
      id="not-found-title"
      className="font-display text-6xl leading-none tracking-tight sm:text-8xl"
    >
      Page Not Found
    </h1>

    <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
      The page you are looking for does not exist or may have moved.
    </p>

    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center justify-center border border-[#0A0A0A] bg-[#0A0A0A] px-6 py-3 text-sm font-semibold text-[#F5F5F2] transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
      >
        Back to Home
      </Link>

      <Link
        to="/contact"
        className="inline-flex min-h-11 items-center justify-center border border-[#0A0A0A]/20 px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors hover:border-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
      >
        Contact Novariyan
      </Link>
    </div>
  </div>
</main>

);
}

export default function App() {
return ( <BrowserRouter>
  <AnalyticsPageTracker />
  <Routes>
    <Route path="/admin/login" element={<Suspense fallback={<p className="p-8">Loading admin…</p>}><AdminLogin /></Suspense>} />
    <Route path="/admin" element={<Suspense fallback={<p className="p-8">Loading workspace…</p>}><AdminLayout /></Suspense>}>
      <Route index element={<Suspense fallback={<p>Loading dashboard…</p>}><AdminDashboard /></Suspense>} />
      <Route path="leads" element={<Suspense fallback={<p>Loading leads…</p>}><AdminRecords kind="leads" /></Suspense>} />
      <Route path="contacts" element={<Suspense fallback={<p>Loading contacts…</p>}><AdminRecords kind="contacts" /></Suspense>} />
      <Route path="bookings" element={<Suspense fallback={<p>Loading bookings…</p>}><AdminRecords kind="bookings" /></Suspense>} />
      <Route path="analytics" element={<Suspense fallback={<p>Loading analytics…</p>}><AdminDashboard analyticsOnly /></Suspense>} />
      <Route path="reviews" element={<Suspense fallback={<p>Loading reviews…</p>}><section><h1 className="font-display text-4xl">Reviews</h1><p className="mt-4 text-sm text-neutral-600">Review management is not available yet.</p></section></Suspense>} />
      <Route path="content" element={<Suspense fallback={<p>Loading content…</p>}><section><h1 className="font-display text-4xl">Content</h1><p className="mt-4 text-sm text-neutral-600">Content management is not available yet.</p></section></Suspense>} />
      <Route path="settings" element={<Suspense fallback={<p>Loading settings…</p>}><section><h1 className="font-display text-4xl">Settings</h1><p className="mt-4 text-sm text-neutral-600">Workspace settings are not available yet.</p></section></Suspense>} />
    </Route>
    <Route path="*" element={
      <div className="min-h-screen flex flex-col bg-[#F5F5F2] text-[#0A0A0A]">
        <Navbar />
        <div className="flex-1">
          <PageTransition>
            <Suspense fallback={<main className="min-h-[50vh] px-5 py-16 text-sm text-neutral-500">Loading page…</main>}>
              <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:project" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </div>
        <FloatingWhatsAppButton />
        <Footer />
        <CookieConsent />
      </div>
    } />
  </Routes>
</BrowserRouter>


);
}

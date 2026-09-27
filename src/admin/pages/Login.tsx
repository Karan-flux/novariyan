import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { adminApi } from '../api/client';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await adminApi.login(email, password);
      navigate('/admin', { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#F5F5F2] px-5 text-[#0A0A0A]">
      <section className="w-full max-w-md border border-black/10 bg-white p-7 sm:p-9">
        <p className="font-display text-2xl">NOVARIYAN</p>
        <p className="mt-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-neutral-500">Admin access</p>
        <h1 className="mt-8 font-display text-4xl">Sign in</h1>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <label className="block text-sm" htmlFor="admin-email">Email
            <input id="admin-email" type="email" autoComplete="username" required maxLength={255} value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-11 w-full border border-black/20 px-3 outline-none focus:border-black focus:ring-2 focus:ring-black/20" />
          </label>
          <label className="block text-sm" htmlFor="admin-password">Password
            <input id="admin-password" type="password" autoComplete="current-password" required maxLength={200} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full border border-black/20 px-3 outline-none focus:border-black focus:ring-2 focus:ring-black/20" />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button disabled={submitting} type="submit" className="min-h-11 w-full bg-[#0A0A0A] px-4 text-sm font-semibold text-white disabled:opacity-60">
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
};
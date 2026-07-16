import React from 'react';
import { MotionPanel } from './AppShell';

export function FormCard({ eyebrow, title, children, footer }) {
  return (
    <MotionPanel className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur sm:p-8">
      {eyebrow ? (
        <p className="text-xs font-extrabold uppercase tracking-wide text-rangoli">{eyebrow}</p>
      ) : null}
      {title ? <h1 className="mt-2 font-display text-4xl font-extrabold text-ink">{title}</h1> : null}
      <div className="mt-6">{children}</div>
      {footer ? <div className="mt-6 border-t border-masala/10 pt-5">{footer}</div> : null}
    </MotionPanel>
  );
}

export const inputClass =
  'w-full rounded-2xl border border-masala/10 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-masala/50 focus:border-rangoli focus:ring-4 focus:ring-rangoli/10';

export const buttonClass =
  'inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white shadow-card transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-masala/30';

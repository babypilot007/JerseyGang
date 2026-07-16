import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogIn, Sparkles, UserPlus } from './Icons';

export function BrandMark({ compact = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rangoli via-gulab to-haldi text-lg font-black text-white shadow-card">
        DG
      </span>
      {!compact ? (
        <span>
          <span className="block font-display text-2xl font-extrabold leading-none text-ink">
            Desi Gang
          </span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-masala">
            Jersey City
          </span>
        </span>
      ) : null}
    </Link>
  );
}

export function PublicNav({ title }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-chai/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandMark />
        {title ? <p className="hidden text-sm font-bold text-masala sm:block">{title}</p> : null}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/auth')}
            className="inline-flex items-center gap-2 rounded-full border border-masala/10 bg-white/80 px-4 py-2 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <LogIn size={16} />
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5"
          >
            <UserPlus size={16} />
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
}

export function BackNav({ title = 'Back home' }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-chai/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandMark compact />
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-full border border-masala/10 bg-white/80 px-4 py-2 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
        >
          <ArrowLeft size={16} />
          {title}
        </button>
      </nav>
    </header>
  );
}

export function PageFrame({ children, className = '' }) {
  return (
    <main className={`relative min-h-screen overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-8 top-28 h-28 w-28 rounded-full bg-gulab/40 blur-3xl" />
        <div className="absolute right-12 top-44 h-32 w-32 rounded-full bg-pista/50 blur-3xl" />
        <div className="absolute bottom-24 left-1/3 h-36 w-36 rounded-full bg-haldi/30 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </main>
  );
}

export function SectionIntro({ eyebrow, title, children, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-masala shadow-sm">
          <Sparkles size={14} />
          {eyebrow}
        </div>
      ) : null}
      <h1 className="font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {children ? <div className="mt-5 text-base leading-8 text-masala sm:text-lg">{children}</div> : null}
    </div>
  );
}

export function MotionPanel({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

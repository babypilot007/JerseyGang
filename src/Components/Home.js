import React from 'react'
import Events from '../events';
import Navbar from './Navbar';
import { PageFrame, SectionIntro } from './ui/AppShell';



const Home = () => {
var eventInfo = Events()

  return (
<PageFrame>
  <Navbar/>

  <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-16">
    <SectionIntro
      eyebrow="Airbnb Experiences energy, Meetup soul"
      title="Pastel desi plans for Jersey City weekends."
    >
      <p>
        Find chai walks, rooftop hangs, game nights, food crawls, and community-led moments hosted by people nearby.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-masala shadow-sm">Small groups</span>
        <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-masala shadow-sm">Local hosts</span>
        <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-masala shadow-sm">Desi community</span>
      </div>
    </SectionIntro>

    <div className="rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-soft backdrop-blur">
      <div className="grid gap-3">
        <div className="rounded-3xl bg-gradient-to-br from-gulab to-haldi p-5 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-white/80">This week</p>
          <p className="mt-3 font-display text-4xl font-extrabold">Meet your people.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-pista/50 p-4">
            <p className="text-3xl font-black text-ink">JC</p>
            <p className="text-sm font-bold text-masala">local-first</p>
          </div>
          <div className="rounded-3xl bg-jamun/15 p-4">
            <p className="text-3xl font-black text-ink">RSVP</p>
            <p className="text-sm font-bold text-masala">in one tap</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
    {eventInfo}
  </section>
          
        </PageFrame>
  )
}

export default Home

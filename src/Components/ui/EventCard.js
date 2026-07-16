import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ExternalLink, Flag, MapPin, Share2, Users } from './Icons';
import { WhatsappShareButton } from 'react-share';
import LocationMap from '../LocationMap';

export const shareUrlFor = (id) => `https://desigangjc.com/eventdetails/${id}`;

export function spotsLeft(event) {
  const guestLimit = Number(event.GuestLimit || 0);
  const rsvpIds = Array.isArray(event.Rsvp_Id) ? event.Rsvp_Id : [];
  return Math.max(guestLimit - rsvpIds.length, 0);
}

export function formatPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length < 10) return phone || 'Not shared';
  const lastTen = digits.slice(-10);
  return `${lastTen.slice(0, 3)}-${lastTen.slice(3, 6)}-${lastTen.slice(6)}`;
}

function ShareButton({ event }) {
  return (
    <WhatsappShareButton
      title={`Event : ${event.EventName}\n\n Description : ${event.Event_descp}\n`}
      separator={`\n Time : ${event.EventDate}\n\n Spots Left : ${spotsLeft(event)} \n\nMore details : \n\n`}
      url={shareUrlFor(event.id)}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-masala shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
        <Share2 size={18} />
      </span>
    </WhatsappShareButton>
  );
}

export function PublicEventCard({ event, onDetails }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-card backdrop-blur"
    >
      <div className="h-32 bg-gradient-to-br from-gulab via-haldi to-pista p-5">
        <div className="flex h-full items-start justify-between">
          <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-masala">
            Hosted by {event.UserName || 'Desi Gang'}
          </span>
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-extrabold text-white">
            {spotsLeft(event)} spots
          </span>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">{event.EventName}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-masala">{event.Event_descp}</p>
        </div>
        <div className="flex items-center justify-between border-t border-masala/10 pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-masala">
            <Users size={17} />
            {event.Rsvp || 0} going
          </span>
          {onDetails ? (
            <button
              type="button"
              onClick={() => onDetails(event.id)}
              className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
            >
              View details
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function ExperienceCard({
  event,
  currentUserId,
  showHostActions = false,
  onEdit,
  onDelete,
  onGuestList,
  guestListOpen = false,
  onDetails,
  detailsOpen = false,
  onReport,
  reportOpen = false,
  reportType,
  onReportType,
  onSubmitReport,
  onCancelReport,
  onRsvp,
  onCancelRsvp,
}) {
  const attending = Array.isArray(event.Rsvp_Id) && event.Rsvp_Id.includes(currentUserId);
  const full = spotsLeft(event) === 0 && !attending;
  const guestNames = Array.isArray(event.Rsvp_names) ? event.Rsvp_names : [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-card backdrop-blur"
    >
      <div className="relative bg-gradient-to-br from-rangoli via-gulab to-haldi p-5 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.55),transparent_24%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,.35),transparent_20%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-white/80">
              {event.UserName ? `Hosted by ${event.UserName}` : 'Community experience'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight">{event.EventName}</h2>
          </div>
          <ShareButton event={event} />
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {event.lat && event.long ? (
          <div className="overflow-hidden rounded-3xl border border-masala/10">
            <LocationMap lat={event.lat} lng={event.long} />
          </div>
        ) : null}

        <div className="grid gap-3 text-sm text-masala">
          <a
            className="flex items-start gap-3 rounded-2xl bg-chai/80 p-3 font-semibold"
            href={`https://www.google.com/maps/search/?api=1&query=Jersey+City,+NJ/&query_place_id=${event.placeId || ''}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin className="mt-0.5 text-rangoli" size={18} />
            <span>{event.EventLocation || 'Location coming soon'}</span>
          </a>
          <p className="flex items-start gap-3 rounded-2xl bg-chai/80 p-3 font-semibold">
            <CalendarDays className="mt-0.5 text-jamun" size={18} />
            <span>{event.EventDate || 'Date coming soon'}</span>
          </p>
          {event.URL ? (
            <a
              className="flex items-center gap-3 rounded-2xl bg-chai/80 p-3 font-semibold text-ink"
              href={event.URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="text-pista" size={18} />
              Event link
            </a>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-pista/35 p-4">
            <p className="text-xs font-extrabold uppercase tracking-wide text-masala">Going</p>
            <p className="mt-1 text-2xl font-black text-ink">{event.Rsvp || 0}</p>
          </div>
          <div className="rounded-3xl bg-gulab/35 p-4">
            <p className="text-xs font-extrabold uppercase tracking-wide text-masala">Spots left</p>
            <p className="mt-1 text-2xl font-black text-ink">{spotsLeft(event)}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-wide text-masala">About</p>
          <p className="mt-2 text-sm leading-6 text-ink">{event.Event_descp}</p>
          {event.AddInfo ? <p className="mt-3 text-sm leading-6 text-masala">{event.AddInfo}</p> : null}
          {event.HostNumber ? (
            <a className="mt-3 inline-block text-sm font-bold text-rangoli" href={`tel:${event.HostNumber}`}>
              Contact {formatPhone(event.HostNumber)}
            </a>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onGuestList}
            className="rounded-full border border-masala/10 bg-white px-4 py-2 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5"
          >
            Guest list
          </button>
          {!showHostActions && onDetails ? (
            <button
              type="button"
              onClick={onDetails}
              className="rounded-full border border-masala/10 bg-white px-4 py-2 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5"
            >
              Details
            </button>
          ) : null}
          {!showHostActions && onReport ? (
            <button
              type="button"
              onClick={onReport}
              className="inline-flex items-center gap-2 rounded-full border border-rangoli/20 bg-rangoli/10 px-4 py-2 text-sm font-bold text-rangoli transition hover:-translate-y-0.5"
            >
              <Flag size={15} />
              Report
            </button>
          ) : null}
          {showHostActions ? (
            <>
              <button
                type="button"
                onClick={onEdit}
                className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="rounded-full bg-rangoli px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                Delete
              </button>
            </>
          ) : (
            <div className="ml-auto">
              {attending ? (
                <button
                  type="button"
                  onClick={onCancelRsvp}
                  className="rounded-full bg-white px-5 py-2 text-sm font-extrabold text-rangoli shadow-sm ring-1 ring-rangoli/20 transition hover:-translate-y-0.5"
                >
                  Cancel RSVP
                </button>
              ) : (
                <button
                  type="button"
                  disabled={full}
                  onClick={onRsvp}
                  className="rounded-full bg-ink px-5 py-2 text-sm font-extrabold text-white shadow-card transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-masala/30"
                >
                  {full ? 'Full' : 'Want to attend'}
                </button>
              )}
            </div>
          )}
        </div>

        {guestListOpen ? (
          <div className="rounded-3xl bg-chai p-4">
            <p className="mb-3 text-sm font-extrabold text-ink">Guests</p>
            <div className="grid gap-2">
              {guestNames.map((guest, index) => (
                <div key={`${guest.id || guest.firstName}-${index}`} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gulab to-haldi text-xs font-black text-white">
                    {(guest.firstName || '?')[0]}
                    {(guest.lastName || '')[0]}
                  </span>
                  <span className="text-sm font-semibold text-masala">{guest.firstName}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {detailsOpen ? (
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-sm font-extrabold text-ink">More details</p>
            <p className="mt-2 text-sm leading-6 text-masala">{event.Event_descp}</p>
            {event.AddInfo ? <p className="mt-2 text-sm leading-6 text-masala">{event.AddInfo}</p> : null}
          </div>
        ) : null}

        {reportOpen ? (
          <div className="rounded-3xl border border-rangoli/20 bg-rangoli/10 p-4">
            <p className="text-sm font-extrabold text-ink">Report this event</p>
            <div className="mt-3 grid gap-2 text-sm font-semibold text-masala">
              {['Inappropriate Content', 'scam', 'sus/danger', 'Other'].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`report-${event.id}`}
                    value={item}
                    checked={reportType === item}
                    onChange={(e) => onReportType(e.target.value)}
                  />
                  {item}
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onSubmitReport}
                className="rounded-full bg-rangoli px-4 py-2 text-sm font-bold text-white"
              >
                Report
              </button>
              <button
                type="button"
                onClick={onCancelReport}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

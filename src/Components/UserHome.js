/* eslint-disable */

import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate} from 'react-router-dom';
import Rsvp from './Rsvp';
import LocationMap from './LocationMap';
import Autocomplete from "react-google-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2';
import Terms from './Terms';
import Privacy from '../Privacy';
import { LogOut, Menu, Plus, ShieldCheck, User, Users } from './ui/Icons';
import { PageFrame, BrandMark, SectionIntro } from './ui/AppShell';
import { ExperienceCard } from './ui/EventCard';
import { buttonClass, inputClass } from './ui/FormCard';

const tabClass = (active) =>
  `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition ${
    active
      ? 'bg-ink text-white shadow-card'
      : 'bg-white/80 text-masala shadow-sm hover:-translate-y-0.5 hover:shadow-card'
  }`;

const UserHome = () => {
//   if (process.env.NODE_ENV !== "development" ) {
//     console.log = () => {};
//     console.debug = () => {};
//     console.info = () => {};
//     console.warn = () => {};
// }

  const locApi = process.env.REACT_APP_MAP_API
  const navigate = useNavigate()

  const[lat, getLat] = useState(40.728157)
  const[long, getLong] = useState(-74.077644)
  const[placeId, setPlaceId] = useState('')
  const[infoId, getInfoId] = useState('')
  const[myEvent, setMyEvent] = useState(true)
  const[allEvents, setAllEvent] = useState(false)
  const[rsvpd, setRsvpd] = useState(false)
  const[getId, setId] = useState('')
  const[userInfo, setUserInfo] = useState('')
  const[userLastName, setUserLastName] = useState('')
  const[guestLimit, setGuestLimt] = useState(2)
  const[attend, showAttend] = useState(false)
  const[userid, getUserId] = useState('')
  const[info, setInfo] = useState([])
  const[eventName, getEventName] = useState('')
  const[location, getLocation] = useState('')
  const[eventDescp, getdescp] = useState('')
  const[uRl, getUrl] = useState('')
  const[addInfo, getAddInfo] = useState('')
  const[hostNumber, getHostNumber] = useState('')
  const[sideNavOpen, setSideNavOpen] = useState(false)
  const [className, setClassName] = useState("closedTerms");
  const [classNamePrivacy, setClassNamePrivacy] = useState("closedTerms");

  const [startDate, setStartDate] = useState(new Date());

  useEffect(()=>{
    const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        if(user === null){
          navigate('/auth')
          return
        }
        getUserId(user.id)
        setId(user.id)

      } catch (error) {
        navigate('/auth')
      }
    }
    loggedIn()
  }, [navigate])

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        if(getId){
          const response = await supabase.from('events').select('*').eq('host_id',getId)
          setInfo(response.data || [])

        } 
      } catch (error) {
        setInfo([])
    }}
    
    fetchData()

    const fetchName = async ()=>{
      try {
        if(getId){
          const response_name = await supabase.from('profiles').select('*').eq('id',getId)
          // setInfo(response_name.data || [])

        setUserInfo(response_name.data[0].first_name || '')
        setUserLastName(response_name.data[0].last_name || '')

        }
      } catch (error) {
        
    }}
    
    fetchName()

  }, [getId,userid])

  const logOut = async ()=>{
    try {
      await supabase.auth.signOut()
      navigate('/auth')
    } catch (error) {}
  }



const createEvent = async (e) => {
  e.preventDefault();

  try {
    const { data: event, error: eventError } = await supabase
      .from("events")
      .insert({
        title: eventName,
        description: eventDescp,
        host_id: getId,
        location,
      })
      .select()
      .single();

    if (eventError) {
      console.error(eventError);
      alert(eventError.message);
      return;
    }

    const { error: rsvpError } = await supabase
      .from("event_rsvps")
      .insert({
        event_id: event.id,
        user_id: getId,
        status: "host",
        rsvps: "1"
      });

    if (rsvpError) {
      return;
    }


  } catch (err) {
  }
    window.location.reload();

};

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if(!file) return
    const { error } = await supabase.storage.from('eventimage').upload(event.target.name, file);
    if (error) {
      alert('Error uploading image: ', error.message);
    }
  };

  const deleteEvent = async (id) =>{
    try {
      await supabase.from('events').delete().eq('id', id)
    } catch (error) {}
    window.location.reload();
  }

  const fetchRsvp = async (id)=>{
    try {
      const response = await supabase.from('event_rsvps').select('*').eq('id',id)
      const data = response.data || []
      data.map((e)=> getInfoId(e.id))
    } catch (error) {}
  }

  const activate = (tab) => {
    setMyEvent(tab === 'mine')
    setAllEvent(tab === 'all')
    setRsvpd(tab === 'create')
  }

  const initials = `${userInfo?.[0] || ''}${userLastName?.[0] || ''}` || 'DG'
  const eventyes = info.length > 0
  return (
    <PageFrame>
      <header className="sticky top-0 z-40 border-b border-white/70 bg-chai/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-masala shadow-sm sm:inline-flex">
              {userInfo ? `Hi, ${userInfo}` : 'Welcome'}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gulab to-rangoli text-sm font-black text-white shadow-card">
              {initials}
            </span>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-ink shadow-sm"
              onClick={()=>setSideNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {sideNavOpen ? (
        <div className="fixed inset-0 z-50 bg-ink/30 p-4 backdrop-blur-sm" onClick={()=>setSideNavOpen(false)}>
          <aside className="ml-auto h-full w-full max-w-sm rounded-[2rem] bg-white p-6 shadow-soft" onClick={(event)=>event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <p className="font-display text-3xl font-extrabold text-ink">Menu</p>
              <button className="rounded-full bg-chai px-4 py-2 text-sm font-bold text-ink" onClick={()=>setSideNavOpen(false)}>Close</button>
            </div>
            <div className="mt-8 grid gap-3">
              <button className="flex items-center gap-3 rounded-3xl bg-chai p-4 text-left font-bold text-ink" onClick={()=>{navigate('profile')}}>
                <User size={20} /> Profile
              </button>
              <div className="flex items-center gap-3 rounded-3xl bg-pista/30 p-4 font-bold text-masala">
                <Users size={20} /> Connections
              </div>
              <button className="flex items-center gap-3 rounded-3xl bg-rangoli/10 p-4 text-left font-bold text-rangoli" onClick={logOut}>
                <LogOut size={20} /> Log out
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionIntro eyebrow="Member dashboard" title="Host, discover, and RSVP.">
            <p>Your pastel command center for desi community plans around Jersey City.</p>
          </SectionIntro>
          <div className="flex flex-wrap gap-2">
            <button className={tabClass(myEvent)} onClick={()=>activate('mine')}><ShieldCheck size={16}/> My Events</button>
            <button className={tabClass(allEvents)} onClick={()=>activate('all')}><Users size={16}/> All Events</button>
            <button className={tabClass(rsvpd)} onClick={()=>activate('create')}><Plus size={16}/> Create Event</button>
          </div>
        </div>

        {myEvent ? (
          eventyes ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {info.map((inf)=>(
                <ExperienceCard
                  key={inf.id}
                  event={inf}
                  currentUserId={userid}
                  showHostActions
                  guestListOpen={attend && inf.id === infoId}
                  onGuestList={()=>{showAttend(!attend);fetchRsvp(inf.id)}}
                  onEdit={()=>navigate("/editdetail", {state : {id : inf.id}})}
                  onDelete={()=>deleteEvent(inf.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white/85 p-10 text-center shadow-card">
              <p className="font-display text-3xl font-extrabold text-ink">No hosted events yet.</p>
              <p className="mt-3 font-semibold text-masala">Create an event to social up.</p>
            </div>
          )
        ) : null}

        {allEvents ? <div className="grid gap-6 lg:grid-cols-2"><Rsvp userId={userid} />
        

        
        </div> : null}

        {rsvpd ? (
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex flex-wrap gap-3">
              <button className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-masala shadow-sm" onClick={()=>setClassName('openTerms')}>
                Terms of Use
              </button>
              <button className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-masala shadow-sm" onClick={()=>setClassNamePrivacy('openTerms')}>
                Privacy Policy
              </button>
            </div>

            <div className={className}>
              <div className="mb-5 rounded-[2rem] bg-white p-6 shadow-card">
                <button className="mb-4 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white" onClick={()=>setClassName('closedTerms')}>Close</button>
                <Terms />
              </div>
            </div>

            <div className={classNamePrivacy}>
              <div className="mb-5 rounded-[2rem] bg-white p-6 shadow-card">
                <button className="mb-4 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white" onClick={()=>setClassNamePrivacy('closedTerms')}>Close</button>
                <Privacy />
              </div>
            </div>

            <form className="space-y-4 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur sm:p-8" onSubmit={createEvent}>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-rangoli">Create an experience</p>
                <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">What are we doing?</h2>
              </div>

              <input className={inputClass} type="text" placeholder="Event Name" value={eventName} required onChange={(e) => getEventName(e.target.value)} />

              <Autocomplete
                apiKey={locApi}
                placeholder="Location in Jersey City"
                className={inputClass}
                componentRestrictions={{ country: "us" }}
                options={{ types: ["geocode", "establishment"], fields : ['formatted_address','name','geometry','place_id'] }}
                onPlaceSelected={(place) => {
                  if( place.formatted_address && place.formatted_address.includes(place.name)) {
                    getLocation(place.formatted_address)
                  } else{
                    getLocation(`${place.name || ''}, ${place.formatted_address || ''}`)
                  }
                  getLat(place.geometry.location.lat())
                  getLong(place.geometry.location.lng())
                  setPlaceId(place.place_id)
                }}
              />

              <div className="overflow-hidden rounded-3xl border border-masala/10">
                <LocationMap lat={lat} lng={long}/>
              </div>

              <input className={inputClass} type="text" placeholder="Additional info (Rooftop, floor 15)" value={addInfo} onChange={(e) => {getAddInfo(e.target.value)}} />
              <input className={inputClass} type="number" placeholder="Guest Limit (Min 2)" min={2} value={guestLimit} onChange={(e) => setGuestLimt(e.target.value)} />

              <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    showTimeSelect
    timeIntervals={15}
    dateFormat="MMMM d, yyyy h:mm aa"
    minDate={new Date()}
    placeholderText="Select date & time"
    className="glass-date-picker"
/>

              <input className={inputClass} type="url" placeholder="Event URL https://" value={uRl} onChange={(e) => getUrl(e.target.value)} />

              <PhoneInput
                className="number"
                country={"us"}
                onlyCountries={["us"]}
                placeholder='+1 {Contact}'
                value={hostNumber}
                onChange={getHostNumber}
                autoFormat={true}
                required={true}
                disableCountryCode={true}
              />

              <textarea rows='7' className={`${inputClass} resize-none`} placeholder='Describe the event' value={eventDescp} required onChange={(e) => getdescp(e.target.value)} />

              <input className={inputClass} type="file" onChange={handleUpload} />

              <button className={buttonClass} type='submit'>
                Create event
              </button>
            </form>
          </div>
        ) : null}
      </section>
    </PageFrame>
  )
}

export default UserHome

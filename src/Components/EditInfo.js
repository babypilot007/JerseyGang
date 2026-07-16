/* eslint-disable */

import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import LocationMap from './LocationMap';
import Autocomplete from "react-google-autocomplete";
import Datetime from 'react-datetime';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { BackNav, PageFrame } from './ui/AppShell';
import { buttonClass, FormCard, inputClass } from './ui/FormCard';

function EditInfo() {
  if (process.env.NODE_ENV !== "development") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
  }

  const locationId = useLocation()
  const navigate = useNavigate()
  const id = locationId.state && locationId.state.id
  const locApi = process.env.REACT_APP_MAP_API
  const[lat, getLat] = useState('')
  const[long, getLong] = useState('')
  const[placeId, setPlaceId] = useState('')
  const[info, setInfo] = useState('')
  const[eventName, getEventName] = useState('')
  const[location, getLocation] = useState('')
  const[eventDescp, getdescp] = useState('')
  const[uRl, getUrl] = useState('')
  const[guestLimit, setGuestLimt] = useState('')
  const[hostNumber, getHostNumber] = useState('')
  const [newDate, setNewDate] = useState();
  const[oldDate, setOldDate] = useState('')

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        if(!id){
          navigate('/userhome')
          return
        }
        const response = await supabase.from('event').select('*').eq('id',id)
        const event = response.data[0]
        getEventName(event.EventName)
        setInfo(event.AddInfo)
        getdescp(event.Event_descp)
        getUrl(event.URL)
        setOldDate(event.FormatDate)
        setPlaceId(event.placeId)
        getLat(event.lat)
        getLong(event.long)
        setGuestLimt(event.GuestLimit)
        getLocation(event.EventLocation)
        getHostNumber(event.HostNumber)
      } catch (error) {}
    }
    fetchData()
  }, [id, navigate])

  const handleChange = (event) => {
    const dateValue = event && event._d ? event._d : event
    setNewDate(moment(dateValue).format('dddd, MMMM Do YYYY, h:mm a'));
    setOldDate(dateValue)
  };

  const createEvent = async (event) =>{
    event.preventDefault()
    try {
      await supabase.from('event').update([
        {
          EventLocation : location,
          Event_descp : eventDescp,
          EventName : eventName,
          EventDate: newDate || moment(oldDate).format('dddd, MMMM Do YYYY, h:mm a'),
          lat: lat,
          long:long,
          placeId : placeId,
          URL : uRl,
          AddInfo : info,
          FormatDate : oldDate,
          GuestLimit : guestLimit,
          HostNumber : hostNumber
        }
      ]).eq('id',id)
    } catch (error) {}
    navigate('/userhome')
  }

  let inputProps = {
    disabled: false,
    placeholder: oldDate ? moment(oldDate).format('dddd, MMMM Do YYYY, h:mm a') : 'Choose a date',
    require : true,
    value : newDate,
  };

  return (
    <PageFrame>
      <BackNav title="Dashboard" />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <FormCard eyebrow="Host tools" title="Refresh your event details.">
          <form className="space-y-4" onSubmit={createEvent}>
            <input className={inputClass} type="text" placeholder="Event Name" value={eventName} required onChange={(e) => getEventName(e.target.value)} />

            <Autocomplete
              apiKey={locApi}
              defaultValue={location}
              placeholder="Location"
              className={inputClass}
              componentRestrictions={{ country: "us" }}
              options={{ types: ["geocode", "establishment"], fields : ['formatted_address','name','geometry','place_id'] }}
              onPlaceSelected={(place) => {
                if(place.formatted_address && place.formatted_address.includes(place.name)) {
                  getLocation(place.formatted_address)
                } else{
                  getLocation(`${place.name || ''}, ${place.formatted_address || ''}`)
                }
                getLat(place.geometry.location.lat())
                getLong(place.geometry.location.lng())
                setPlaceId(place.place_id)
              }}
            />

            {lat && long ? (
              <div className="overflow-hidden rounded-3xl border border-masala/10">
                <LocationMap lat={parseFloat(lat)} lng={parseFloat(long)}/>
              </div>
            ) : null}

            <input className={inputClass} type="text" placeholder="Additional info (Rooftop, floor 15)" value={info} onChange={(e) => setInfo(e.target.value)} />
            <input className={inputClass} type="number" placeholder="Guest Limit" value={guestLimit} onChange={(e) => setGuestLimt(e.target.value)} />

            <Datetime
              type='input'
              className='rdt'
              calendarIcon={false}
              clearIcon={false}
              showTimeSelect
              locale='us'
              utc={false}
              inputProps={inputProps}
              showLeadingZeros={true}
              timeConstraints={{'minutes': {'min': 0, 'step': 15}}}
              onChange={handleChange}
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

            <button className={buttonClass} type='submit'>
              Update event
            </button>
          </form>
        </FormCard>
      </section>
    </PageFrame>
  )
}

export default EditInfo

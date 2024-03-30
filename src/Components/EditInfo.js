import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
// import { useNavigate} from 'react-router-dom';
// import loc from './location.png'
// import cal from './calendar.png'
import LocationMap from './LocationMap';
import Autocomplete from "react-google-autocomplete";
import Datetime from 'react-datetime';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


function EditInfo() {

    const locationId = useLocation()
    const id = locationId.state.id
    // const navigate = useNavigate()
    const locApi = process.env.REACT_APP_MAP_API
      
    const[lat, getLat] = useState('')
    const[long, getLong] = useState('')
    const[placeId, setPlaceId] = useState('')
  
  
  
  
  
    const[info, setInfo] = useState('')
    const[eventName, getEventName] = useState('')
    const[location, getLocation] = useState('')
    const[eventDescp, getdescp] = useState('')
    const[uRl, getUrl] = useState('')
  



  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await supabase.from('event').select('*').eq('id',id)
        console.log(response.data)

        getEventName(response.data[0].EventName)
        setInfo(response.data[0].AddInfo)
        getdescp(response.data[0].Event_descp)
        // setStartDate(response.data[0].EventDate)
        getUrl(response.data[0].URL)
       setOldDate(response.data[0].EventDate)
      setPlaceId(response.data[0].placeId)
       getLat((response.data[0].lat))
       getLong(response.data[0].long)

        getLocation(response.data[0].EventLocation)

        
      } catch (error) {
      
    }}
    fetchData()
  }, [id])

  const [oldDate, setOldDate] = useState('');


  const [startDate, setStartDate] = useState(new Date());


 

  const createEvent = async () =>{

    try {
      const {data: {user}} = await supabase.from('event').update([
        {
          EventLocation : location,
          Event_descp : eventDescp,
          EventName : eventName,
          EventDate: moment(startDate).format('dddd, MMMM Do YYYY, h:mm a'),
          lat: lat,
          long:long,
          placeId : placeId,
          URL : uRl,
          AddInfo : info
        }
      ]).eq('id',id)
      console.log(user)
      
    } catch (error) {
    }
    window.location.reload();

  }
  return (

        <div className=''>


            <form className="signupform" onSubmit={createEvent}>
    
    <input
        className="inputField"
        type="EventName"
        placeholder="Event Name"
        value={eventName}
        required={true}
        onChange={(e) => getEventName(e.target.value)}
      />
 
    <Autocomplete
    
    apiKey={locApi}
    defaultValue={location}
    placeholder="Location"
    componentRestrictions={{ country: "us , ind" }}
      options={{
        types: ["geocode", "establishment"],
      }}

    onPlaceSelected={(place) => {
      getLocation(place.formatted_address)
      console.log(place)
      getLat(place.geometry.location.lat())
      getLong(place.geometry.location.lng())
      setPlaceId(place.place_id)
            console.log(placeId)
      }}
    />;
<p>{<LocationMap
   lat = {parseFloat(lat)}
   lng = {parseFloat(long)}/>}</p>

    <input
        className="inputField"
        type="Username"
        placeholder="Additional info (Rooftop, floor 15)"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      />
        
              
              <div>
              
              </div>
    
    
<Datetime 
type = 'input'
className='rdt'
 calendarIcon = {false}
 clearIcon={false}
 showTimeSelect
 locale='us'
 value={startDate}
 minDate={new Date()}
 required = {true}
 utc = {false}
 initialViewDate={oldDate}
 showLeadingZeros ={true}
  onSelect={()=>{return startDate}}
  onChange={(date)=>{setStartDate(date)
    moment(startDate).format('dddd, MMMM Do YYYY, h:mm:ss a')
    }}/>

    <input
        className="inputField"
        type="Username"
        placeholder="Event URL https://"
        value={uRl}
        onChange={(e) => getUrl(e.target.value)}
      />
    <textarea rows='20' cols='20' 
    className='inputField_textbox'
    placeholder='Describe the Event'
    value={eventDescp}
    required={true}
    onChange={(e) => getdescp(e.target.value)
    }
    />


  <button type='submit' >
         Update
     </button>
  </form>
  
           
        </div>
  )
}

export default EditInfo
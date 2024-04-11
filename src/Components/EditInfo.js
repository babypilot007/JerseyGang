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
import xtype from 'xtypejs'
import PhoneInput from 'react-phone-input-2';




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
  const[guestLimit, setGuestLimt] = useState('')

  
  const[hostNumber, getHostNumber] = useState('')
  const[originalNumber, setHostNumber] = useState('')



  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await supabase.from('event').select('*').eq('id',id)
        console.log(response.data)

        getEventName(response.data[0].EventName)
        setInfo(response.data[0].AddInfo)
        getdescp(response.data[0].Event_descp)
        setStartDate(response.data[0].FormatDate)
        getUrl(response.data[0].URL)
    //    setOldDate(response.data[0].EventDate)
      setPlaceId(response.data[0].placeId)
       getLat((response.data[0].lat))
       getLong(response.data[0].long)
        setGuestLimt(response.data[0].GuestLimit)
        getLocation(response.data[0].EventLocation)
        getHostNumber(response.data[0].HostNumber)
        setHostNumber(response.data[0].PhoneOriginal)

      } catch (error) {
      
    }}
    fetchData()
  }, [id])

  const [startDate, setStartDate] = useState();


  let changeDate =   new Date(startDate)

  changeDate = changeDate.toDateString()


console.log(changeDate)

console.log(xtype(changeDate))



function onchange (date){

    setStartDate(moment(date).format('llll'))



}





 

  const createEvent = async (event) =>{
    event.preventDefault()

    try {
      const {data: {user}} = await supabase.from('event').update([
        {
          EventLocation : location,
          Event_descp : eventDescp,
          EventName : eventName,
          EventDate: moment(startDate).format('llll'),
          lat: lat,
          long:long,
          placeId : placeId,
          URL : uRl,
          AddInfo : info,
          FormatDate : moment(startDate).format('llll'),
          GuestLimit : guestLimit,
          HostNumber : hostNumber

        }
      ]).eq('id',id)
      console.log(user)
      
    } catch (error) {
    }
    window.location.reload();

  }


  
  let inputProps = {
    disabled: false,
    placeholder:startDate,
    value : startDate,
    require : true
};
  return (

        <div className='formDiv'>


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
        fields : ['']

      }}

    onPlaceSelected={(place) => {
      getLocation(place.name +', ' + place.formatted_address)
      getLat(place.geometry.location.lat())
      getLong(place.geometry.location.lng())
      setPlaceId(place.place_id)
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
        <input
            className="inputField"
            type="number"
            placeholder="Guest Limit"
            value={guestLimit}
            onChange={(e) => setGuestLimt(e.target.value)}
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
 required = {true}
 utc = {false}
 inputProps={inputProps}
 showLeadingZeros ={true}

//  onSelect={()=>{return startDate}}
 onChange={(date)=>{
    
        onchange(date)
    // setChangeFormat(moment(startDate).format('llll'))
    

   console.log( date)
//    moment(startDate).format('dddd, MMMM Do YYYY, h:mm:ss a')
   }}/>

    <input
        className="inputField"
        type="Username"
        placeholder="Event URL https://"
        value={uRl}
        onChange={(e) => getUrl(e.target.value)}
      />

<PhoneInput
          className="number"
          country={"us"}
          onlyCountries={["us"]}
          placeholder='+1 {Contact}'
          value={'+' + hostNumber.slice(0,1) + ' '+ hostNumber.slice(1,4) + '-' + hostNumber.slice(4,7) + '-' + hostNumber.slice(7,11)}
          onChange={getHostNumber}
          countryCodeEditable = {false}
          autoFormat = {true}
          />
  {console.log(hostNumber)}

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
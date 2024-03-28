
import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate} from 'react-router-dom';
import Rsvp from './Rsvp';
import loc from './location.png'
import cal from './calendar.png'
import LocationMap from './LocationMap';
import Autocomplete from "react-google-autocomplete";






const UserHome = () => {
  const locApi = process.env.REACT_APP_MAP_API
      
  const[lat, getLat] = useState(40.728157)
  const[long, getLong] = useState(-74.077644)
  const[placeId, setPlaceId] = useState('')




  const navigate = useNavigate()

  const[myEvent, setMyEvent] = useState(true)
  const[allEvents, setAllEvent] = useState(false)
  const[rsvpd, setRsvpd] = useState(false)
  const[getId, setId] = useState('')
  const[userInfo, setUserInfo] = useState('')
  const[userLastName, setUserLastName] = useState('')

  const[userid, getUserId] = useState('')
  const[info, setInfo] = useState('')
  const[eventName, getEventName] = useState('')
  const[location, getLocation] = useState('')
  const[eventDescp, getdescp] = useState('')
  const[eventDate, getEventDate] = useState('')
  const[uRl, getUrl] = useState('')
  const[addInfo, getAddInfo] = useState('')



  



  const[onRefresh, setRefresh] = useState(0)


  // const [dateValue, onchange] = useState(new Date());


    useEffect(()=>{

      const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        
             setUserInfo(user.user_metadata.firstName)
             getUserId(user.id)
             setUserLastName(user.user_metadata.lastName)



          setId(user.id)

      } catch (error) {
        if(error){
        }
      }
    }
    loggedIn()

  }, [navigate])

  var eventInfo = Rsvp(userid)


  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        if(getId){
        const response = await supabase.from('event').select('*').eq('UserId',getId)
          var match = response.data[0].Rsvp_Id
            if(match.includes(userid))
            {
            }            console.log(response.data[0].Rsvp_Id)
            if(response.data !== null){
            setInfo(response.data)
            }
            else setInfo(null)
        } 
      } catch (error) {
      
    }}
    fetchData()
  }, [getId,userid])


    const logOut = async ()=>{
    try {
        const { error } = await supabase.auth.signOut()
      
            console.log(error)
       navigate('/auth')
            
    } catch (error) {
      if(error){
      }

    }
  }


    const createEvent = async () =>{

      try {
        const {data: {user}} = await supabase.from('event').insert([
          {
            EventLocation : location,
            UserId : getId,
            UserName : userInfo,
            Event_descp : eventDescp,
            EventName : eventName,
            Rsvp : 1,
            EventDate: eventDate,
            Rsvp_names : [{"firstName" : userInfo + " (Host)" , "id" : userid,"lastName" :userLastName}],
            Rsvp_Id : [getId],
            lat: lat,
            long:long,
            placeId : placeId,
            URL : uRl,
            AddInfo : addInfo
          }
        ])
        console.log(user)
      } catch (error) {
      }
      window.location.reload();

    }




  const deleteEvent = async (id) =>{


    try {
      const {data: {user}} = await supabase.from('event').delete().eq('id', id)
        console.log(user)

    } catch (error) {
    }
    console.log(id)
    window.location.reload();


  }


  

var eventyes = ''

 if(info.length === 0){

    eventyes = false

 } else eventyes = true
  
    return (
<>
  <div className='navUser'>

  <span className='nameIcon_nav'>{userInfo[0]}{userLastName[0]}</span><p>{userInfo} </p><button onClick={()=>{logOut()}}>Log out</button>
    </div>       

    <div className='userButton'> 
    <button  className="myeventBtn" mybtn = {onRefresh} onClick={()=>{setMyEvent(true);setAllEvent(false);setRsvpd(false)}}>My Events
    </button> 
    <button onClick={()=>{setMyEvent(false);setAllEvent(true);setRsvpd(false);setRefresh(1)}}>All Events</button> 
    <button onClick={()=>{setMyEvent(false);setAllEvent(false);setRsvpd(true)}}>Create Event</button> 
    </div>
  
    <div className='simple'>

    {myEvent ? 
    <div className='forms'>

      {eventyes ?  <div className='event_details'>
            {  
            info.map((inf,ind)=>{
             
             return(
               <div className='event_hover' key = {ind}>
                              
                          <div className='descp'>

                          <div className='event_header'><h1>{inf.EventName}</h1></div>

                          <div className='event_middle'>
                          <p>{<LocationMap
                          lat = {inf.lat}
                          lng = {inf.long}/>}</p>
                                <p>  <img  src={loc} alt='location' height="30px"></img> - <a href={ 'https://www.google.com/maps/search/?api=1&query=Jersey+City,+NJ/&query_place_id=' + inf.placeId}>{inf.EventLocation}</a></p>
                                <p ><img  src={cal} alt='location' height="30px"></img> - {inf.EventDate}</p>
                                <p>  Link - <a href={inf.URL}> Click for the Link</a></p>

                        </div>
                          

                                <div className='descp_header'>
                                    <p><span>Decription : </span><br></br>{inf.Event_descp}</p>
                                    <p><span>Additional Info : </span><br></br>{inf.AddInfo}</p>

                                    </div>
                                   <div className='deleteBtnBackground'>

                                   <button className='deleteBtn' onClick = {()=>{

                                      }}>Edit</button> 
                                          <button className='deleteBtn' onClick = {()=>{
                                              deleteEvent(inf.id)

                                      }}>Delete</button> 

                                            </div>
                              </div>



                    
                        </div>
              )
            })
        }  
      
        
        </div> : <div  className='event_details'><p>No Events<br></br>create an Event to Social Up</p>
        </div>}


 

      </div> :null}
 
      {allEvents ? <div className='event_details'>
      

      <p>{eventInfo}</p>
      </div>:null}


  {rsvpd ? <div className='formDiv'>
 
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
        defaultValue={'Jersey City'}
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
          
          }}
        />;

<p>{<LocationMap
       lat = {lat}
       lng = {long}/>}</p>

        <input
            className="inputField"
            type="Username"
            placeholder="Additional info (Rooftop, floor 15)"
            value={addInfo}
            onChange={(e) => getAddInfo(e.target.value)}
          />

        <input
            className="inputField"
            type="Username"
            placeholder="Date"
            value={eventDate}
            required={true}
            onChange={(e) => getEventDate(e.target.value)}
          />
          
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


      <button type='submit'>
             create an Event
         </button>
      </form>

      

      </div> :null}

    </div>
        
    </>
  )

}

export default UserHome
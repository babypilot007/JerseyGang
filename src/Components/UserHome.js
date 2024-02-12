
import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate} from 'react-router-dom';
import Events from '../events';





const UserHome = () => {

  const navigate = useNavigate()
var eventInfo = Events()


  const[myEvent, setMyEvent] = useState(true)
  const[allEvents, setAllEvent] = useState(false)


  const[getId, setId] = useState('')
  // const[name, getName] = useState('')

  const[userInfo, setUserInfo] = useState('')
  const[info, setInfo] = useState('')
  const[eventName, getEventName] = useState('')

  const[eventId, getEventId] = useState('')

  const[location, getLocation] = useState('')
  // const[eventDescp, getdescp] = useState('')
  // const[date, getDate] = useState('')
  // const[time, getTine] = useState('')







    useEffect(()=>{

      const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        
             setUserInfo(user.user_metadata.firstName)
          console.log(user.user_metadata.firstName)

          setId(user.id)

      } catch (error) {
        if(error){
              navigate('/')
        }
      }
    }
    loggedIn()

  }, [navigate])

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        if(getId){
        const response = await supabase.from('event').select('*').eq('UserId',getId)
        // const Uname = await supabase.from('event').select('*').eq('UserName',name)

            if(response.data !== null){
            setInfo(response.data)

            // getName(name)
            }
            else setInfo(null)

        } 
      } catch (error) {
      }
    }
    fetchData()
  }, [getId])


  const createEvent = async () =>{

    try {
      const {data: {user}} = await supabase.from('event').insert([
        {
          EventLocation : location,
          UserId : getId,
          UserName : userInfo,
          // eventDescp : eventDescp
          EventName : eventName
        }
      ])
      
        setUserInfo(user.user_matadata)

        console.log(userInfo)
    } catch (error) {
    }
  }

  const deleteEvent = async () =>{

    try {
      const {data: {user}} = await supabase.from('event').delete().eq('id', eventId)
        console.log(user)
    } catch (error) {
    }
  }
 


  
  
    return (

    <div className='simple'>
      
      <h1>Welcome, {userInfo}</h1>
      
    <div> <button onClick={()=>{setMyEvent(true);setAllEvent(false)}}>My Events</button> <button onClick={()=>{setMyEvent(false);setAllEvent(true)}}>All Events</button> </div>
    
    {myEvent ? 
    
    <div>
      {info ?  <div className='event_details'>Your Events
            {  
            info.map((inf)=>{
             
             return(
               <div className='event_hover' key = {info.id}>
                        <div className='event_header'>
                          <h1>{inf.EventName}</h1>
                          <h1>{inf.UserName}</h1>
                          <h1>{}</h1>                          


                           </div>
                          <h3>{inf.EventLocation}</h3>

                    <div className='btn_grp'>
                        <button className='details'>Details</button> 
                        <button className='details' onClick = {()=>{
                                    getEventId(inf.id)
                                    console.log(eventId)
                                    deleteEvent()

                        }}>Delete</button> 

                     </div>   
                        </div>
              )
            })
        }  
      
        
        </div> : <div  className='event_details'>No Events
        </div>}
        <form className="signupform" onSubmit={createEvent}>

<input
    className="inputField"
    type="EventName"
    placeholder="Event Name"
    value={eventName}
    required={true}
    onChange={(e) => getEventName(e.target.value)}
  />
<br></br>
<input
    className="inputField"
    type="Username"
    placeholder="Event Location"
    value={location}
    required={true}
    onChange={(e) => getLocation(e.target.value)}
  />
<br></br>
</form>

    <button className='form_btn' onClick={createEvent}>
             <span>create an Event</span>
          </button>
      </div> :null}
 
      {allEvents ? <div className='event_details'> <p>All Events</p>
      <p>{eventInfo}</p></div>:null}
    </div>
  )
}

export default UserHome
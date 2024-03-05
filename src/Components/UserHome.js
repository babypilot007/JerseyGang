
import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate} from 'react-router-dom';
// import Events from '../events';
import Rsvp from './Rsvp';





const UserHome = () => {

  const navigate = useNavigate()
var eventInfo = Rsvp()

  const[myEvent, setMyEvent] = useState(true)
  const[allEvents, setAllEvent] = useState(false)

  const[getmyEvent, setGetMyEvent] = useState(false)



  // const[getName, setName] = useState('')
  const[getId, setId] = useState('')

  // const[name, getName] = useState('')

  const[userInfo, setUserInfo] = useState('')
  const[info, setInfo] = useState('')

  const[eventName, getEventName] = useState('')

  const[eventId, getEventId] = useState('')

  const[location, getLocation] = useState('')
  // const[eventDescp, getdescp] = useState('')







    useEffect(()=>{

      const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        
             setUserInfo(user.user_metadata.firstName)

          console.log(user.user_metadata.firstName)

          setId(user.id)

      } catch (error) {
        if(error){
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

            if(response.data !== null){

            setInfo(response.data)


            }
            else setInfo(null)

        } 
      } catch (error) {
      
    }}
    fetchData()
  }, [getmyEvent, getId])


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
            // eventDescp : eventDescp
            EventName : eventName,
            Rsvp : 1,
            Rsvp_names : [userInfo],
            Rsvp_Id : [getId]
          }
        ])
          
          setGetMyEvent(true)
          setUserInfo(user.user_matadata)

      } catch (error) {
      }
      window.location.reload();

    }


 useEffect(()=>{
  const deleteEvent = async () =>{

    try {
      const {data: {user}} = await supabase.from('event').delete().eq('id', eventId)
        console.log(user)

    } catch (error) {
    }

  }

  deleteEvent()


 },[eventId])
 

var eventyes = ''

 if(info.length === 0){

    eventyes = false

 } else eventyes = true
  
    return (
<>
  <div className='navUser'>
  <p>{userInfo}</p><button onClick={()=>{logOut()}}>Log out</button>
    </div>       

    <div className='simple'>
      
      
    <div> <button onClick={()=>{setMyEvent(true);setAllEvent(false)}}>My Events</button> <button onClick={()=>{setMyEvent(false);setAllEvent(true)}}>All Events</button> </div>
   

    {myEvent ? 
    <div>

      {eventyes ?  <div className='event_details'>
            {  
            info.map((inf)=>{
             
             return(
               <div className='event_hover' key = {info.id}>
                        <div className='event_header'>
                          <h1>{inf.EventName}</h1>
                           </div>
                          <p>RSVP'd : {inf.Rsvp}</p>                          

                    <div className='btn_grp'>
                        <button className='details'>Details</button> 
                        <button className='details' onClick = {()=>{
                                    getEventId(inf.id)
                                     window.location.reload();


                        }}>Delete</button> 

                     </div>   
                        </div>
              )
            })
        }  
      
        
        </div> : <div  className='event_details'><p>No Events<br></br>create an Event to Social Up</p>
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
 
      {allEvents ? <div className='event_details'>
      <p>{eventInfo}</p>
      </div>:null}
    </div>
    </>
  )

}

export default UserHome
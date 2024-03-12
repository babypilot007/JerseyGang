
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
  const[rsvpd, setRsvpd] = useState(false)





  const[getId, setId] = useState('')
  const[userInfo, setUserInfo] = useState('')
  const[userid, getUserId] = useState('')
  const[info, setInfo] = useState('')
  const[eventName, getEventName] = useState('')
  const[location, getLocation] = useState('')
  const[eventDescp, getdescp] = useState('')
  const[eventDate, getEventDate] = useState('')


  const[foundId, setFoundId] = useState(false)


  // function sendEmail(){

  //   const axios = require('axios')
  //   const sgMail = require('@sendgrid/mail')
  //   sgMail.setApiKey("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")
  //   const msg = {
  //   to: 'cfihimalay@gmail.com', // Change to your recipient
  //   from: 'indianjerseygang@gmail.com', // Change to your verified sender
  //   subject: 'Sending with SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  // const send = async () => {
  //   try {
  //     await sgMail.send(msg);
  //   } catch (error) {
  //     console.error(error);
  
  //     if (error.response) {
  //       console.error(error.response.body)
  //     }
  //   }
  // };

  // send()
  // }
  
  // sendEmail()



    useEffect(()=>{

      const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        
             setUserInfo(user.user_metadata.firstName)
             getUserId(user.id)



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
          var match = response.data[0].Rsvp_Id
            if(match.includes(userid))
            {
              setFoundId(true)
            }else setFoundId(false)
            console.log(response.data[0].Rsvp_Id)
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
            Rsvp_names : [userInfo + " (Host)"],
            Rsvp_Id : [getId]
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

  <p>{userInfo}</p><button onClick={()=>{logOut()}}>Log out</button>
    </div>       

    <div className='userButton'> 
    <button onClick={()=>{setMyEvent(true);setAllEvent(false);setRsvpd(false)}}>My Events
    </button> 
    <button onClick={()=>{setMyEvent(false);setAllEvent(true);setRsvpd(false)}}>All Events</button> 
    <button onClick={()=>{setMyEvent(false);setAllEvent(false);setRsvpd(true)}}>Create Event</button> </div>

    <div className='simple'>

    {myEvent ? 
    <div className='forms'>

      {eventyes ?  <div className='event_details'>
            {  
            info.map((inf,ind)=>{
             
             return(
               <div className='event_hover' key = {ind}>
                        <div className='event_header'>
                          <h1>{inf.EventName}</h1>
                           </div>
                           <h3>{inf.EventLocation}</h3>
                           <p>{inf.Event_descp}</p>
                           <p>{inf.EventDate}</p>



                    <div className='btn_grp'>
                        <button className='details' onClick = {()=>{
                                    deleteEvent(inf.id)

                        }}>Delete</button> 

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
        <input
            className="inputField"
            type="Username"
            placeholder="Date"
            value={eventDate}
            required={true}
            onChange={(e) => getEventDate(e.target.value)}
          />

        <textarea rows='20' cols='20' 
        className='inputField_textbox'
        placeholder='Describe the Event'
        value={eventDescp}
        onChange={(e) => getdescp(e.target.value)
        }
        />


      <button onClick={createEvent}>
             <span>create an Event</span>
          </button>

      </form>
      </div> :null}
    </div>
    </>
  )

}

export default UserHome
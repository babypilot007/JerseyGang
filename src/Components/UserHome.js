
import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'



const UserHome = () => {

  const[getId, setId] = useState('')
  const[userInfo, setUserInfo] = useState('')
  const[info, setInfo] = useState('')
  const[eventName, getEventName] = useState('')

  const[location, getLocation] = useState('')
  // const[eventDescp, getdescp] = useState('')
  // const[date, getDate] = useState('')
  // const[time, getTine] = useState('')







    useEffect(()=>{

      const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        
             setUserInfo([user.user_metadata.lastName])
          console.log(user.user_metadata.lastName)

          setId(user.id)

      } catch (error) {
      }
    }
    loggedIn()

  }, [])

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        if(getId){
        const response = await supabase.from('event').select('*').eq('UserId',getId)
            if(response.data !== null){
            setInfo(response.data)}
            else setInfo(null)

        } 
      } catch (error) {
      }
    }
    fetchData()
  }, [getId])


  const createEvent = async () =>{

    try {
      const {data: {user},} = await supabase.from('event').insert([
        {
          EventLocation : location,
          UserId : getId,
          // UserName : userName,
          // eventDescp : eventDescp
        }
      ])
      
        setUserInfo(user.user_matadata)

        console.log(userInfo)
    } catch (error) {
    }
  }


 


  
  
    return (

    <div className='simple'>
      
      <h1>Welcome, {userInfo}</h1>
      
     
      {info ?  <div className='event_details'>Your Events
            {  
            info.map((inf)=>{
             
             return(
               <div className='event_hover' key = {info.id}>
                        <div className='event_header'>
                          <h1>{inf.EventName}</h1>                          
                           </div>
                          <h3>{inf.EventLocation}</h3>

                    <div className='btn_grp'>
                        <button className='details'>Details</button> 
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
    </div>
  )
}

export default UserHome
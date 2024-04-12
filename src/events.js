import React from 'react'
import { useEffect, useState } from 'react';
// import {  useNavigate} from 'react-router-dom';
import { supabase } from './supabaseClient';
import people from './Components/people.png'


const Events = () => {
    
    // const navigate = useNavigate()
    const[data, getData] = useState('')

useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await supabase.from('event').select('*')
            getData(response)
      } catch (error) {
      }
    }
    fetchData()
  }, [])

  var details = data.data
  
  if(details){
    return (<div className=''> 
            <p>Please <span> Login</span> or <span>Sign Up</span> for more Details</p>
            {details.map((info)=>{

                return(

                    <>


<div className='event_hover' key = {info}>
                              
                            <div className='descp'>

                        <div className='event_header'><h1>{info.EventName}</h1> </div>
                        
                        <div className='guestImg'>

                        <p className='eventInfo_head'>Event Info : </p>
                        <p className='descp_after'>{info.Event_descp}</p>
                          
                          
                          <img  className='peopleImg' src={people} alt='people' height="30px"></img>  : {info.Rsvp}   
                          <span className='span'>____</span> Spots Left : {info.GuestLimit - info.Rsvp_Id.length}
                          </div> 
                   


                    <div className='btn_grp_home'>
                          
                          <h3>Created By : {info.UserName}
                          </h3 >
                     </div>   
                       
                              </div>
                        </div>  
                        </>
                )
                
            })}
           </div> 
            )

}else return  (
        <div  className='event_details'>No Events
        </div>)
}
export default Events
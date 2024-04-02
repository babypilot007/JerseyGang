import React from 'react'
import { useEffect, useState } from 'react';
// import {  useNavigate} from 'react-router-dom';
import { supabase } from './supabaseClient';


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
                        
                        <p>Event Info : <br></br>{info.Event_descp}</p>
                   
                    <div className='btn_grp'>
                         <h3 className='rsvp'>Attending : {info.Rsvp} <br></br> Spots Left : {info.GuestLimit - info.Rsvp_Id.length} </h3>
                           <div>
                          
                          <h3>Created By : {info.UserName}
                          </h3 >
                          </div>
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
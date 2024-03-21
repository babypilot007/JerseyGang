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
            console.log(response.data)
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
                    <div className='event_hover' key = {info.id}>
                        <div className='event_header'><h1>{info.EventName}</h1> </div>
                        
                        <div className='descp'>
                        {/* <h3> Location : {info.EventLocation}</h3> */}
                        <p>Description :  <br></br><br></br>{info.Event_descp}</p>
                       </div>
                       

                    <div className='btn_grp'>
                        {/* <button className='details' onClick = {()=>{
                                    console.log(info.id)
                                    navigate('details',{state:info.id})
                        }}>Details</button>  */}
                        <h3 className='rsvp'>Attending : {info.Rsvp}</h3>

                        <div>
                          
                          <h3>Created By:<br />
                          {info.UserName}</h3 ></div>
                     </div>   
                        </div>
                )
                
            })}
           </div> 
            )

}else return  (
        <div  className='event_details'>No Events
        </div>)
}
export default Events
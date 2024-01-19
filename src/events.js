import React from 'react'
import { useEffect, useState } from 'react';
import {  useNavigate} from 'react-router-dom';
import { supabase } from './supabaseClient';


const Events = () => {
    
    
    const navigate = useNavigate()
    const[data, getData] = useState('')
    

useEffect(()=>{

    const fetchData = async ()=>{

      try {
        const response = await supabase.from('event').select('*')
            console.log(response.data)




      } catch (error) {

      }
    
    }

    fetchData()
  }, [])
  
            var details = data.data
  
  if(details){
   
    return ( 

            details.map((info)=>{

            

                return(
                    
                    <div className='event_hover'>

                        <div key = {info.id}>
                            
                        <div className='event_header'><h1>{info.attributes.EventName}</h1> <span>{info.attributes.EventHost}</span></div>
                        <p>{info.attributes.EventDescription}</p>
                        <p>{info.attributes.EventLocation}</p>


                    <div className='btn_grp'>

                        {/* <button className='delete' onClick = {()=>{
                             
                             window.location.reload(false)
                            
                                DeleteEvents(info.id)

                        }}>Delete</button>

                         <button className='edit' onClick = {()=>{
                             
                             window.location.reload(false)
                            
                                DeleteEvents(info.id)

                        }}>Edit</button> */}

<button className='details' onClick = {()=>{
                                    console.log(info.id)
                                    navigate('details',{state:info.id})

                        }}>Details</button>

                     </div>   
                            
                        </div>
                    
                    </div>
                )
            }))
            

}else return  (

        <div  className='event_details'>No Events
        </div>)
}
export default Events
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
            getData(response)
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
                    <div className='event_hover' key = {info.id}>
                        <div className='event_header'><h1>{info.EventName}</h1> </div>
                        <p>{info.EventLocation}</p>
                    <div className='btn_grp'>
                        <button className='details' onClick = {()=>{
                                    console.log(info.id)
                                    navigate('details',{state:info.id})
                        }}>Details</button> <div><h2><span>Created By:</span><br />{info.UserName}</h2></div>
                     </div>   
                        </div>
                )
            }))

}else return  (
        <div  className='event_details'>No Events
        </div>)
}
export default Events
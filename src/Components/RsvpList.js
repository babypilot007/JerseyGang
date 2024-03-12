import React from 'react'
import { supabase } from '../supabaseClient'
import { useState,useEffect } from 'react'

function RsvpList() {
    const[rsvpnames, getRsvpNames] = useState('')
    const[id, getId] = useState('')

    const fetchRsvp = async ()=>{
      
        try {
          
          const response = await supabase.from('event').select('*').eq('id')
          var data = response.data
          console.log(data)
      
        //   data.map((e)=> { return(
        //     <div><li><br>{getRsvpNames(e.Rsvp_names)
        //     }</br></li></div>
        //   )})
            data.map((e)=>{
            return getRsvpNames(e.Rsvp_names)

            })
      
        } catch (error) {
        }
      }
    //   fetchRsvp() 

 
      
  return (<div><button onClick={()=>{fetchRsvp()}}>List</button><p>{rsvpnames}</p></div>)
}

export default RsvpList
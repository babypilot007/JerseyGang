import React from 'react'
import { useEffect, useState } from 'react';


const Events = () => {

const[data, getData] = useState('')

useEffect(()=>{

    const fetchData = async ()=>{

      try {
        const response = await fetch('http://localhost:2000/api/jersey-gang-events?populate=*')
        const json = await response.json()

          getData(json)

          console.log(json.data)
        
      } catch (error) {

      }
    
    }

    fetchData()
  }, [])

  if(data){
  var email = data.data[0].attributes.UserEmail
  var eventDate = data.data[0].attributes.EventDate

  }
  
  if(data){
  return (
        <div className='event_hover'>

            <span> Email - {email}</span>
            <br></br><span> Event Date - {eventDate}</span>

       </div>
  )
}else return ( <div  className='event_details'>No Events</div>)
}
export default Events
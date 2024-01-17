import React from 'react'
import { useEffect, useState } from 'react';
import DeleteEvents from './DeleteEvents';


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


          

var details = data.data

    



    // data.map(()=>{})


  }
  
  if(data){
    return ( 
            details.map((info)=>{
                return(
                    <div className='event_hover'>
                        <div key = {info.id}>
                        Event Name -{info.attributes.EventName}
                        <br></br>Event Description - {info.attributes.EventDescription}
                       <br></br> Event Location- {info.attributes.EventLocation}

                        <button onClick = {()=>{
                            DeleteEvents(info.id)
                             window.location.reload(false)

                        }}>Delete Event</button>
                        </div>
                    </div>
                )
            }))

}else return  <div  className='event_details'>No Events</div>
}
export default Events
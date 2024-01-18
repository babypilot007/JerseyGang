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

        
      } catch (error) {

      }
    
    }

    fetchData()
  }, [])

  
  console.log()



  if(data){
            var details = data.data

            var len = details.length
         }


  
  if(len){

   
    return ( 

            details.map((info)=>{
                return(
                    
                    <div className='event_hover'>

                        <div key = {info.id}>
                        
                        <h1>{info.attributes.EventName}</h1>
                        <p>{info.attributes.EventLocation}</p>
                        <p>{info.attributes.EventDescription}</p>


                    <div className='btn_grp'>

                        <button className='delete' onClick = {()=>{
                             
                             window.location.reload(false)
                            
                                DeleteEvents(info.id)

                        }}>Delete</button>

                         <button className='edit' onClick = {()=>{
                             
                             window.location.reload(false)
                            
                                DeleteEvents(info.id)

                        }}>Edit</button>

                        <button className='details' onClick = {()=>{
                             window.location.reload(false)
                                DeleteEvents(info.id)
                        }}>Details</button>

                     </div>   
                        </div>
                    
                    </div>
                )
            }))

}else return  <div  className='event_details'>No Events</div>
}
export default Events
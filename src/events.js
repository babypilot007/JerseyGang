import React from 'react'
import { useEffect, useState } from 'react';
import {  useNavigate} from 'react-router-dom';



const Events = () => {
    
    
    const navigate = useNavigate()
    const[data, getData] = useState('')
    
   


useEffect(()=>{

    const fetchData = async ()=>{

      try {
        const response = await fetch('http://localhost:1337/api/jersey-gang-events?populate=*')
        const json = await response.json()

          getData(json)



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
                            
                        <h1>{info.attributes.EventName}</h1>
                        <p>{info.attributes.EventLocation}</p>
                        <p>{info.attributes.EventDescription}</p>
                        <p></p>
                        <p>{info.id}</p>


                    <div className='btn_grp'>

                        {/* <button className='delete' onClick = {()=>{
                             
                             window.location.reload(false)
                            
                                DeleteEvents(info.id)

                        }}>Delete</button>

                         <button className='edit' onClick = {()=>{
                             
                             window.location.reload(false)
                            
                                DeleteEvents(info.id)

                        }}>Edit</button> */}

                       

                     </div>   
                     <button className='details' onClick = {()=>{
                            console.log(info.id)
                            navigate('details',{state:info.id})

                        }}>Details  IdQS - {info.id}</button>
                        </div>
                    
                    </div>
                )
            }))
            

}else return  (

        <div  className='event_details'>No Events
        </div>)
}
export default Events
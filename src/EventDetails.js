import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const EventDetails = () => {

const navigate = useNavigate()


const location = useLocation()
var id = location.state

const [data, getData] = useState('')


        useEffect( () => { 

            async function fetchData() {
                try {

                    const response = await fetch('http://localhost:2000/api/jersey-gang-events/' + id)
                    const json =  await response.json()

                    getData(json)


                    
                } catch (err) {
                    console.log(err);
                }
                
            }

            fetchData();

        }, [id]);



        var details = data.data

console.log(details)
        
        if(details){


        var more = details.attributes


            
            return (
               <div className='event_hover'>

                        {/* { more.map(()=>{})  } */}


                        <h1>{more.EventName}</h1>
                        <p> {more.EventDescription}</p>
                        <p>{more.EventLocation}</p>




                        </div>
            )
                
    
    }else return  <div  className='event_details'>Redirecting ...
                {navigate("/")}
    </div>
    
}

export default EventDetails
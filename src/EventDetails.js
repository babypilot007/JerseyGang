import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from './supabaseClient';

function EventDetails (id) {

const navigate = useNavigate()

const location = useLocation()

console.log(location)
const [data, getData] = useState('')


        useEffect( () => { 

            async function fetchData() {
                try {

                    const response = await supabase.from('event').select('*').eq('id',id)

                    getData(response)

                    if(response){
                    console.log(response.data)}
                } catch (err) {
                    console.log(err);
                }
                
            }

            fetchData();

        }, [id]);

        var details = data.data



        
        if(details){
        console.log(details);

            
            return (
               <div className='event_hover'>

                        { details.map((info)=>{

                        return(
                                     <div className='evnt_details'>

                                        <h1>Event Details</h1>

                                        <h2>{info.EventName}</h2>

                                        <p>Location : {info.EventLocation}</p>
                                        <p>Date : {info.EventDate}</p>
                                        <p>Time : {info.EventTime}</p>


                                        <p>Event Created by : {info.UserName}</p>

                                        <div>
                                            <h3>Event Decription</h3>
                                          <p>{info.Event_descp}</p>
                                        </div>

                                    </div>
                        )
                        })  }

                      

                </div>
            )
    
    }else return  <div  className='event_details'>Redirecting ...
                {navigate("")}
    </div>
    
}

export default EventDetails
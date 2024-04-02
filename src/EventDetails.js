import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from './supabaseClient';

function EventDetails () {

const navigate = useNavigate()
const params = useParams()
const [data, getData] = useState('')


        useEffect( () => { 

            async function fetchData() {
                try {

                    const response = await supabase.from('event').select('*').eq('id',params.id)

                    getData(response)

                    if(response){
                    console.log(response.data)}
                } catch (err) {
                    console.log(err);
                }
                
            }

            fetchData();

        }, [params]);

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
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
    return (<div className=''> 
            {details.map((info)=>{

                return(

                    <>


<div className='event_hover' key = {info}>
                              
                            <div className='descp'>

                        <div className='event_header'><h1>{info.EventName}</h1> </div>
                        
                        <p>Event Info : <br></br>{info.Event_descp}</p>
                   
                    <div className='btn_grp'>
                         <h3 className='rsvp'>Attending : {info.Rsvp} <br></br> Spots Left : {info.GuestLimit - info.Rsvp_Id.length} </h3>
                           <div>
                          
                          <h3>Created By : {info.UserName}
                          </h3 >
                          </div>
                     </div>   
                       
                              </div>
                      <p className='event_hover_p'>Please <span><button onClick={()=>{navigate('/auth')}} >Login</button></span> or <span><button onClick={()=>{navigate('/signup')}}>SignUp</button></span> for more Details</p>

                        </div>  
                        </>
                )
                
            })}
           </div> 
            )

}else return  (
        <div  className='event_details'>No Events
        </div>)


    
}

export default EventDetails
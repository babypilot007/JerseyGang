import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from './supabaseClient';
import people from './Components/people.png'


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
                    }
                } catch (err) {
                }
                
            }

            fetchData();

        }, [params]);

        var details = data.data



                if(details){
    return (<div className='event_hover'> 
            {details.map((info)=>{

                return(

                    <>

                    


<div className='' key = {info}>
                              
                            <div className='descp'>

                        <div className='event_header'>
                            <h1>{info.EventName}</h1> </div>
                        
                            <div className='guestImg_dets'>

<p className='eventInfo_head'>Event Info : </p>
<p className='descp_after'>{info.Event_descp}</p>
  
  <div className='detsImg'>
  <img  className='peopleImg' src={people} alt='people' height="30px"></img>  : {info.Rsvp}   
  <span className='span'>____</span> Spots Left : {info.GuestLimit - info.Rsvp_Id.length}
  </div>
  </div> 

                    <div className='btn_grp_home'>
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
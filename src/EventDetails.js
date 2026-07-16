import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from './supabaseClient';
import { BackNav, PageFrame } from './components/ui/AppShell';
import { PublicEventCard } from './components/ui/EventCard';


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
    return (<PageFrame>
      <BackNav title="Explore events" />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            {details.map((info)=>{

                return(

                    <div key={info.id} className="space-y-6">
                      <PublicEventCard event={info} />
                      <div className="rounded-[2rem] bg-white/85 p-6 text-center shadow-card">
                        <p className="text-sm font-bold text-masala">Please login or sign up for maps, host contact, and RSVP.</p>
                        <div className="mt-4 flex justify-center gap-3">
                          <button className="rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white" onClick={()=>{navigate('/auth')}} >Login</button>
                          <button className="rounded-full bg-rangoli px-5 py-3 text-sm font-extrabold text-white" onClick={()=>{navigate('/signup')}}>Sign up</button>
                        </div>
                      </div>
                    </div>
                )
                
            })}
      </section>
           </PageFrame> 
            )

}else return  (
        <PageFrame><BackNav title="Explore events" /><div className="mx-auto max-w-4xl px-4 py-12"><div className="rounded-[2rem] bg-white/85 p-8 text-center font-bold text-masala shadow-card">No Events</div></div></PageFrame>)


    
}

export default EventDetails

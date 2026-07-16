import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { supabase } from './supabaseClient';
import { PublicEventCard } from './Components/ui/EventCard';


const Events = () => {
    
    const navigate = useNavigate()
    const[data, getData] = useState([])
    const[loading, setLoading] = useState(true)

useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await supabase.from('event').select('*')
            getData(response.data || [])
      } catch (error) {
        getData([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if(loading){
    return <div className="rounded-[2rem] bg-white/80 p-8 text-center font-bold text-masala shadow-card">Loading experiences...</div>
  }

  if(data.length){
    return (
      <div>
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-rangoli">Open experiences</p>
            <h2 className="font-display text-3xl font-extrabold text-ink">Explore what is coming up</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-masala">
            Login or sign up to see maps, contact hosts, create events, and RSVP.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((info)=><PublicEventCard key={info.id} event={info} onDetails={(id)=>navigate(`/eventdetails/${id}`)} />)}
        </div>
      </div>
    )

}else return  (
        <div className="rounded-[2rem] bg-white/80 p-8 text-center font-bold text-masala shadow-card">No events yet. Be the first host to start the weekend.</div>)
}
export default Events

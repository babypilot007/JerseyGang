import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useEffect, useState} from 'react'
import { supabase } from '../supabaseClient';
import { ExperienceCard } from './ui/EventCard';

function Rsvp({ userId: providedUserId } = {}) {
  const navigate = useNavigate()
  const[data, getData] = useState([])
  const[userId, getUserId] = useState(providedUserId || '')
  const[userfirstNames, getUserfirstNames] = useState('')
  const[userlastNames, getUserLastNames] = useState('')
  const[attend, showAttend] = useState(false)
  const[pressBtn, setPressBtn] = useState(0)
  const[infoId, getInfoId] = useState('')
  const[reportype, setReporType] = useState('Inappropriate Content')
  const[reportOpenId, setReportOpenId] = useState(null)
  const[detailsOpenId, setDetailsOpenId] = useState(null)
  const[loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        if(user === null){
          navigate('/auth')
        }else{
          getUserId(providedUserId || user.id)
          getUserfirstNames(user.user_metadata.firstName || '')
          getUserLastNames(user.user_metadata.lastName || '')
        }
      } catch (error) {
        navigate('/auth')
      }
    }
    fetchData()
  }, [navigate, providedUserId])

  useEffect(()=>{  
    const fetchData = async ()=>{
      try {
        const response = await supabase.from('event').select('*').order('id', { ascending: false })
        getData(response.data || [])
      } catch (error) {
        getData([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  },[pressBtn])

  const setRsvp = async (event)=>{
    try {
      const getRsvpCount = await supabase.from('event').select('Rsvp').eq('id',event)
      const getRsvpUsers = await supabase.from('event').select('Rsvp_names').eq('id',event)
      const getRsvpId = await supabase.from('event').select('Rsvp_Id').eq('id',event)

      const map_rsvp_users = getRsvpUsers.data[0].Rsvp_names || []
      const map_rsvp_id = getRsvpId.data[0].Rsvp_Id || []
      const count = getRsvpCount.data[0].Rsvp + 1
      await supabase.from('event').update({Rsvp : count}).eq('id',event)
      await supabase.from('event').update({Rsvp_names : [...map_rsvp_users,{"id":userId,"firstName":userfirstNames, "lastName":userlastNames}]}).eq('id',event)
      await supabase.from('event').update({Rsvp_Id : [...map_rsvp_id,userId]}).eq('id',event)
      setPressBtn((value)=>value + 1)
    } catch (error) {}
  }

  const unRsvp = async(event)=>{
    try {
      const getRsvpUsers = await supabase.from('event').select("Rsvp_names").eq('id',event)
      const oldArray = getRsvpUsers.data[0].Rsvp_names || []
      const newArray = oldArray.filter((itm)=> itm.id !== userId)
      const deleteRsvpId = await supabase.from('event').select("Rsvp_Id").eq('id',event)
      const oldRsvpIdArray = deleteRsvpId.data[0].Rsvp_Id || []
      const newRsvpIdArray = oldRsvpIdArray.filter((item)=> item !== userId)
      await supabase.from('event').update({Rsvp_Id : newRsvpIdArray}).eq('id',event)
      await supabase.from('event').update({Rsvp_names : newArray}).eq('id',event)
      const getRsvpCount = await supabase.from('event').select('Rsvp').eq('id',event)
      let count = getRsvpCount.data[0].Rsvp - 1
      await supabase.from('event').update({Rsvp : (count)}).eq('id',event)
      setPressBtn((value)=>value + 1)
    } catch (error) {}
  } 

  const fetchRsvp = async (id)=>{
    try {
      const response = await supabase.from('event').select('*').eq('id',id)
      const data = response.data || []
      data.map((e)=> getInfoId(e.id))
    } catch (error) {}
  }

  const report = async (id)=>{
    try {
      const rep = await supabase.from('event').select('report').eq('id',id)
      const reptype = await supabase.from('event').select('reportType').eq('id',id)
      const reptypeold = reptype.data[0].reportType || []
      const repCount = (rep.data[0].report || 0) + 1
      await supabase.from('event').update({report : repCount}).eq('id',id)
      await supabase.from('event').update({reportType : [...reptypeold, reportype]}).eq('id',id)
      setReportOpenId(null)
    } catch (error) {}
  }

  if(loading){
    return <div className="col-span-full rounded-[2rem] bg-white/85 p-8 text-center font-bold text-masala shadow-card">Loading events...</div>
  }

  const visibleEvents = data.filter((info)=>info.UserId !== userId)

  if(visibleEvents.length >= 1){
    return visibleEvents.map((info)=>(
      <ExperienceCard
        key={info.id}
        event={info}
        currentUserId={userId}
        guestListOpen={attend && info.id === infoId}
        detailsOpen={detailsOpenId === info.id}
        reportOpen={reportOpenId === info.id}
        reportType={reportype}
        onReportType={setReporType}
        onGuestList={()=>{showAttend(!attend);fetchRsvp(info.id)}}
        onDetails={()=>{fetchRsvp(info.id);setDetailsOpenId(detailsOpenId === info.id ? null : info.id)}}
        onReport={()=>{setReportOpenId(info.id);fetchRsvp(info.id)}}
        onSubmitReport={()=>report(info.id)}
        onCancelReport={()=>setReportOpenId(null)}
        onRsvp={()=>{setRsvp(info.id);fetchRsvp(info.id)}}
        onCancelRsvp={()=>{unRsvp(info.id);fetchRsvp(info.id)}}
      />
    ))
  }

  return <div className="col-span-full rounded-[2rem] bg-white/85 p-8 text-center font-bold text-masala shadow-card">No events nearby.</div>
}

export default Rsvp

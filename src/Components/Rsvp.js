import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useEffect} from 'react'
import { supabase } from '../supabaseClient';



function Rsvp() {

  const navigate = useNavigate()


  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        
        const {data: {user},} = await supabase.auth.getUser()
        
            console.log(user)
           
          if(user === null){
            navigate ('/auth')
          }else{
            navigate('/userhome')
          }

    
      } catch (error) {
      }
    }
    fetchData()
  }, [navigate])

  return (
    <div></div>
  )
}

export default Rsvp
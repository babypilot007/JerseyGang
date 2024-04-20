import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import { supabase } from '../supabaseClient'



const Profile = () => {

  const navigate = useNavigate()

  const[userName, setusername] = useState('')


  useEffect(()=>{

    const loggedIn = async ()=>{
    try {
      const {data: {user},} = await supabase.auth.getUser()
      
        console.log(user)
        if(user === null){
          
          navigate('/auth')
      window.location.reload();

        }else{

          setusername(user.user_metadata.firstName)
        }
      
    } catch (error) {
      if(error){
      }
    }

 
  }
  
  loggedIn()


}, [navigate])
    
  return (
    <div className='simple'>
      <h3>Profile</h3>

      <form>
        Name <input
        placeholder={userName}
        />
      </form>
      </div>
  )
}

export default Profile
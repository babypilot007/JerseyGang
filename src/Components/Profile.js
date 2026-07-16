import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import { supabase } from '../supabaseClient'
import { BackNav, PageFrame } from './ui/AppShell';
import { FormCard, inputClass } from './ui/FormCard';

const Profile = () => {
  const navigate = useNavigate()
  const[userName, setusername] = useState('')
  const[lastName, setLastName] = useState('')
  const[email, setEmail] = useState('')

  useEffect(()=>{
    const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        if(user === null){
          navigate('/auth')
        }else{
          setusername(user.user_metadata.firstName || '')
          setLastName(user.user_metadata.lastName || '')
          setEmail(user.email || '')
        }
      } catch (error) {}
    }
    loggedIn()
  }, [navigate])
    
  return (
    <PageFrame>
      <BackNav title="Dashboard" />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <FormCard eyebrow="Profile" title="Your community card.">
          <form className="space-y-4">
            <input className={inputClass} placeholder="First name" value={userName} readOnly />
            <input className={inputClass} placeholder="Last name" value={lastName} readOnly />
            <input className={inputClass} placeholder="Email" value={email} readOnly />
          </form>
        </FormCard>
      </section>
    </PageFrame>
  )
}

export default Profile

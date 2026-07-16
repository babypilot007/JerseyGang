import { supabase } from "./supabaseClient"
import { useNavigate} from 'react-router-dom';

import React from 'react'
import {useState} from 'react'
import { BackNav, PageFrame } from "./Components/ui/AppShell";
import { buttonClass, FormCard, inputClass } from "./Components/ui/FormCard";


export default function Auth(){

const navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const [getEmail, setEmail] = useState('')
  const [getPassword, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)

  const [createAcc, setCreateAcc] = useState(false)



  const [loginStat, setLoginStat] = useState(false)



  const handleLogin = async (event) => {
    event.preventDefault()


    const {error } = await supabase.auth.signInWithPassword({
      email: getEmail,
      password: getPassword
      
    })
    
    if (error) {
      
      setLoading(false)
      setLoginError(true)
      setCreateAcc(true)
      setEmail("")
      setPassword("")

    } else {
    setLoading(true)
      navigate('/userhome')
    }

  



    setLoading(false)
    setLoginStat(true)


    if(loginStat)
    {
    navigate('/userhome')
    }

  }

  return (
    <PageFrame>
      <BackNav title="Home" />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <FormCard
          eyebrow="Welcome back"
          title="Log in to your next desi plan."
          footer={
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-gulab/30 px-4 py-2 text-sm font-bold text-ink" onClick={()=>{navigate('/signup')}}>Create account</button>
              <button className="rounded-full bg-pista/40 px-4 py-2 text-sm font-bold text-ink" onClick={()=>{navigate('/updatepass')}}>Forgot password</button>
            </div>
          }
        >
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              className={inputClass}
              type="email"
              placeholder="Your email"
              value={getEmail}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={inputClass}
              type="password"
              placeholder="Password"
              value={getPassword}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={buttonClass} disabled={loading} >
              {loading ? 'Loading...' : 'Log me in'}
            </button>
          </form>
          {loginError?<div className="mt-5 rounded-2xl bg-rangoli/10 p-4 text-sm font-bold text-rangoli"><p>User not found. Please try again or create an account.</p></div>:null}
          {createAcc ? null : null}
        </FormCard>
      </section>
    </PageFrame>
  )

}

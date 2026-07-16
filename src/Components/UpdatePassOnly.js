import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { BackNav, PageFrame } from './ui/AppShell'
import { buttonClass, FormCard, inputClass } from './ui/FormCard'

function UpdatePassOnly() {
  const [passwordReset, setPassword]  = useState('')  
  const [status , setStatus]  = useState('idle')   
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = await supabase.auth.updateUser({ password: passwordReset })
    if(data.error !== null){
      setStatus('error')
    }
    else{
      setStatus('success')
    }
  }

  return (
    <PageFrame>
      <BackNav title="Login" />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <FormCard eyebrow="Password reset" title="Choose a new password.">
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              className={inputClass}
              type="password"
              placeholder="Password"
              value={passwordReset}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={buttonClass}>Update password</button>
          </form>

          {status === 'success' ? (
            <div className="mt-5 rounded-3xl bg-pista/40 p-5">
              <h3 className="font-display text-2xl font-extrabold text-ink">Password reset successful</h3>
              <button className="mt-4 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white" onClick={()=>{navigate('/auth')}}>Login</button>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="mt-5 rounded-3xl bg-rangoli/10 p-5 text-sm font-bold text-rangoli">
              Something went wrong. Please request a new reset link.
            </div>
          ) : null}
        </FormCard>
      </section>
    </PageFrame>
  )
}

export default UpdatePassOnly

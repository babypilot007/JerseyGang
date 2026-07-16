import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { BackNav, PageFrame } from './ui/AppShell'
import { buttonClass, FormCard, inputClass } from './ui/FormCard'

function PassUpdate() {
  const [email, setEmail]  = useState('') 
  const [sent, setSent]  = useState(false) 

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://desigangjc.com/updatepassonly',
    })
    if(res.data !== null){
      setSent(true)
    }
  }

  return (
    <PageFrame>
      <BackNav title="Login" />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <FormCard eyebrow="Password help" title="Get a fresh login link.">
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              className={inputClass}
              type="email"
              placeholder="Email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={buttonClass}>Send reset link</button>
          </form>
          {sent ? (
            <div className="mt-5 rounded-3xl bg-pista/40 p-5 text-sm font-bold text-masala">
              Please check your email for the password reset link.
            </div>
          ) : null}
        </FormCard>
      </section>
    </PageFrame>
  )
}

export default PassUpdate

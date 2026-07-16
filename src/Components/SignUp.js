import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { BackNav, PageFrame } from './ui/AppShell'
import { buttonClass, FormCard, inputClass } from './ui/FormCard'


export default function SignUp() {

const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [getEmail, setEmail] = useState('')
  const [getPassword, setPassword] = useState('')
  const [getFirstName, setFirstName] = useState('')
  const [getLastName, setLastName] = useState('')
  // const [getphone, setphone] = useState('')

  const [signedUp, setSignedUp] = useState(false)






  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)

    const {error } = await supabase.auth.signUp(
      
      { 
        email: getEmail,
        password:getPassword,

        options: {
          data: {
           firstName: getFirstName,
            lastName: getLastName,
            myConnections : [['']]
          }
        }
      }
        )

   


    if (error) {
      alert(error.error_description || error.message)
    } else {
      setEmail("")
      setFirstName("")
      setLastName("")
      setPassword("")
      setSignedUp(true)
      // setphone("")
      

    }
    setLoading(false)

  }




  return (
<PageFrame>
      <BackNav title="Home" />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <FormCard eyebrow="Join the circle" title="Create your Desi Gang account.">
          {signedUp? <div className='mb-5 rounded-3xl bg-pista/40 p-5'>
          <h3 className="font-display text-2xl font-extrabold text-ink">Sign up successful!</h3>
          <p className="mt-2 text-sm font-semibold text-masala">Please check your email to confirm.</p>
          <button className="mt-4 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white" onClick={()=>{navigate('/auth')}}>Login</button>
        </div>:null}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
              className={inputClass}
              type="firstname"
              placeholder="First Name"
              value={getFirstName}
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
        <input
              className={inputClass}
              type="lastname"
              placeholder="Last Name"
              value={getLastName}
              required={true}
              onChange={(e) => setLastName(e.target.value)}
            />
        {/* <input
              className="inputField"
              type="Phone"
              placeholder="phone"
              value={getphone}
              required={true}
              onChange={(e) => setphone(e.target.value)}
            />
        <br></br> */}

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
         
            <button className={buttonClass} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sign me Up</span>}
            </button>

          
        </form>
        </FormCard>
      </section>
      </PageFrame>
  )
}

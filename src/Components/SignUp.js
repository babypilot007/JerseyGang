import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'


export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const {error } = await supabase.auth.signUp({ 
        email: 'skypirateee@gmail.com',
        password:'Qazsedc@007' })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <>
     

     <div className='signuphead'>


     <div className='header'>
                        <h1>Sign Up</h1>
      </div>

        <form className="signupform" onSubmit={handleLogin}>

           <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
         
          <br></br>

          <input
              className="inputField"
              type="password"
              placeholder="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
  <br></br>
  <br></br>

  
         
            <button className='form_btn' disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sign me Up</span>}
            </button>

          
        </form>
     
     
     </div>

        
     
    </>
  )
}
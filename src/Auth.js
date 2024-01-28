import { supabase } from "./supabaseClient"
import React from 'react'
import {useState} from 'react'


export default function Auth(){

  const [loading, setLoading] = useState(false)
  const [getEmail, setEmail] = useState('')
  const [getPassword, setPassword] = useState('')



  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'skypirateee@gmail.com',
      password: 'Qazsedc@007'
    })
    

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Log in successfull!')
    }
    setLoading(false)

    console.log(data)

  }

  return (
    <>
     

     <div className='signuphead'>


     <div className='header'>
                        <h1>Login</h1>
      </div>

        <form className="signupform" onSubmit={handleLogin}>

           <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={getEmail}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
         
          <br></br>

          <input
              className="inputField"
              type="password"
              placeholder="password"
              value={getPassword}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
  <br></br>
  <br></br>

  
         
            <button className='form_btn' disabled={loading}>
              {loading ? <span>Loading</span> : <span>Log me in</span>}
            </button>

          
        </form>
     
     
     </div>

        
     
    </>
  )

}
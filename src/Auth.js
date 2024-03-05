import { supabase } from "./supabaseClient"
import { useNavigate} from 'react-router-dom';
import Navbar from "./Components/Navbar";

import React from 'react'
import {useState} from 'react'


export default function Auth(){

const navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const [getEmail, setEmail] = useState('')
  const [getPassword, setPassword] = useState('')

  const [loginStat, setLoginStat] = useState(false)



  const handleLogin = async (event) => {
    event.preventDefault()


    const { data, error } = await supabase.auth.signInWithPassword({
      email: getEmail,
      password: getPassword
      
    })


    
    
    if (error) {
      
      setLoading(false)


    } else {
    setLoading(true)
      navigate('/userhome')
    }

  


    console.log(data)

    setLoading(false)
    setLoginStat(true)


    if(loginStat)
    {
    navigate('/userhome')
    }

  }

  return (
    <>
     

     <div className='signuphead'>

     <Navbar />

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

  
         
            <button className='form_btn' disabled={loading} >
              {loading ? <span>Loading</span> : <span>Log me in</span>}
            </button>

          
        </form>
     
     
     </div>

        
     
    </>
  )

}
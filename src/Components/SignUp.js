import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'


export default function SignUp() {

const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [getEmail, setEmail] = useState('')
  const [getPassword, setPassword] = useState('')
  const [getFirstName, setFirstName] = useState('')
  const [getLastName, setLastName] = useState('')
  const [getphone, setphone] = useState('')






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
            // phone : 7892,
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
      setphone("")
      alert('Check your email for the login link!')

      navigate('/auth')

    }
    setLoading(false)

  }

  function goHome(){

    navigate('/')
  }




  return (
<>
      
       <div className='nav'>
        
        <button onClick={goHome}><p>Home</p></button>
</div>
     <div className='signuphead'>


     <div className='header'>
                        <h1>Sign Up</h1>
      </div>
      
      <div className='formDiv'>
        <form className="signupform" onSubmit={handleLogin}>

          <input
              className="inputField"
              type="firstname"
              placeholder="First Name"
              value={getFirstName}
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
        <br></br>
        <input
              className="inputField"
              type="lastname"
              placeholder="Last Name"
              value={getLastName}
              required={true}
              onChange={(e) => setLastName(e.target.value)}
            />
        <br></br>
        <input
              className="inputField"
              type="Phone"
              placeholder="phone"
              value={getphone}
              required={true}
              onChange={(e) => setphone(e.target.value)}
            />
        <br></br>

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
              {loading ? <span>Loading</span> : <span>Sign me Up</span>}
            </button>

          
        </form>
        </div>
     </div>

     <div className='disclaimer'>
      <p>We will <span>NEVER</span> sell your personal information to any 3rd party organisation... </p>
      <h3>We Promise</h3></div>
    </>
  )
}
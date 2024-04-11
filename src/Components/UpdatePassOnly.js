import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function UpdatePassOnly() {

const [passwordReset, setPassword]  = useState('')   

const navigate = useNavigate()


    const handleLogin = async (event) => {

    
        const {error } = await supabase.auth.updateUser(
          
          { 
            password: passwordReset
          }
            )

            if (error) {
                alert(error.error_description || error.message)
              } else {
                setPassword("")
                alert('Check your email for the login link!')
          
                navigate('/auth')
          
              }
    
    
      }
  return (
   <>

<div className="formDivAuth">

   
   <form className="signupform_auth" onSubmit={handleLogin}>


  <input
      className="inputField"
      type="password"
      placeholder="password"
      value={passwordReset}
      required={true}
      onChange={(e) => setPassword(e.target.value)}
    />
<br></br>
<br></br>


  <div>
 <button className='form_btn'  >Update Password</button></div>
   

  
</form>
</div>
</>
  )
}

export default UpdatePassOnly
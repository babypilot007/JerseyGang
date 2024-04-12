import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function UpdatePassOnly() {

const [passwordReset, setPassword]  = useState('')   

const navigate = useNavigate()


    const handleLogin = async () => {

    
        const {error } = await supabase.auth.updateUser(
          
          { 
            password: passwordReset
          }
            )

            if (error) {
              } else {
                setPassword("")
                alert('Password Reset')
          
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
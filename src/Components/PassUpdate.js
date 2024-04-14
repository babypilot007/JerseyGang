import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'

function PassUpdate() {


const [email, setEmail]  = useState('') 
const [showemaildiv, setShowEmail]  = useState('closedDiv') 






    const handleLogin = async (e) => {

      e.preventDefault()
       const res =  await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'https://desigangjc.com/updatepassonly',
        })
        
          if(res.data !== null){
        setShowEmail('openDiv')
          }
      }

      

  return (
    <>
        <div className="formDivAuth">

    
<form className="signupform_auth" onSubmit={handleLogin}>


<input
      className="inputField"
      type="text"
      placeholder="Email"
      value={email}
      required={true}
      onChange={(e) => setEmail(e.target.value)}
    />
<br></br>
<br></br>


  <div>
 <button className='form_btn' onClick={handleLogin}>Send Reset Link</button></div>
   
</form>







</div>
 <div className={showemaildiv}>
  <h3>Please check you Email for Password Reset link.</h3>
</div>

 </>
  )
}

export default PassUpdate
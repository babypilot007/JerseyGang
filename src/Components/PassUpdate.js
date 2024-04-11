import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'

function PassUpdate() {


const [email, setEmail]  = useState('') 





    const handleLogin = async () => {


        await supabase.auth.resetPasswordForEmail({email}, {
          redirectTo: 'http://localhost:3000/UpdatePassOnly',
        })
       
    
      }


  return (
    <div>
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
 <button className='form_btn'  >Send Reset Link</button></div>
   

  
</form>







</div>


 </div>
  )
}

export default PassUpdate
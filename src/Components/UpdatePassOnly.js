import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function UpdatePassOnly() {

const [passwordReset, setPassword]  = useState('')  
const [resetSucces , setResetSucces]  = useState('noPass')   



const navigate = useNavigate()


    const handleLogin = async (e) => {

    e.preventDefault()

        const data = await supabase.auth.updateUser(
          
          { 
            password: passwordReset
          }
            )

            console.log(data.error)
              if(data.error !== null){
                  setResetSucces('errorPass')
              }
              else{
                setResetSucces('yesPass')
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

<div className={resetSucces}>
  <h3>Password reset successful</h3>
  <span>Something Went wrong</span>
  <button onClick={()=>{navigate('/auth')}}>Login?</button>

</div>
</>
  )
}

export default UpdatePassOnly
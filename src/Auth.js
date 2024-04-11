import { supabase } from "./supabaseClient"
import { useNavigate} from 'react-router-dom';

import React from 'react'
import {useState} from 'react'


export default function Auth(){

const navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const [getEmail, setEmail] = useState('')
  const [getPassword, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)

  const [createAcc, setCreateAcc] = useState(false)



  const [loginStat, setLoginStat] = useState(false)



  const handleLogin = async (event) => {
    event.preventDefault()


    const { data, error } = await supabase.auth.signInWithPassword({
      email: getEmail,
      password: getPassword
      
    })
    
    if (error) {
      
      setLoading(false)
      setLoginError(true)
      setCreateAcc(true)
      setEmail("")
      setPassword("")

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

  function goHome(){

    navigate('/')
  }

  return (
    <>

    
<div className='nav'>
     <div className="navButton">
        <button className="log" onClick={goHome}>Home</button>
            </div>
                        <h3>Login</h3>
    </div>
     
     
     <div className="formDivAuth">

    
        <form className="signupform_auth" onSubmit={handleLogin}>

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

  
         {loading ? <div>
          <button >Loading</button>
         </div> : <div>
         <button className='form_btn' disabled={loading} >Log Me In</button></div>}
           

          
        </form>




        
     

     </div>

     {loginError?<div className="failedLogin"><p>User not found. Please try again or Create an Account</p></div>:null}

          <div className="createAct"  >        
            {createAcc?<>
              
              <button  onClick={()=>{navigate('/signup')}}>Create Account</button>
              </>:null}
              <button onClick={()=>{navigate('/updatepass')}}>Forgot Password</button>

         </div>
     
    </>
  )

}
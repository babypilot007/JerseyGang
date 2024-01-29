
import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'



const UserHome = () => {

  const[getId, setId] = useState('')


    useEffect(()=>{

      const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        
             setId([user.id])
          console.log(user)
      } catch (error) {
      }

      

   
      
    }
    loggedIn()

  }, [])

  const createEvent = async () =>{

    try {
      const {data: {user},} = await supabase.from('event').insert([
        {
          UserName : 'getId'
        }
      ])
      
        console.log(user)
    } catch (error) {
    }

  }



  
  
    return (
    <div>

      <h1>Welcome, {getId}</h1>
 {/* <form className="signupform" onSubmit={handleLogin}>

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






</form> */}

<button className='form_btn' onClick={createEvent}>
<span>Sign me Up</span>
  </button>
     
    </div>
  )
}

export default UserHome
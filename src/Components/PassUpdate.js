import { useState } from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function PassUpdate() {

    // const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    //     redirectTo: 'https://example.com/update-password',
    
    //   })

const [password, getPassword]  = useState('') 
const [passwordReset, setPassword]  = useState('')   

console.log(password,passwordReset)
const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
    
        const {error } = await supabase.auth.updateUser(
          
          { 
            password:getPassword
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

      handleLogin()

  return (
    <div>
        <h3>Enter Email to reset your password</h3>
    </div>
  )
}

export default PassUpdate
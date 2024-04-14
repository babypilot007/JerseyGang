import React from 'react'
import { useNavigate } from 'react-router-dom'


function ConfirmUrl() {
const navigate = useNavigate()

  return (
    <div className='confirm'>
        
       <h2>Thank you for your confirmation.</h2>
       <h3>You can now Login to your Account and start exploring...</h3>
       <button onClick={()=>{navigate('/auth')}}>Let's Log in</button>
    
       <p>The Desi way of Meet Ups</p>
       </div>
  )
}

export default ConfirmUrl
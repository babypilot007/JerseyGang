import React from 'react'
import { useState } from 'react';


export const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

  return (
    <div className='header'>
                        <h1>Sign up</h1>

            <p className='forms'>Name -  <input onChange={(e)=>{setName(e.target.value)}}></input></p>
            <p className='forms'>Email -  <input onChange={(e)=>{setEmail(e.target.value)}}></input></p>

            
            <button onClick={()=>{
console.log(name)
console.log(email)

            }}>Sign up</button>
                </div>
  )
}

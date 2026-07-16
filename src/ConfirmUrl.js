import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageFrame } from './components/ui/AppShell'


function ConfirmUrl() {
const navigate = useNavigate()

  return (
    <PageFrame>
    <div className='mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center'>
        
       <h2 className="font-display text-5xl font-extrabold text-ink">Thank you for confirming.</h2>
       <h3 className="mt-4 text-lg font-semibold text-masala">You can now login and start exploring.</h3>
       <button className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-extrabold text-white shadow-card" onClick={()=>{navigate('/auth')}}>Let's log in</button>
    
       <p className="mt-8 text-sm font-bold uppercase tracking-wide text-rangoli">The Desi way of meetups</p>
       </div>
       </PageFrame>
  )
}

export default ConfirmUrl

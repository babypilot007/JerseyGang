import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


function Navbar() {
  const navigate = useNavigate()

  useEffect(()=>{
      
  },[])

  return (
    <div className='nav'>
          <p>Desi Jersey Gang</p>
          <div className='navButton'>
                        <button className="log" onClick={()=>{navigate('/auth')}}>Login</button>
                        <button className="reg" onClick={()=>{navigate('/signup')}}>Sign up</button>
           </div>
    </div>
  )
}

export default Navbar
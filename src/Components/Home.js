import React from 'react'
import Events from '../events';
import Navbar from './Navbar';



const Home = () => {
var eventInfo = Events()

  return (
<>
<Navbar/>

          <div className='event_details'>{eventInfo}</div> 
          
        </>
  )
}

export default Home
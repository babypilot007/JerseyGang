import React from 'react'
import Events from '../events';
import Navbar from './Navbar';



const Home = () => {
var eventInfo = Events()



  return (
<>
<Navbar/>
<div className='App'>

          <div className='event_backdrop'>{eventInfo}</div> 
          
          </div>
        </>
  )
}

export default Home
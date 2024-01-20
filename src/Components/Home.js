import React from 'react'
import { useNavigate} from 'react-router-dom';
import Events from '../events';



const Home = () => {
var eventInfo = Events()

const navigate = useNavigate()


  return (
    <div>
    <div>
        
    


                <header className="App-header">

                        <div>
                        <button className="log" onClick={()=>{navigate('auth')}}>Login</button>
                        <button className="reg" onClick={()=>{navigate('signup')}}>Sign up</button>
                       
                        </div>
                
                </header> 

                <div className='header'>
                        <h1>Jersey City Gang</h1>
                </div>

          <div className='event_backdrop'>{eventInfo}</div> 

                
        </div>
        </div>
  )
}

export default Home
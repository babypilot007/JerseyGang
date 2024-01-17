import './App.css';
// import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Events from './events';

function App() {

const [event, setEvent] = useState(false)
const [eventBtn, setEventBtn] = useState(true)
const [header, setHeader] = useState(true)
const [homeBtn, setHomeBtn] = useState(true)

var eventInfo = Events()

   

   
 

  return (


    <div className="App">

        {homeBtn ? 
        <div>

                <header className="App-header">

                        {header ? <div>
                        <button className="log">Login</button>
                        <button className="reg">Sign up</button>
                        </div> :null}
                
                </header> 
                
        </div> :null}


      
      <h1>Jersey City Gang</h1>


          { eventInfo ? <h2>{eventInfo}</h2> : null}
        
      
      <div >
        
        {eventBtn ? <div className = 'event'> 

        <button type="submit" onClick ={()=>{setEvent(true); setEventBtn(false);setHeader(false);setHomeBtn(false) }} >
          <h2>Create Event</h2></button>

          
         </div>: null }

         {<div>  {event ? <div className = 'event_create'>{}</div>:null}</div> 
}

         

      </div>


      {event ?   <div className='event'>
          <div className='event_create'>


        <div className='forms'> 
        <form>
        <div className='titles'> <h3> Event Name <span><input name="query" /></span></h3></div>
        <div className='titles'> <h3> Event Type <span><input name="query" /></span></h3></div>
        <div className='titles'> <h3> Event Location <span><input name="query" /></span></h3></div>
        <div className='titles'> <h3> Event Date <span><input name="query" /></span></h3></div>

        </form>
        </div>


          <div className='add_btn'><button type='submit' onClick = {()=>{setHomeBtn(true);setEvent(false);setEventBtn(true)}}>Add Event</button></div>


        
    </div>
    </div>:null}

     


    </div>
  );
}

export default App;

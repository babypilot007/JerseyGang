import './App.css';
// import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Events from './events';
import PostIt from './PostIt';


function App() {

const [event, setEvent] = useState(false)
const [eventBtn, setEventBtn] = useState(true)
const [header, setHeader] = useState(true)
const [homeBtn, setHomeBtn] = useState(true)
const [eventConsol, setEventConsol] = useState(true)


const [name, setName] = useState('')
const [description, setDescription] = useState('')
const [location, setLocation] = useState('')



var eventInfo = Events()
  
  return (


    <div className="App">
        {/* <Routes>
            <Route path = 'eventDetails' element ={<EventDetails />} />
        </Routes> */}

        {homeBtn ? 
        <div>

                <header className="App-header">

                        {header ? <div>
                        <button className="log">Login</button>
                        <button className="reg">Sign up</button>
                        </div> :null}
                
                </header> 
                
        </div> :null}


      <div className='header'>
          <h1>Jersey City Gang</h1>
      </div>
        
          { eventConsol ? <div className='event_backdrop'>{eventInfo}</div> : null}


      
      <div >
        
        {eventBtn ? <div className = 'event'> 

        <button type="submit" onClick ={()=>{

          setEvent(true); setEventBtn(false);setHeader(false);setHomeBtn(false);
            setEventConsol(false);

          
          }} >
          <h2>Create Event</h2></button>

          
         </div>: null }

         {<div>  {eventConsol ? <div className = 'event_create'>{}</div>:null}</div> 
}

         

      </div>


      {event ?   <div className='event'>
          <div className='event_create'>


        <div className='forms'> 
        <form>
            <div className='titles' > 

             <h3> <span><input placeholder = 'Event Name' name="query" onChange={(e) => setName(e.target.value)}/></span></h3>
             <h3>  <span><input placeholder = 'Event Details' name="query" onChange={(e) => setDescription(e.target.value)} /></span></h3>
             <h3>  <span><input placeholder = 'Event Location' name="query" onChange={(e) => setLocation(e.target.value)}/></span></h3>
             <h3> <span><input placeholder = 'Event Type' name="query" onChange={(e) => setName(e.target.value)}/></span></h3>
            <h3> <span><textarea name="description" placeholder = 'Describe the Event'></textarea></span> </h3>
        </div>
        </form>
        </div>


          <div className='add_btn'><button type='submit' onClick = {()=>{

            setHomeBtn(true);setEvent(false);setEventBtn(true)
            
            PostIt(name, description, location); 
            
            window.location.reload(false)
            
            
            }}>Add Event</button></div>



        
    </div>
    </div>:null}

     


    </div>
  );
}

export default App;

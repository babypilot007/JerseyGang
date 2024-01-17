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
   
 
  console.log(eventInfo)
  
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

        
          { eventConsol ? <div className='event_backdrop'>{eventInfo}</div> : null}


        {  console.log(eventInfo)
}
      
      <div >
        
        {eventBtn ? <div className = 'event'> 

        <button type="submit" onClick ={()=>{

          setEvent(true); setEventBtn(false);setHeader(false);setHomeBtn(false);
            setEventConsol(false)

          
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
            <div className='titles' > <h3> Event Name <span><input name="query" onChange={(e) => setName(e.target.value)}/></span></h3></div>
            <div className='titles'> <h3> Event Description <span><input name="query" onChange={(e) => setDescription(e.target.value)} /></span></h3></div>
            <div className='titles'> <h3> Event Location <span><input name="query" onChange={(e) => setLocation(e.target.value)}/></span></h3></div>
            <div className='titles'> <h3> Event Date <span><input name="query" onChange={(e) => setName(e.target.value)}/></span></h3></div>

        </form>
        </div>


          <div className='add_btn'><button type='submit' onClick = {()=>{

            setHomeBtn(true);setEvent(false);setEventBtn(true)
            
            PostIt(name, description, location); 
            
            window.location.reload(false)
            
            
            }}>Add Event</button></div>

{ console.log(description)}
  {console.log(location)}


        
    </div>
    </div>:null}

     


    </div>
  );
}

export default App;

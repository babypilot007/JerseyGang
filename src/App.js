import './App.css';
import { Route, Routes} from 'react-router-dom';
import EventDetails from './EventDetails';
import Home from './Components/Home';
import React from 'react'
import Auth from './Auth';
import SignUp from './Components/SignUp';
import UserHome from './Components/UserHome';
import Rsvp from './Components/Rsvp';
import EditInfo from './Components/EditInfo';
import PassUpdate from './Components/PassUpdate';



function App() {


  
  return (


    <div className="App">
        <Routes>
          <Route path='/' element = {<Home />}></Route>
            <Route path = '/eventDetails' element ={<EventDetails />} />
            <Route path = '/auth' element ={<Auth />} />
            <Route path = '/signup' element ={<SignUp />} />
            <Route path = '/details' element ={<EventDetails />} />
            <Route path = '/userhome' element ={<UserHome />} />
            <Route path = '/rsvp' element ={<Rsvp />} />
            <Route path = '/editdetail' element ={<EditInfo />} />
            <Route path = '/updatepass' element ={<PassUpdate />} />



        </Routes>

      


      
        


      
      {/* <div >
        
        {eventBtn ? <div className = 'event'> 

        <button type="submit" onClick ={()=>{

          setEvent(true); setEventBtn(false);setHeader(false);setHomeBtn(false);
            setEventConsol(false); navigate('login')

          
          }} >
          <h2>Create Event</h2></button>

          
         </div>: null }

         {<div>  {eventConsol ? <div className = 'event_create'>{}</div>:null}</div> 
}

         

      </div> */}


      <div className='event'>
          <div className='event_create'>
    </div>
    </div>
    </div>
  );
}

export default App;

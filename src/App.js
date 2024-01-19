import './App.css';
import { Route, Routes} from 'react-router-dom';
import EventDetails from './EventDetails';
import Home from './Components/Home';
import Login from './Login';
import {SignUp} from './Components/SignUp';


function App() {


  
  return (


    <div className="App">
        <Routes>
          <Route path='/' element = {<Home />}></Route>
            <Route path = 'eventDetails' element ={<EventDetails />} />
            <Route path = 'login' element ={<Login />} />
            <Route path = 'signup' element ={<SignUp />} />
            <Route path = 'details' element ={<EventDetails />} />


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

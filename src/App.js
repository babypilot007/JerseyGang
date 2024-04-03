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
            <Route path = '/eventdetails/:id'element ={<EventDetails />} />
            <Route path = '/auth' element ={<Auth />} />
            <Route path = '/signup' element ={<SignUp />} />
            <Route path = '/details' element ={<EventDetails />} />
            <Route path = '/userhome' element ={<UserHome />} />
            <Route path = '/rsvp' element ={<Rsvp />} />
            <Route path = '/editdetail' element ={<EditInfo />} />
            <Route path = '/updatepass' element ={<PassUpdate />} />

        </Routes>
    </div>
  );
}

export default App;

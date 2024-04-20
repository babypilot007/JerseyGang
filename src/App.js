/* eslint-disable */

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
import UpdatePassOnly from './Components/UpdatePassOnly';
import WebImg from './Components/WebImg';
import ConfirmUrl from './ConfirmUrl';
import Profile from './Components/Profile';
import UserProfile from './Components/UserProfile';

function App() {

    if (process.env.NODE_ENV !== "development") {
      console.log = () => {};
      console.debug = () => {};
      console.info = () => {};
      console.warn = () => {};
  }

  
  return (

    <>

    <div className='noDisplay'>
      <h2>This site is only optimized for small screens... :( </h2>
    </div>

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
            <Route path = '/updatepassonly' element ={<UpdatePassOnly />} />
            <Route path = '/webimg' element ={<WebImg />} />
            <Route path = '/confirmurl' element ={<ConfirmUrl />} />
            <Route path = '/userhome/profile' element ={<Profile />} />
            <Route path = '/userprofile' element ={<UserProfile />} />





        </Routes>
    </div>

    </>
  );
}

export default App;

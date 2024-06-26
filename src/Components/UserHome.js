/* eslint-disable */

import { useState, useEffect} from 'react'
import React from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate} from 'react-router-dom';
import Rsvp from './Rsvp';
import loc from './location.png'
import cal from './calendar.png'
import LocationMap from './LocationMap';
import Autocomplete from "react-google-autocomplete";
import Datetime from 'react-datetime';
import moment from 'moment';
import share from './share.png'
import people from './people.png'
import PhoneInput from 'react-phone-input-2';
import Terms from './Terms';
import Privacy from '../Privacy';
import menu from './menu.png'
import logout from './logout.png'
import account from './account.png'
import connection from './connection.png'
import { WhatsappShareButton } from 'react-share';



const UserHome = () => {

  if (process.env.NODE_ENV !== "development" ) {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
}

  const locApi = process.env.REACT_APP_MAP_API
      
  const[lat, getLat] = useState(40.728157)
  const[long, getLong] = useState(-74.077644)
  const[placeId, setPlaceId] = useState('')




  const navigate = useNavigate()
  const[infoId, getInfoId] = useState('')
  const [file, setFile] = useState();

  const[myEvent, setMyEvent] = useState(true)
  const[allEvents, setAllEvent] = useState(false)
  const[rsvpd, setRsvpd] = useState(false)
  const[getId, setId] = useState('')
  const[userInfo, setUserInfo] = useState('')
  const[userLastName, setUserLastName] = useState('')
  const[guestLimit, setGuestLimt] = useState(2)

  const[attend, showAttend] = useState(false)


  const[userid, getUserId] = useState('')
  const[info, setInfo] = useState('')
  const[eventName, getEventName] = useState('')
  const[location, getLocation] = useState('')
  const[eventDescp, getdescp] = useState('')
  const[uRl, getUrl] = useState('')
  const[addInfo, getAddInfo] = useState('')
  const[hostNumber, getHostNumber] = useState('')


  const[sideNav, setSideNav] = useState('closedSideNav')
  const[sideNavBtnAnimation, setSideNavBtnAnimation] = useState('noAnim')




const d = new Date();

  const [startDate, setStartDate] = useState(d.setMinutes(0));
  // const [dateFormat, setDateFormat] = useState('');


  const[activeMyevent, setActiveMyevent] = useState('isActive')
  const[activeAllevent, setActiveAllevent] = useState('notActive')
  const[activeCreate, setActiveCreat] = useState('notActive')

  const [className, setClassName] = useState("closedTerms");
  const [classNamePrivacy, setClassNamePrivacy] = useState("closedTerms");


  // const [dateValue, onchange] = useState(new Date());







    useEffect(()=>{

      const loggedIn = async ()=>{
      try {
        const {data: {user},} = await supabase.auth.getUser()
        
             setUserInfo(user.user_metadata.firstName)
             getUserId(user.id)
             setUserLastName(user.user_metadata.lastName)



          setId(user.id)

      } catch (error) {
        if(error){
        }
      }
    }
    loggedIn()

  }, [navigate])

  var eventInfo = Rsvp(userid)


  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        if(getId){
        const response = await supabase.from('event').select('*').eq('UserId',getId)
          var match = response.data[0].Rsvp_Id
            if(match.includes(userid))
            {
            }            
            if(response.data !== null){
            setInfo(response.data)
            }
            else setInfo(null)
        } 
      } catch (error) {
      
    }}
    fetchData()
  }, [getId,userid])


    const logOut = async ()=>{
    try {
        const out = await supabase.auth.signOut()
      
       navigate('/auth')
            if(out){}
    } catch (error) {
      if(error){
      }

    }
  }



    const createEvent = async () =>{

      try {
        const {data: {user}} = await supabase.from('event').insert([
          {
            EventLocation : location,
            UserId : getId,
            UserName : userInfo,
            Event_descp : eventDescp,
            EventName : eventName,
            Rsvp : 1,
            EventDate: moment(startDate).format('dddd, MMMM Do YYYY, h:mm a'),
            Rsvp_names : [{"firstName" : userInfo + " (Host)" , "id" : userid,"lastName" :userLastName}],
            Rsvp_Id : [getId],
            lat: lat,
            long:long,
            placeId : placeId,
            URL : uRl,
            AddInfo : addInfo,
            FormatDate : startDate,
            GuestLimit : guestLimit,
            HostNumber : hostNumber,
          }
        ])

      
             
            


        if(user){}
      } catch (error) {
        
      }

      
      window.location.reload();
    }



    const handleUpload = async (event) => {
      console.log(event.target.files[0])

      const file = event.target.files[0];
  
      const { error } = await supabase.storage.from('eventimage').upload(event.target.name, file);
  
      if (error) {
        alert('Error uploading image: ', error.message);
      } else {
      }
    };



  const deleteEvent = async (id) =>{

    
    try {
      const {data: {user}} = await supabase.from('event').delete().eq('id', id)
      if(user){}
    } catch (error) {
    }
    window.location.reload();


  }

  const fetchRsvp = async (id)=>{
 
    try {
      
      const response = await supabase.from('event').select('*').eq('id',id)
      var data = response.data
  
        if(data){}
       data.map((e)=> { 
        
           return getInfoId(e.id)
  
      }
      )
    } catch (error) {
    }
  
  
  }

  function show(){
    showAttend(!attend)
  }
 
  function openTerms(){
       setClassName('openTerms')
  }


var eventyes = ''

 if(info.length === 0){

    eventyes = false

 } else eventyes = true
  
    return (
<>

  <div className='navUser'>

  <span className='nameIcon_nav'>{userInfo[0]}{userLastName[0]}</span>
      
      
      <div className='menuBtn'>


      <img  className={sideNavBtnAnimation} src={menu} alt='menu' height='30px' onClick={()=>{
        setSideNav('openSideNav')
        setSideNavBtnAnimation('yesAnim')

      }}></img> 


      </div>

    
    </div>    

   

    <div className='userButton'> 
    <button  className={activeMyevent} onClick={()=>{setMyEvent(true);setAllEvent(false);setRsvpd(false);setActiveMyevent('isActive');setActiveAllevent('notActive');setActiveCreat('notActive')}}>My Events
    </button> 
    <button className = {activeAllevent} onClick={()=>{setMyEvent(false);setAllEvent(true);setRsvpd(false);setActiveMyevent('notActive');setActiveAllevent('isActive');setActiveCreat('notActive')}}>All Events</button> 
    <button className = {activeCreate} onClick={()=>{setMyEvent(false);setAllEvent(false);setRsvpd(true);setActiveMyevent('notActive');setActiveAllevent('notActive');setActiveCreat('isActive')}}>Create Event</button> 
    </div>

    <div className={sideNav} onClick={()=>{
      setSideNav('closedSideNav')
      setSideNavBtnAnimation('noAnim')

    }}>
        <div className='sideNavDiv'>


            <table>
             
                <tr>
                  <th><img src={account} alt='account' ></img></th>
                  <th> <p onClick={()=>{navigate('profile')}}>Profile</p></th>
                </tr>

                <tr>
                  <th><img src={connection} alt='connection'></img></th>
                  <th>connections</th>
                </tr>

                <tr>
                  
                </tr>

            </table>

            <table className='logoutTable'>
            <th><img className='logout' src={logout} alt='logout' ></img></th>
            
                  <th><button onClick={()=>{logOut()}}>Log out</button></th>
                  </table>
            </div>
           
        </div>
        
  
    <div className='simple'>

    {myEvent ? 
    <div className='forms'>
      {eventyes ?  <div className='event_details'>
            {  
            info.map((inf,ind)=>{
             
             return(
               <div className='event_hover' key = {ind}>
        
                          <div className='descp'>

                          <div className='event_header'>
                            <h1>{inf.EventName}</h1>  
                            
                            <WhatsappShareButton 
                             title = {'Event : ' + inf.EventName + '\n\n Description : ' + inf.Event_descp + '\n'} 
                             separator={'\n Time : ' +  inf.EventDate + '\n\n Spots Left : ' + (inf.GuestLimit - inf.Rsvp_Id.length)  + ' \n\nMore details : \n\n'}
                            

                              url={`https://desigangjc.com/eventdetails/${inf.id}`}>
                                
                                <img  src={share} alt='share' height="40px"></img>
                              </WhatsappShareButton>
                            
                            </div>

                          <div className='event_middle'>
                          <p>{<LocationMap
                          lat = {inf.lat}
                          lng = {inf.long}/>}</p>
                                <p>  <img  src={loc} alt='location' height="30px"></img> - <a href={ 'https://www.google.com/maps/search/?api=1&query=Jersey+City,+NJ/&query_place_id=' + inf.placeId}>{inf.EventLocation}</a></p>
                                <p ><img  src={cal} alt='location' height="30px"></img> - {inf.EventDate}</p>
                                
                                
                                <p>Contact : <a href={'tel:' + inf.HostNumber}>{inf.HostNumber.slice(0,3)}-{inf.HostNumber.slice(3,6)}-{inf.HostNumber.slice(6,10)}</a></p>

                                 {inf.URL !== '' ? <div><p>  Link - <a href={inf.URL}> Click for the Link</a> </p></div> : <div><p>  Link - None</p> </div>}

                        </div>
                          
                       <div className='guestImg'><img  className='peopleImg' src={people} alt='people' height="30px"></img>  : {inf.Rsvp}   <span className='span'>____</span> Spots Left : {inf.GuestLimit - inf.Rsvp_Id.length}</div> 

                      
                      
                    <button className="listbtn" value={info.id} onClick={()=>{show();fetchRsvp(inf.id)}}>Guest List</button>

                      <>
                       {attend ? <div> <div>{(inf.id === infoId) ?<div className='nameList'>{inf.Rsvp_names.map((e,idx)=>{
                            return (<div >
                             <li key={idx}><span className='nameIcon'>{e.firstName[0]}{e.lastName[0]}</span>{e.firstName}</li></div>
                            )
                        })}</div> :null}</div>
                       </div> :null } 
                       </>

                                <div className='descp_header'>

                                   <div className='descp_after'> <p><span>Decription : </span></p> <div className='beforeafter'><p>{inf.Event_descp}</p></div></div>
                                    <p className='infoAfter'><span>Additional Info : </span><br></br>{inf.AddInfo}</p>
                                    </div>


                                   <div className='deleteBtnBackground'>

                                   <button className='deleteBtn' onClick = {()=>{navigate("/editdetail", {state : {id : inf.id}})}}>Edit</button> 


                                          <button className='deleteBtn' onClick = {()=>{
                                              deleteEvent(inf.id)

                                      }}>Delete</button> 

                                            </div>
                              </div>



                    
                        </div>
              )
            })
        }  
      
        
        </div> : <>
          <div className='noMyEvent'>
          <p>No Events<br></br>create an Event to Social Up</p>
        </div></>}


 

      </div> :null}
 

 
      {allEvents? <div className='event_details'>
      

      {eventInfo}

      </div>:null}

     
  {rsvpd ? <div className=''>
      
      <div className='terms'>
<button  onClick={()=>{openTerms()}}>
             Terms of Use
         </button>

         <button  onClick={()=>{setClassNamePrivacy('openTerms')}}>
             Privacy Policy
         </button>
         </div>

         <div className={className}>

          
         <button onClick={()=>{
          setClassName('closedTerms')
         }}>Close</button>


           <Terms />

          <br></br>  <button onClick={()=>{
          setClassName('closedTerms')
         }}>Close</button>

          </div>



          <div className={classNamePrivacy}>

          
         <button onClick={()=>{
          setClassNamePrivacy('closedTerms')
         }}>Close</button>


            <Privacy />

          <br></br> <button onClick={()=>{
          setClassNamePrivacy('closedTerms')
         }}>Close</button>

          </div>

<div className='formDiv'>

      <form className="signupform" onSubmit={createEvent}>

     

        <input
            className="inputField"
            type="EventName"
            placeholder="Event Name"
            value={eventName}
            required={true}
            onChange={(e) => getEventName(e.target.value)}
          />
     
       
        
        <Autocomplete
        
        apiKey={locApi}
        placeholder="Jersey City"
        componentRestrictions={{ country: "us , ind" }}
        options={{
            types: ["geocode", "establishment"],
            fields : ['']
          }}

        


        onPlaceSelected={(place) => 
          {
            if( place.formatted_address.includes(place.name))
            {
              getLocation(place.formatted_address)
            } else{
              getLocation(place.name + ', ' + place.formatted_address)

            }

          getLat(place.geometry.location.lat())
          getLong(place.geometry.location.lng())
          setPlaceId(place.place_id)

          console.log(place.name)
          console.log(place.formatted_address)


          }}



        />
<p>{<LocationMap
       lat = {lat}
       lng = {long}/>}</p>

        <input
            className="inputField"
            type="text"
            placeholder="Additional info (Rooftop, floor 15)"
            value={addInfo}
            onChange={(e) => {getAddInfo(e.target.value)}}
          />
      
<input      
            className="inputField"
            type="tel"
            placeholder="Guest Limit (Min 2)"
            min={2}
            value={guestLimit}
            onChange={(e) => setGuestLimt(e.target.value)}
          />
            
                  
                  <div>
                  
                  </div>
        
        
    <Datetime 
    type = 'input'
    className='rdt'
     calendarIcon = {false}
     clearIcon={false}
     showTimeSelect
     locale='us'
     value={startDate}
     required = {true}
     utc = {false}
     showLeadingZeros ={true}
     

     timeConstraints={{'minutes': {
      'min': 0,
      'step': 15
    }}}

      onSelect={()=>{return startDate}}
      onChange={(date)=>{
        setStartDate(date)
        }}/>

        <input
            className="inputField"
            type="Username"
            placeholder="Event URL https://"
            value={uRl}
            onChange={(e) => getUrl(e.target.value)}
          />

        

          <PhoneInput
          className="number"
          country={"us"}
          onlyCountries={["us"]}
          placeholder='+1 {Contact}'
          value={hostNumber}
          onChange={getHostNumber}
          autoFormat = {true}
          required = {true}
          disableCountryCode={true}
          />

    

        <textarea rows='20' cols='20' 
        className='inputField_textbox'
        placeholder='Describe the Event'
        value={eventDescp}
        required={true}
        onChange={(e) => getdescp(e.target.value)
        }
        />

<input type="file"  onChange={handleUpload} />
            <img src={file} />


      <button type='submit'>
             create an Event
         </button>

     
      
      </form>
      
      </div>

      </div> :null}
      

    
    </div>

    </>
    
  )

}

export default UserHome
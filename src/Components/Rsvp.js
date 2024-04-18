import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useEffect, useState} from 'react'
import { supabase } from '../supabaseClient';
import loc from './location.png'
import cal from './calendar.png'
import LocationMap from './LocationMap';
import share from './share.png'
import { WhatsappShareButton } from 'react-share';
import people from './people.png'


function Rsvp(userid) {

  const navigate = useNavigate()
  const [className, setClassName] = useState("closedReport");

    
    const[data, getData] = useState('')
    const[userId, getUserId] = useState('')
    const[map_users, getMapUsers] = useState('')
    const[userfirstNames, getUserfirstNames] = useState('')
    const[userlastNames, getUserLastNames] = useState('')


    const[attend, showAttend] = useState(false)
    const[pressBtn, setPressBtn] = useState(0)
    const[infoId, getInfoId] = useState('')

    const[btnId, getBtnId] = useState('')


    const[reportype, setReporType] = useState('')

    const[detailsClass, setDetailsClass] = useState('noDets')




   let isAvailable

    let clsname ='interested'

    useEffect(()=>{
      const fetchData = async ()=>{
        try {
          const {data: {user},} = await supabase.auth.getUser()
            if(user === null){
              navigate ('/auth')
            }else{
              getUserId(user.id)
              getUserfirstNames(user.user_metadata.firstName)
              getUserLastNames(user.user_metadata.lastName)

              if(userId === map_users){}
              navigate('/userhome')
            }
        } catch (error) {
        }
      }
      fetchData()
    }, [navigate, userId, map_users])
  

useEffect(()=>{  const fetchData = async (event)=>{
  try {
    
    const response = await supabase.from('event').select('*').order('id', {Ascending: false })


        
      
        getData(response)
         


      
      
  } catch (error) {
    getMapUsers()
  }
}
fetchData()
},[pressBtn])


const setRsvp = async (event)=>{


  var count = 0
  var map_rsvp_users
  var map_rsvp_id
  try {
      const getRsvpCount = await supabase.from('event').select('Rsvp').eq('id',event)
      const getRsvpUsers = await supabase.from('event').select('Rsvp_names').eq('id',event)
      const getRsvpId = await supabase.from('event').select('Rsvp_Id').eq('id',event)

       
      
       map_rsvp_users = getRsvpUsers.data[0].Rsvp_names
       map_rsvp_id = getRsvpId.data[0].Rsvp_Id
      count = getRsvpCount.data[0].Rsvp + 1
      const response = await supabase.from('event').update({Rsvp : count}).eq('id',event)
      const updateUser = await supabase.from('event').update({Rsvp_names : [...map_rsvp_users,{"id":userId,"firstName":userfirstNames, "lastName":userlastNames}]}).eq('id',event)
      const updateId = await supabase.from('event').update({Rsvp_Id : [...map_rsvp_id,userId]}).eq('id',event)
      
      if(!response){

      if(updateId){
        if(updateUser){}
      }
      }
          setPressBtn(2)

          const oldArray = getRsvpUsers.data[0].Rsvp_names
      
          if(oldArray){}
         
  
  } catch (error) {
  }
}

const unRsvp = async(event)=>{

  const getRsvpUsers = await supabase.from('event').select("Rsvp_names").eq('id',event)

  
  const oldArray = getRsvpUsers.data[0].Rsvp_names

      let myArray = [userlastNames,userfirstNames,userId]

      if(!myArray){
        
     }

      const newArray = oldArray.filter(function(itm){
        return itm.id !== userId
      })


  const deleteRsvpId = await supabase.from('event').select("Rsvp_Id").eq('id',event)

  const oldRsvpIdArray = deleteRsvpId.data[0].Rsvp_Id

  const newRsvpIdArray = oldRsvpIdArray.filter((item,i)=> item !== userId)

  const updateRsvpId = await supabase.from('event').update({Rsvp_Id : newRsvpIdArray}).eq('id',event)
  const updateRsvpNames = await supabase.from('event').update({Rsvp_names : newArray}).eq('id',event)
  const getRsvpCount = await supabase.from('event').select('Rsvp').eq('id',event)

  let count = getRsvpCount.data[0].Rsvp - 1
  const response = await supabase.from('event').update({Rsvp : (count)}).eq('id',event)

  if(!response){
    if(updateRsvpId || updateRsvpNames){}
  }
  setPressBtn(2)



} 


const fetchRsvp = async (id)=>{
 
  try {
    
    const response = await supabase.from('event').select('*').eq('id',id)
    var data = response.data



     data.map((e)=> { 
      
         return getInfoId(e.id)

    }
    )
  } catch (error) {
  }

  setPressBtn(3)

}


function show(){
  showAttend(!attend)
}





const report = async (id)=>{

  let repCount
  let reptypeold
  
  try {
      const rep = await supabase.from('event').select('report').eq('id',id)
      const reptype = await supabase.from('event').select('reportType').eq('id',id)


      reptypeold = reptype.data[0].reportType
      repCount = rep.data[0].report + 1
      
      const addRepCount = await supabase.from('event').update({report : repCount}).eq('id',id)
      const addRepType = await supabase.from('event').update({reportType : [...reptypeold, reportype]}).eq('id',id)

        if(addRepCount){if(addRepType){}}


  
  } catch (error) {
  }
}


  

  if(data.data){
  var details = data.data

  var len = details.length
  }



  if(len >= 1){
    return ( 
            details.map((info,ind)=>{
                
                  if(info.UserId === userId)
                  {
                    return (<></>)
                } else return(

   <div className='event_hover' key = {ind}>

              <div className='descp'>

                      <div className='event_header'>
                        <h1 >{info.EventName}</h1>     
                        
                        <WhatsappShareButton 
                              title = {'Event : ' + info.EventName + '\n\n Description : ' + info.Event_descp + '\n'} 
                              separator={'\n Time : ' +  info.EventDate + '\n\nMore details : \n\n'}

                              url={`https://desigangjc.com/eventdetails/${info.id}`}>
                                
                                <img  src={share} alt='share' height="40px"></img>
                              </WhatsappShareButton>

                        </div>

                        <div>

                          <div className='event_middle'>
                          <p>{<LocationMap
                          lat = {info.lat}
                          lng = {info.long}/>}</p>
                                <p>  <img  src={loc} alt='location' height="30px"></img> - <a href={ 'https://www.google.com/maps/search/?api=1&query=Jersey+City,+NJ/&query_place_id=' + info.placeId}>{info.EventLocation}</a></p>
                                <p ><img  src={cal} alt='location' height="30px"></img> - {info.EventDate}</p>
                                
                                <p>Contact : <a href={'tel:' + info.HostNumber}>{info.HostNumber.slice(0,3)}-{info.HostNumber.slice(3,6)}-{info.HostNumber.slice(6,10)}</a></p>
                              
                              
                              
                                {info.URL !== '' ? <div><p>  Link - <a href={info.URL}> Click for the Link</a> </p></div> : <div><p>  Link - None</p> </div>}
                                
                                

                        </div>

                       <div className='guestImg'><img  className='peopleImg' src={people} alt='people' height="30px"></img>  : {info.Rsvp}   <span className='span'>____</span> Spots Left : {info.GuestLimit - info.Rsvp_Id.length}</div> 



                                    {((info.GuestLimit - info.Rsvp_Id.length)) === 0 ? <div>{isAvailable = true }</div>: <div>{isAvailable = false}</div>}

                                  

                      <button className="listbtn" value={info.id} onClick={()=>{show();fetchRsvp(info.id);}}>Guest List</button>

                      

                       <div >
                       {attend ? <div> <div>{(info.id === infoId) ?<div className='nameList'>{info.Rsvp_names.map((e,idx)=>{
                            return (<div >
                             <li key={idx}><span className='nameIcon'>{e.firstName[0]}{e.lastName[0]}</span>{e.firstName}</li></div>
                            )
                        })}</div> :null}</div>
                       </div> :null } 
                       </div>

                       
                       {(info.id === infoId) ?<div className={className}>
                                  <h3>Report this event</h3>

                                  <div onChange={(e)=>{ setReporType(e.target.value)}} className='radio'>
                                          <ul>
                                          <li><input type="radio" value="Inappropriate Content"   defaultChecked name="gender"/> Inappropriate Content</li>
                                          <li>  <input type="radio" value="scam" name="gender"/> Scam</li>
                                          <li>  <input type="radio" value="sus/danger" name="gender"/> Seems Suspicious/Dangerous</li>
                                          <li>  <input type="radio" value="Other" name="gender"/> Other</li>

                                         
                                          </ul>

                                  </div>
                                      

                                    <button className='report' onClick={()=>{

                                          report(info.id)
                                          setClassName('closedReport')
                                          
                                          }}>Report</button>

                                                <button className='report'  onClick = {()=>{
                setClassName('closedReport')

                      }}>Cancel</button> 
                                 
                                    <p>Thank you for your response. Appropriate action will be taken. </p>
                                            </div> :null}
                      

                                            
                             <div  className={detailsClass} onClick={()=>{
                                  setDetailsClass('noDets')  }}>  

                              {(info.id === btnId) ? 
                                   
                                   

                              
                              
                                  <div className='descp_details'>
                                  <h2>About</h2>
                                  
                                    <p>{info.Event_descp}</p>
                                    <div className='descp_details'>
                                  <h2>Add'nal Info</h2>
                                    <p>{info.AddInfo}</p></div></div>

                                :null}
                            
                                
                            </div>
 



                  <div className='btn_grp'>

                      <button id = {info.id} className='details'  onClick = {(e)=>{
                        fetchRsvp(info.id)
                        getBtnId(parseInt(e.target.id))
                        setDetailsClass('yesDets')
                       
                      }}>Details</button> 

<button className='report'  onClick = {()=>{
                setClassName('openReport')
                fetchRsvp(info.id)

                      }}>Report Event</button> 
                
                                          {/* <div className={className}>

                                                                    
                                          <button onClick={()=>{
                                          setClassName('closedTerms')
                                          }}>Close</button>

                           

                                          <br></br> <button>Close</button>

                                          </div> */}
              

              <div className='rsvpBtn'>

                        { (info.Rsvp_Id.includes(userid)) ?    //RSVP button
                        <div> 
                          <button className='notInterested' onClick={()=>{
                          unRsvp(info.id)
                          fetchRsvp(info.id);

                          }}>Cancel RSVP</button></div>
                       :
                       <div>
                        <button className={clsname} 
                        disabled = {isAvailable}
                        onClick={()=>{
                        setRsvp(info.id);
                        fetchRsvp(info.id);
                        }}>Want to attend</button></div>
                       }                      
                     </div>

                    
                    
                   </div> 
                   <div >

                   
                      
                       </div>
               
                 
                        </div>
              </div>
    </div>
              )
            }))

}else if(len === 0) return  (

 <div className='noEvent'><p>No Events near by</p></div>
       )
    


 
  
  
}

export default Rsvp
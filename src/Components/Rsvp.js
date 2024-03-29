import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useEffect, useState} from 'react'
import { supabase } from '../supabaseClient';
import loc from './location.png'
import cal from './calendar.png'
import LocationMap from './LocationMap';




function Rsvp(userid) {

  const navigate = useNavigate()
  

    
    const[data, getData] = useState('')
    const[userId, getUserId] = useState('')
    const[map_users, getMapUsers] = useState('')
    const[userfirstNames, getUserfirstNames] = useState('')
    const[userlastNames, getUserLastNames] = useState('')

    const[attend, showAttend] = useState(false)
    const[showDets, setShowDets] = useState(false)
    const[pressBtn, setPressBtn] = useState(0)
    const[infoId, getInfoId] = useState('')



    useEffect(()=>{
      const fetchData = async ()=>{
        try {
          const {data: {user},} = await supabase.auth.getUser()
            if(user === null){
              navigate ('/auth')
            }else{
              console.log(user.user_metadata.firstName)
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
      console.log(updateId)
      console.log(response)

          console.log(updateUser)
          setPressBtn(2)
          console.log(pressBtn)

          const oldArray = getRsvpUsers.data[0].Rsvp_names
      
          var isThere = oldArray.includes('Himalay')
        console.log(isThere)
        

  
  } catch (error) {
  }
}

const unRsvp = async(event)=>{

  const getRsvpUsers = await supabase.from('event').select("Rsvp_names").eq('id',event)
  console.log(getRsvpUsers.data[0].Rsvp_names)
  const oldArray = getRsvpUsers.data[0].Rsvp_names
  console.log(oldArray)

      let myArray = [userlastNames,userfirstNames,userId]
      console.log(myArray)

      const newArray = oldArray.filter(function(itm){
        return itm.id !== userId
      })

      console.log(newArray)

  const deleteRsvpId = await supabase.from('event').select("Rsvp_Id").eq('id',event)

  const oldRsvpIdArray = deleteRsvpId.data[0].Rsvp_Id

  const newRsvpIdArray = oldRsvpIdArray.filter((item,i)=> item !== userId)

  const updateRsvpId = await supabase.from('event').update({Rsvp_Id : newRsvpIdArray}).eq('id',event)
  const updateRsvpNames = await supabase.from('event').update({Rsvp_names : newArray}).eq('id',event)
  const getRsvpCount = await supabase.from('event').select('Rsvp').eq('id',event)

  let count = getRsvpCount.data[0].Rsvp - 1
  const response = await supabase.from('event').update({Rsvp : (count)}).eq('id',event)
  console.log(response)
  console.log(updateRsvpId)
  console.log(updateRsvpNames)

  setPressBtn(2)



} 


const fetchRsvp = async (id)=>{
 
  try {
    
    const response = await supabase.from('event').select('*').eq('id',id)
    var data = response.data

      console.log(data)
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

function dets()
{
  setShowDets(!showDets)

}



  
  var details = data.data


  if(details !== undefined){
    return ( 
            details.map((info,ind)=>{
                
                  if(info.UserId === userId)
                  {
                    return null
                } else return(

   <div className='event_hover' key = {ind}>

              <div className='descp'>

                      <div className='event_header'>
                        <h1>{info.EventName}</h1> 
                        </div>

                        <div>

                          <div className='event_middle'>
                          <p>{<LocationMap
                          lat = {info.lat}
                          lng = {info.long}/>}</p>
                                <p>  <img  src={loc} alt='location' height="30px"></img> - <a href={ 'https://www.google.com/maps/search/?api=1&query=Jersey+City,+NJ/&query_place_id=' + info.placeId}>{info.EventLocation}</a></p>
                                <p ><img  src={cal} alt='location' height="30px"></img> - {info.EventDate}</p>
                                <p>  Link - <a href={info.URL}> Click for the Link</a></p>

                        </div>
                      Attending : {info.Rsvp}
                      <br></br><button className="listbtn" value={info.id} onClick={()=>{show();fetchRsvp(info.id);}}>Guest List</button>

                      

                       <div >
                       {attend ? <div> <div>{(info.id === infoId) ?<div className='nameList'>{info.Rsvp_names.map((e,idx)=>{
                            return (<div >
                             <li key={idx}><span className='nameIcon'>{e.firstName[0]}{e.lastName[0]}</span>{e.firstName}</li></div>
                            )
                        })}</div> :null}</div>
                       </div> :null } 
                       </div>


                  <div className='btn_grp'>

                      <button className='details'  onClick = {()=>{
                        fetchRsvp(info.id)
                        dets()
                      }}>Details</button> 

                 


              <div className='rsvpBtn'>

                        { (info.Rsvp_Id.includes(userid)) ?    //RSVP button
                        <div> 
                          <button className='notInterested' onClick={()=>{
                          unRsvp(info.id)
                          fetchRsvp(info.id);

                          }}>Cancel RSVP</button></div>
                       :
                       <div>
                        <button className='interested' onClick={()=>{
                        setRsvp(info.id);
                        fetchRsvp(info.id);

                        }}>Want to attend</button></div>
                       }                      
                     </div>


                    
                   </div> 
                   <div >


                       {showDets ? <div> <div>{(info.id === infoId) ?<div className='descp'>
                                  <div className='descp_details'>
                                  <h2>About</h2>
                                  
                                    <p>{info.Event_descp}</p>
                                    <div className='descp_details'>
                                  <h2>Add'nal Info</h2>
                                    <p>{info.AddInfo}</p></div></div>
                                 
                       </div> :null}</div>
                       </div> :null } 
                       </div>
               
                 
                        </div>
              </div>
    </div>
              )
            }))


}else return  (
        <div  className='event_details'>No Events
        </div>)
    


 
  
  
}

export default Rsvp
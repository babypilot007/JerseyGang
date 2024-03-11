import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useEffect, useState} from 'react'
import { supabase } from '../supabaseClient';




function Rsvp() {

  const navigate = useNavigate()
  

    
    const[data, getData] = useState('')
    const[userId, getUserId] = useState('')
    const[map_users, getMapUsers] = useState('')
    const[userNames, getUserNames] = useState('')

    const[attend, showAttend] = useState(false)


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
              getUserNames(user.user_metadata.firstName)
              if(userId === map_users){}
              navigate('/userhome')
            }
        } catch (error) {
        }
      }
      fetchData()
    }, [navigate, userId, map_users])
  
useEffect(()=>{  const fetchData = async ()=>{
  try {
    
    const response = await supabase.from('event').select('*')
        getData(response)

  } catch (error) {
    getMapUsers()
  }
}
fetchData()
},[])



const setRsvp = async (event)=>{

  var count = 0
  var map_rsvp_users
  try {
      const getRsvpCount = await supabase.from('event').select('Rsvp').eq('id',event)

      const getRsvpUsers = await supabase.from('event').select('Rsvp_names').eq('id',event)
      
      console.log(getRsvpUsers.data[0].Rsvp_names)

       map_rsvp_users = getRsvpUsers.data[0].Rsvp_names

      count = getRsvpCount.data[0].Rsvp + 1
      console.log(count)
    
      const response = await supabase.from('event').update({Rsvp : count}).eq('id',event)
    
      const updateUser = await supabase.from('event').update({Rsvp_names : [...map_rsvp_users,userNames]}).eq('id',event)
          
      console.log(response)

          console.log(updateUser)

  } catch (error) {
  }

  window.location.reload();

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
}


function show(){
  showAttend(!attend)

}

  
  var details = data.data


  if(details !== undefined){
    return ( 
            details.map((info,ind)=>{
                return(
                    <div className='event_hover' key = {ind}>
                        <div className='event_header'>
                          <h1>{info.EventName}</h1> </div>
                          <p>{info.EventLocation}</p>
                        RSVP'd : {info.Rsvp}
                        <button className="listbtn" value={info.id} onClick={()=>{fetchRsvp(info.id);show()}}>Guest List</button>

                       
                        <div >
                         {attend ? <div> <div>{(info.id === infoId) ?<div className='nameList'>{info.Rsvp_names.map((e,idx)=>{
                              return (<div >
                                <br></br><li key={idx}>{e}</li></div>
                              )
                          })}</div> :null}</div>
                         </div> :null } 
                         </div>
                          <br></br>

                        <div><button onClick={()=>{
                              console.log(info.id)
                              setRsvp(info.id)}}>RSVP</button></div>
                  

                    <div className='btn_grp'>
                        <button className='details' onClick = {()=>{
                                    console.log(info.id)
                                    navigate('/details',{state:info.id})
                        }}>Details</button> 

                       <div>


                        <h2><span>Created By:</span><br />{info.UserName}</h2></div>
                     </div>   
                        </div>
                )
            }))

}else return  (
        <div  className='event_details'>No Events
        </div>)
    


 
  
  
}

export default Rsvp
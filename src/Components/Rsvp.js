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
}

  
  var details = data.data


// if(details){

//       details.map((e)=>{


//             var findOut = e.Rsvp_names

//           const found = findOut.find((element) => element === 'Victor');
//           if(found){

//           return console.log(found)
          
            

//           }
//           return console.log(found)


//       })
// }


  // details.map((e)=>{
                                       
  // })
  // const found = details.find((element) => element === 'Victor');
  // if(found){
       
  //     console.log(found)
  // }
  
  // console.log(details)

  
  if(details !== undefined){
    return ( 
            details.map((info)=>{
                return(
                    <div className='event_hover' key = {info.id}>
                        <div className='event_header'>
                          <h1>{info.EventName}</h1> </div>
                          <p>{info.EventLocation}</p>

                        RSVP'd : {info.Rsvp}
                        <p><br></br>Attendees : {info.Rsvp_names}</p>


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
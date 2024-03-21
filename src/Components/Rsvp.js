import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useEffect, useState} from 'react'
import { supabase } from '../supabaseClient';




function Rsvp(userid) {

  const navigate = useNavigate()
  

    
    const[data, getData] = useState('')
    const[userId, getUserId] = useState('')
    const[map_users, getMapUsers] = useState('')
    const[userNames, getUserNames] = useState('')

    const[attend, showAttend] = useState(false)


    const[pressBtn, setPressBtn] = useState(0)





    const[infoId, getInfoId] = useState('')

    const[idForRsvp, getRsvpId] = useState('')



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
  

useEffect(()=>{  const fetchData = async (event)=>{
  try {
    
    const response = await supabase.from('event').select('*').order('id', {Ascending: false })

    const rNames = await supabase.from('event').select('Rsvp_Id').order('id', {Ascending: false })

        getRsvpId(rNames.data[0].Rsvp_Id)
        
      
        getData(response)
         


      
      
  } catch (error) {
    getMapUsers()
  }
}
fetchData()
},[pressBtn])

console.log(idForRsvp)

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
      const updateUser = await supabase.from('event').update({Rsvp_names : [...map_rsvp_users,userNames]}).eq('id',event)
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
  // window.location.reload();

}

const unRsvp = async(event)=>{

  const getRsvpUsers = await supabase.from('event').select("Rsvp_names").eq('id',event)
      console.log(getRsvpUsers.data[0].Rsvp_names)
      const oldArray = getRsvpUsers.data[0].Rsvp_names
      const newArray = oldArray.filter((item, i)=> item !== 'Himalay')
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

  console.log(pressBtn)


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

  console.log(pressBtn)
}


function show(){
  showAttend(!attend)
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




                  <div className='btn_grp'>
                      <button className='details' onClick = {()=>{
                                  console.log(info.id)
                                  navigate('/details',{state:info.id})
                      }}>Details</button> 
                         <div className='rsvpBtn'>
                        { (info.Rsvp_Id.includes(userid)) ?    //RSVP button
                        <div> 
                          <button className='notInterested' onClick={()=>{
                          unRsvp(info.id)
                          fetchRsvp(info.id);

                          }}>Not going</button></div>
                       :
                       <div>
                        <button className='interested' onClick={()=>{
                        setRsvp(info.id);
                        fetchRsvp(info.id);

                        }}>Going</button></div>
                       }                      
                     </div>

                    <h3>Created By:<br />{info.UserName}</h3>

                    
                   </div>   

                      </div>
              )
            }))


}else return  (
        <div  className='event_details'>No Events
        </div>)
    


 
  
  
}

export default Rsvp
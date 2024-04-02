import React from 'react'
import { WhatsappShareButton } from 'react-share';
import { WhatsappIcon } from 'react-share';
export default function NavBottom() {
  return (
    <div className='eventbottom'>
        <WhatsappShareButton 
     title="Join these fun Meetup Group - 
     Create, Meet, Explore !
     " 
     url={'https://desigangjc.com/'}>

        
<WhatsappIcon 
size='50px'
round = {true}/>

     </WhatsappShareButton>
    </div>
  )
}

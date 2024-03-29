import React from 'react'
import { WhatsappShareButton } from 'react-share';
import { WhatsappIcon } from 'react-share';
export default function NavBottom() {
  return (
    <div className='eventbottom'>
        <WhatsappShareButton 
     title="whatsapp" 
     url={'https://jerseygang.netlify.app/'}>

<WhatsappIcon 
size='50px'
round = {true}/>

     </WhatsappShareButton>
    </div>
  )
}

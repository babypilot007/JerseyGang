import React from 'react'

const EventDetails = () => {

    fetch(`http://localhost:2000/api/jersey-gang-events/`, {

    method: "GET",
    headers: {
      'Content-type': 'application/json'
    },
    
  })
  return (
    <div>{EventDetails}</div>
  )
}

export default EventDetails
import React from 'react'

const DeleteEvents = (id) => {

    console.log(id)
    fetch(`http://localhost:2000/api/jersey-gang-events/` + id, {

    method: "DELETE",
    headers: {
      'Content-type': 'application/json'
    },
  })

  return (
    <div>DeleteEvents</div>
  )
}

export default DeleteEvents
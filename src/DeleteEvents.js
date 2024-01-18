

const DeleteEvents = (id) => {


    fetch(`http://localhost:2000/api/jersey-gang-events/` + id, {

    method: "DELETE",
    headers: {
      'Content-type': 'application/json'
    },
    
  })


}

export default DeleteEvents
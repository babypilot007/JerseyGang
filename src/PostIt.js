


const PostIt = (eventname, eventDescription, eventLocation) => {


        console.log(eventDescription)
        console.log(eventLocation)


        let body = {
            data: {

            EventName: eventname,
            EventLocation  : eventLocation,
            EventDescription  : eventDescription   
        }
        };
     
        fetch(`http://localhost:2000/api/jersey-gang-events`, {

          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(() => {
            console.log(body)
          })


        }

 
export default PostIt
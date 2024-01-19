


const PostIt = (name, email) => {


        
        

        let body = {

            data: {
            EventLocation  : email,
            UserName : name
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
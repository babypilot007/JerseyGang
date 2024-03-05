import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from './supabaseClient';

const DeleteEvents = () => {
  const navigate = useNavigate()

  const location = useLocation()
  
  var id = location.state

  const [data, getData] = useState('')


        useEffect( () => { 

            async function fetchData() {
                try {

                    const response = await supabase.from('event').select('*').eq('id',id)

                    getData(response)

                    if(response){
                    console.log(response.data)}
                } catch (err) {
                    console.log(err);
                }
                
            }

            fetchData();

        }, [id]);


}

export default DeleteEvents
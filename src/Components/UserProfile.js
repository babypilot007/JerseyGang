import React from 'react'
import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useLocation } from 'react-router-dom';

function UserProfile() {

const id = useLocation()

console.log(id.state)

useEffect( () => { 

    async function fetchData() {
        try {

            const response = await supabase.from('profiles').select('*').eq('id',id.state)


            if(response){
            }
        } catch (err) {
        }
        
    }

    fetchData();

}, [id]);

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile
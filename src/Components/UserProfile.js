import React from 'react'
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useLocation } from 'react-router-dom';
import { BackNav, PageFrame } from './ui/AppShell';
import { FormCard } from './ui/FormCard';

function UserProfile() {
  const id = useLocation()
  const [profile, setProfile] = useState(null)

  useEffect( () => { 
    async function fetchData() {
      try {
        const response = await supabase.from('profiles').select('*').eq('id',id.state)
        setProfile(response.data && response.data[0] ? response.data[0] : null)
      } catch (err) {}
    }
    fetchData();
  }, [id]);

  return (
    <PageFrame>
      <BackNav title="Dashboard" />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <FormCard eyebrow="Community profile" title={profile?.firstName || 'Community member'}>
          <div className="rounded-3xl bg-chai p-6 text-sm font-semibold leading-7 text-masala">
            Profile details will appear here as the community graph grows.
          </div>
        </FormCard>
      </section>
    </PageFrame>
  )
}

export default UserProfile

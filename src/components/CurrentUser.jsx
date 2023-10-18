'use client'

import { useSession } from 'next-auth/react'

export default function CurrentUser() {
  const { data: session, status } = useSession();
  console.log('session:', session);
  console.log('status:', status);

  return (
    <p className='w-full font-mono text-xs text-right p-2'>Current Users: <strong>{session ? session.user.name : 'Loading...'}</strong></p>
  )
}
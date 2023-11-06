'use client'

import { useSession } from 'next-auth/react'

export default function CurrentUser() {
  const { data: session, status } = useSession();
  console.log('CurrentUser session:', session);
  console.log('CurrentUser status:', status);

  if (status === 'loading') {
    return <p className='w-full font-mono text-xs text-right p-2'>Loading...</p>
  }

  return (
    <p className='w-full font-mono text-xs text-right p-2'>Current Users: <strong>{session?.user?.name}</strong></p>
  )
}
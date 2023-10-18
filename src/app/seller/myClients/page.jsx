'use client'

import ListClients from '@/components/ListClients';
import { useSession } from 'next-auth/react';

export default function MyClients() {
  const { data: session } = useSession()

  return (
    <section>
        <ListClients token={session.user.token} />
    </section>
  )
}

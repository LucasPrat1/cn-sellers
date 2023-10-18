'use client'

import ListPayments from '@/components/listPayments';
import { useSession } from 'next-auth/react';


export default function MyPayments() {
  const { data: session } = useSession()

  return (
    <section>
      <ListPayments token={session.user.token} />
    </section>
  )
}

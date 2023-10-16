'use client'

import { redirect } from 'next/navigation'
import ListClients from '@/app/components/ListClients';

export default function MyClients() {
  const token = localStorage.getItem('token')

  if (!token) {
    redirect('/login');
  }

  return (
    <section>
        <ListClients token={token} />
    </section>
  )
}

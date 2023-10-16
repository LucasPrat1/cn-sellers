'use client'

import { redirect } from 'next/navigation'

export default function MyClients() {
  const token = localStorage.getItem('token')
  console.log('token en page', token)

  if (!token) {
    redirect('/login');
  }

  return (
    <section>
        hola
    </section>
  )
}
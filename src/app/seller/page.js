'use client'

import Link from 'next/link'
import '../globals.css'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      redirect('/login')
    }
  }, [])

  return (
    <>
      <h1 className='text-2xl font-medium my-2'>Welcome seller</h1>
      <p className='text-sm text-gray-700'>
        This is your new control panel,
        from here you will be able to carry out all the managements that correspond to you.
      </p>
      <div className='flex gap-4 mt-3'>
        <Link href={'/seller/myClients'}>
          <button className="btn-blue">My Clients</button>
        </Link>
        <Link href={'/seller/payment'}>
        <button className="btn-cyan">My Payments</button>
        </Link>
        <Link href={'/seller/payment'}>
          <button className="btn-red">Register Payment</button>
        </Link>
      </div>
    </>
  )
}

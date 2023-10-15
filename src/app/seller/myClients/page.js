'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export const fetchClients = async (token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CN_API_URL}/clients/bySeller`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const res = await response.json();
    if (res.error) {
      throw res
    }
    return res
  } catch (error) {
    console.error(error.message)
    return error
  }
};

export default function MyClients() {
  const [clients, setClients] = useState([])
  const token = localStorage.getItem('token')

  const mountClients = async (token) => {
    const res = await fetchClients(token);
    if (!res.error) {
      setClients(res.data);
      console.log(res.message + ' ' + clients)
    } else {
      console.error(res.message)
    }
  }

  useEffect(() => {
    if (!token) {
      redirect('/login');
    } else {
      mountClients(token)
    }
  }, [token])

  console.log('clients', clients)

  return (
    <>
    {clients.map((client)=> {
      return (
        <div key={client._id}>
          <h4>{client.name}</h4>
          <p>{client.email}</p>
        </div>
      )
    })}

    </>
  )
}

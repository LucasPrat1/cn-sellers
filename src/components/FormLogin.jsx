'use client'

import React, { useState } from 'react';
import { redirect } from 'next/navigation'
// import { useRouter } from 'next/navigation';
import { setAuth } from '../app/seller/page';

console.log('process.env.', process.env.NEXT_PUBLIC_CN_API_URL)

export const fetchLogin = async (email, password) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CN_API_URL}/sellers/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
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

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await fetchLogin(email, password)
    console.log('login', login)
    if (login.error) {
      alert(login.message);
    } else {
      setAuth(login.data.token, login.data.name);
      alert(login.message);
      redirect('/seller');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm space-y-6'>
      <div>
        <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div>
        <label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

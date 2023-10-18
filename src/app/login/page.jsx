'use client'

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// export const fetchLogin = async (email, password) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_CN_API_URL}/sellers/login`, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         email,
//         password
//       })
//     });
//     const res = await response.json();
//     if (res.error) {
//       throw res
//     }
//     return res
//   } catch (error) {
//     console.error(error.message)
//     return error
//   }
// };

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    console.log('login', login)

    if (login?.error) {
      setError(login?.error)
    } else {
      router.push('/seller');
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
      {error && (
        <div className="p-2 text-red-800 border border-red-500 rounded-lg bg-red-50">
          <p className="text-center font-medium">{error}</p>
        </div>
      )}
    </form>
  );
};

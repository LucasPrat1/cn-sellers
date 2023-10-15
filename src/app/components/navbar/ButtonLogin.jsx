'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ButtonLogin = () => {
  const router = useRouter()

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    router.push('/login');
  }

  return (
      <Link href={'/'} onClick={logOut} className="text-sm font-semibold leading-6 text-gray-900 text-white">
        Log out <span aria-hidden="true">&rarr;</span>
      </Link>
    )
}

export default ButtonLogin
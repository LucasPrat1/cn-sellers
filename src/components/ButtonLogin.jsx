'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"

const ButtonLogin = () => {
  const router = useRouter()
  const { data: session } = useSession()

  if (session) {
    return (
      <button onClick={() => signOut()} className="text-sm font-bold leading-6 hover:text-gray-400 text-white ">
        Log out <span aria-hidden="true">&rarr;</span>
      </button>
    )
  }
}

export default ButtonLogin
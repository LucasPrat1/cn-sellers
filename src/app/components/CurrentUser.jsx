'use client'

export default function CurrentUser() {
  const userName = window.localStorage.getItem('userName');

  return (
      <p className='w-full font-mono text-xs text-right p-2'>Current Users: {userName? userName : ''}</p>
  )
}
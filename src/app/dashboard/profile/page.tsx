'use client'

import { useSession } from 'next-auth/react'


export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Profile page</h1>
      <hr className='mb-2' />
      <div className='flex flex-col'>
        <span>{session?.user?.name ?? 'no User'}</span>
        <span>{session?.user?.email ?? 'no Email'}</span>
        <span>{session?.user?.image ?? 'no Image'}</span>
      </div>
    </div>
  )
}

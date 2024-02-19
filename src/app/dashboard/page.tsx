import { auth } from '@/auth'

import { WidgetItem } from '@/components'
import { redirect } from 'next/navigation'

export default async function DashBoardPage() {
  const session = await auth()
  // const { user } = session
  if (!session) {
    redirect('/dashboard/profile')
  }
  return (
    <div className='grid gap-6 md:grid-cols-2 grid-cols-1'>
      <WidgetItem title='Información del usuario / server side'>
        <div className='flex flex-col'>
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
          <hr />
          <div>
            {JSON.stringify(session)}
          </div>

        </div>
      </WidgetItem>
    </div>
  )
}

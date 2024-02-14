import { cookies } from 'next/headers'
import { TabBar } from '@/components'

export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page',
}

export default function CookiesPage() {
  const cookieStore = cookies()

  //Si el user nunca ha estado en el sitio la cookie es NULL
  const cookieTab = cookieStore.get('selectedTab')?.value ?? 1

  // para obtener todas las cookies
  const allCookies = cookieStore.getAll()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {JSON.stringify(allCookies)}
      <div className='flex flex-col'>
        <span className='text-3xl'>Tabs</span>
        <TabBar currentTab={+cookieTab} />
      </div>
    </div>
  )
}

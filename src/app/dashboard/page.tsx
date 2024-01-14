import { WidgetItem } from '@/components'
import { NewTodo } from '@/todos'

export default function DashBoardPage() {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <WidgetItem />
    </div>
  )
}

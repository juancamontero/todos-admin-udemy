export const dynamic = 'force-dynamic' // renderiza dinámico
export const revalidate = 0 // se revalida dinámico

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'
import { getAllTodos } from '@/todos/helpers/todos'

export const metadata = {
  title: 'REST - To dos',
  description: 'REST - To dos page',
}

export default async function RestTodoPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })
  const todosTest = await getAllTodos()
  return (
    <div>
      <h1 className='mb-4 text-2xl text-sky-800'>Server Actions</h1>
      <div className='w-full px-4 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}

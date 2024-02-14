'use server'

// 'auto' | 'force-dynamic' | 'error' | 'force-static'
// export const dynamic = 'force-dynamic' // renderiza dinámico
// // false | 0 | number
// export const revalidate = 0 // se revalida dinámico

import { Todo } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'


const sleep = async  (seconds: number = 0): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, seconds * 1000)
    })
  }

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {

    // to test optimistica updates
    await sleep(3)

  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) throw `Todo con id ${id} no encontrado`

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  })

  // Para actualizar ruta
  revalidatePath('/dashboard/server-todos')
  return updatedTodo
}

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    return {
      message: 'error',
    }
  }
}

export const deleteCompleted = async (): Promise<number> => {
  try {
    const { count } = await prisma.todo.deleteMany({
      where: { complete: true },
    })
    revalidatePath('/dashboard/server-todos')
    return count
  } catch (error) {
    return 0
  }
}

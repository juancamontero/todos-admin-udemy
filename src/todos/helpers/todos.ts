import { Todo } from '@prisma/client'

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  // body build
  const body = { complete }



  // ejecuto el PUT en la db
  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json())

  return todo
}

export const createTodo = async (description: string): Promise<Todo> => {
  // body build
  const body = { description }

  // ejecuto el PUT en la db
  const todo = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json())

  console.log(todo)
  return todo
}

export const deleteCompleted = async (): Promise<any> => {
  const count = await fetch(`/api/todos`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json())

  return count
}

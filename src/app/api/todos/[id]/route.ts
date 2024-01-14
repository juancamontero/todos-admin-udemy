import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import * as yup from 'yup'

interface Params {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | undefined | null> => {
  const todo: Todo | null = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  })

  return todo
}

export async function GET(request: Request, { params }: Params) {
  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json(
      {
        message: `todo with id= ${params.id} does not exist`,
      },
      { status: 404 }
    )
  }

  return NextResponse.json(todo)
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
})

export async function PUT(request: Request, { params }: Params) {
  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json(
      {
        message: `todo with id= ${params.id} does not exist`,
      },
      { status: 404 }
    )
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    )

    const updatedTodo = await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: { complete, description },
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json(error)
  }
}

// const deleteSchema = yup.object({
//   id: yup.string().required(),
// })

export async function DELETE(request: Request, { params }: Params) {
  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json(
      {
        message: `todo with id= ${params.id} does not exist`,
      },
      { status: 404 }
    )
  }

  try {
    // const { id } = await deleteSchema.validate(await request.json())

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: params.id
      },
    })

    return NextResponse.json(deletedTodo)
  } catch (error) {
    return NextResponse.json(error)
  }
}

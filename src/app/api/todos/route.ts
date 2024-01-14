import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

import * as yup from 'yup'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10') //recibo string y lo convierto a Number
  const skip = Number(searchParams.get('skip') ?? '0') //recibo string y lo convierto a Number

  if (isNaN(take))
    return NextResponse.json(
      {
        message: 'Take must be a number',
      },
      { status: 400 }
    )

  if (isNaN(skip))
    return NextResponse.json(
      {
        message: 'skip must be a number',
      },
      { status: 400 }
    )

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  })

  return NextResponse.json({ message: 'ok', todos })
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function POST(req: Request) {
  try {
    const { description, complete } = await postSchema.validate(
      await req.json()
    )
    const todo = await prisma.todo.create({ data: { description, complete } })
    return NextResponse.json({ message: 'todo created', todo })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE(_req: Request) {
  try {
    const todo = await prisma.todo.deleteMany({ where: { complete: true } })
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json(error)
  }
}

import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  // purgo info anterior
  await prisma.todo.deleteMany()

  //inserto nueva dummie data
  // una inserción
  //   await prisma.todo.create({
  //     data: {
  //       description: 'Piedra 1',
  //     },
  //   })
  
  // varias inserciones
  await prisma.todo.createMany({
    data: [
      { description: 'piedra 1', complete: true },
      { description: 'piedra 2' },
      { description: 'piedra 3' },
      { description: 'piedra 4' },
      { description: 'piedra 5' },
    ],
  })

  return new Response(
    JSON.stringify({
      message: 'Seed executed',
    }),
    { status: 200 }
  )
}

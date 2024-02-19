import bcrypt from 'bcryptjs'

import prisma from '@/lib/prisma'
export const signInEmailPassword = async (email: string, password: string) => {
  //sino recibo credenciales
  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  const user = await prisma.user.findUnique({ where: { email } })

  // si no lo encuentro voy a crearlo
  if (!user) {
    // * create new
    // todo: only is email previously exists in db
    const dbUser = await createUser(email, password)
    return dbUser
  }

  //si lo encuentro voy a verificar la contraseña
  if (!bcrypt.compareSync(password, user.password ?? '')) {
    throw new Error('Invalid password')
  }

  return user
}

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0],
    },
  })

  return user
}
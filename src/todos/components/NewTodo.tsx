'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { IoTrashOutline } from 'react-icons/io5'

// import * as todoApi from '@/todos/helpers/todos'
import { addTodo, deleteCompleted } from '../actions/todo-actions'

export const NewTodo = () => {
  const [description, setDescription] = useState('')
  const router = useRouter()

  const onSubmitNew = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length <= 3) return

    await addTodo(description)
      .then((res) => {
        // router.refresh()
        setDescription('')
      })
      .catch((err) =>
        alert(`Cannot create ${description} to do -- ERR: ${err}`)
      )
  }

  const onSubmitDelete = async (e: FormEvent) => {
    e.preventDefault()

  await deleteCompleted()
      .then((_res) => {
        setDescription('')
      })
      .catch((err) =>
        alert(`ERR: ${err}`)
      )
  }

  return (
    <form className='flex w-full'>
      <input
        type='text'
        className='w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
        placeholder='¿Qué necesita ser hecho?'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button
        onClick={onSubmitNew}
        type='submit'
        className='flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'
      >
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={onSubmitDelete}
        type='button'
        className='flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  )
}

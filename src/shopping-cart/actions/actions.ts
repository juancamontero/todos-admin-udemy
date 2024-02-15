// 'use client'

import { getCookie, hasCookie, setCookie } from 'cookies-next'

export const getCookieCart = (): { [id: string]: number } => {
  // Si no existe retornp un objeto vaciío
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? {})
    return cookieCart
  }

  return {}
}

//adiciona UN solo producto
export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()
  //Si existe le adiciono uno, sino creo la entrada con qty=1
  if (cookieCart[id]) {
    cookieCart[id]++
  } else {
    cookieCart[id] = 1
  }

  //ahora loa guardo
  setCookie('cart', JSON.stringify(cookieCart))
}

//remueve TODO el producto
export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  //Si existe le adiciono uno, sino creo la entrada con qty=1
  if (cookieCart[id]) {
    delete cookieCart[id]
  }

  //ahora loa guardo
  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  //Si NO existe o la qty === 0 no hago nada
  if (cookieCart[id] && cookieCart[id] > 0) {
    cookieCart[id]--
  }

  if (cookieCart[id] === 0) delete cookieCart[id] //si es 0 lo borro de la cookie

  //ahora loa guardo
  setCookie('cart', JSON.stringify(cookieCart))
}

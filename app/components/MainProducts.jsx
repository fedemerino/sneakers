import { db } from '../firebase/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import MainProduct from './MainProduct'

const colRef = collection(db, 'products')

async function getProducts() {
  const q = query (colRef, where('featured', '==', true))
  const querySnapshot = await getDocs(q)
  const response = querySnapshot.docs.map(doc => doc.data())
  return response.slice(0, 3)
}

export default async function MainProducts() {
  const products = await getProducts()
  return (
    <section>
      <div class="container">
        {products.map((product, index) => {
          return (
            <MainProduct product={product} index={index} isHome={true} />
          )
        })}
      </div>
    </section>

  )
}

/*
'use client'
import { db } from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import MainProduct from './MainProduct'
export default function MainProducts() {
  const [products, setProducts] = useState([])
  const colRef = collection(db, 'products')
  const getProducts = async () => {
    const data = await getDocs(colRef)
    const products = data.docs.map(doc => doc.data())
    setProducts(products.slice(0, 3))
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <section className="main-products">
      <div class="container">
        {products.map((product, index) => {
          return (
            <MainProduct product={product} index={index}/>
          )
        })}
      </div>
    </section>

  )
}*/ 
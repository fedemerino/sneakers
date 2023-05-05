'use client'
import { useState, useEffect } from 'react'
import { db } from "@/app/firebase/firebase"
import { collection, query, getDocs, where } from "firebase/firestore"
import All from '../all/All'
export default function Page() {
    const [response, setResponse] = useState()
    const colRef = collection(db, 'products')

    useEffect(() => {
        const getProducts = async () => {
          const q = query (colRef, where('featured', '==', true))
          const querySnapshot = await getDocs(q)
          const data = querySnapshot.docs.map(doc => doc.data())
          setResponse(data)
        }
        getProducts()
      }, [])
      
    return response ? <All response={response} /> :  <p>loading</p>
}
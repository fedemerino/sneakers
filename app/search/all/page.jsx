'use client'
import { useState, useEffect } from 'react'
import { db } from "@/app/firebase/firebase"
import { collection, getDocs } from "firebase/firestore"
import All from './All'

export default function Page() {
    const [response, setResponse] = useState()
    const colRef = collection(db, 'products')

    const getProducts = async () => {
        const data = await getDocs(colRef)
        const response = data.docs.map(doc => doc.data())
        setResponse(response)
    }

    useEffect(() => {
        getProducts()
    }, [])
    console.log(response)
    return response ? <All response={response} /> :  <p>loading</p>
}
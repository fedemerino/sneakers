'use client'
import { useState, useEffect } from 'react'
import { db } from "@/app/firebase/firebase"
import { collection, query, getDocs, where } from "firebase/firestore"

export default function ProductPage({ params }) {
    const { id } = params
    const [product, setProduct] = useState()
    const colRef = collection(db, 'products')
    useEffect(() => {
        const getProducts = async () => {
            const q = query(colRef, where('code', '==', id))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => doc.data())
            setProduct(data)
        }
        getProducts()
    }, [])
    console.log(product)

    return product ? <div className='flex justify-center items-center productSingleCardContainer'>
        <div className='productSingleCard flex flex-col'>
            <div className='imgColumn'>

            </div>
            <div className='infoColumn'>
                <p>{product[0].name}</p>
            </div>
        </div>
    </div>
        : <p> loading </p>
}
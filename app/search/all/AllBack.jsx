'use client'
import Link from "next/link"
import { db } from "@/app/firebase/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from 'react'
import Products from "./Products"

export default function Page() {
    const colRef = collection(db, 'products')
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const data = await getDocs(colRef)
        const response = data.docs.map(doc => doc.data())
        setProducts(response)
    }
    
    useEffect(() => {
        getProducts()
    }, [])

    products ? console.log(products) : console.log('loading')
    const handleLow = () => {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price)
        setProducts(sortedProducts)
    }

    const handleHigh = () => {
        const sortedProducts = [...products].sort((a, b) => b.price - a.price)
        setProducts(sortedProducts)
    }

    return (
        <main className="flex justify-center mainAll gap-5">
            <section>
                <ul>
                    <li className="text-zinc-400 hover:text-white">
                        <Link href="/search/all">
                            All
                        </Link>
                    </li>
                    <li className="text-zinc-400 hover:text-white">
                        <Link href="/search/arrivals">
                            New Arrivals
                        </Link>
                    </li>
                    <li className="text-zinc-400 hover:text-white cursor-pointer">
                        <Link href="/search/featured">
                            Featured
                        </Link>
                    </li>

                </ul>
            </section>
            <section className="productSection">
                <Products products={products} />
            </section>
            <section>
                <ul>
                    <li>
                        <p className="font-">
                            Relevance
                        </p>
                    </li>
                    <li className="text-zinc-400 hover:text-white cursor-pointer">
                        <p onClick={handleLow}>Price: Low to High</p>
                    </li>
                    <li className="text-zinc-400 hover:text-white cursor-pointer">
                        <p onClick={handleHigh}>Price: High to Low</p>
                    </li>
                </ul>

            </section>

        </main>
    )
}
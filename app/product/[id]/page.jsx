'use client'
import { useState, useEffect } from 'react'
import { db } from "@/app/firebase/firebase"
import { collection, query, getDocs, where } from "firebase/firestore"

export default function ProductPage({ params }) {
    const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']
    const { id } = params
    const [product, setProduct] = useState()
    const [initialImg, setInitialImg] = useState()
    const colRef = collection(db, 'products')
    useEffect(() => {
        const getProducts = async () => {
            const q = query(colRef, where('code', '==', id))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => doc.data())
            setProduct(data[0])
            setInitialImg(data[0].thumbnail[0])
        }
        getProducts()
    }, [])
    const handleImage = (index) => {
        setInitialImg(product.thumbnail[index])
    }
    console.log(product)
    return product ? <div className='flex justify-center items-center productSingleCardContainer'>
        <div className='flex'>
            <div className='imgColumn'>
                <div className='initialImgContainer flex justify-center items-center'>
                    <img src={initialImg} alt="" className='productSingleCardImg' />
                </div>
                <div className='flex gap-2'>
                    {product.thumbnail.map((img, index) =>
                        <div className='productImgSelectorContainer cursor-pointer flex justify-center items-center' onClick={() => handleImage(index)}>
                            <img src={img} alt="" className='productImgSelector' key={index} />
                        </div>
                    )}
                </div>
            </div>
            <div className='infoColumn'>
                <div className='flex  items-center'>
                    <p>{product.name}</p>
                </div>
                <div className='flex  items-center'>
                    <p>${product.price}</p>
                </div>
                <div className='flex  items-center justify-end'>
                    <p>Select Size (US)</p>
                </div>
                <div className='flex gap-1 sizeSelectorContainer'>
                    {sizes.map(size =>
                        <div className={`sizeSelector flex justify-center items-center cursor-pointer`}>
                            <p>{size}</p>
                        </div>
                    )}
                </div>
                    <button className='addToCartBtn mt-5'>
                        Add to Cart
                    </button>   
            </div>
        </div>
    </div>
        : <p> loading </p>
}
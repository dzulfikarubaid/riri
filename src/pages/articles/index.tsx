import Link from 'next/link'
import React from 'react'
import Navbar from './navbar'

function Articles() {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex flex-row px-24 py-10 gap-10'>
        <div className='flex flex-wrap w-1/2 gap-6'>
            <div className='flex flex-row justify-between'>
            <h1 className='text-xl font-semibold'>Artikel Terbaru</h1>
            <div>
                {/* sorting data */}
            </div>
            </div>
            <div className='bg-gray-100 p-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nobis atque quis minima ipsam dignissimos delectus vitae. Minus aliquam ex, amet voluptate optio corrupti repellendus recusandae asperiores ad nam corporis.
            </div>
            <div className='bg-gray-100 p-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nobis atque quis minima ipsam dignissimos delectus vitae. Minus aliquam ex, amet voluptate optio corrupti repellendus recusandae asperiores ad nam corporis.
            </div>
            <div className='bg-gray-100 p-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nobis atque quis minima ipsam dignissimos delectus vitae. Minus aliquam ex, amet voluptate optio corrupti repellendus recusandae asperiores ad nam corporis.
            </div>
            <div className='bg-gray-100 p-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nobis atque quis minima ipsam dignissimos delectus vitae. Minus aliquam ex, amet voluptate optio corrupti repellendus recusandae asperiores ad nam corporis.
            </div>
            </div>
            <div className='flex flex-wrap w-1/2'>
                
            </div>
        </div>
    </div>
  )
}

export default Articles
import React from 'react'
import Navbar from './components/Navbar'

function Index() {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex flex-col px-24 pt-10 justify-center'>
        <div className='flex flex-row gap-10 justify-center'>
        <h1 className='text-[50px] font-extrabold '>Indonesia&apos;s leading baby anthropometry service using image processing and artificial intelligence.</h1>
        <img className='w-[550px]' src="/homepic.png" alt="" />
        </div>
        </div>
    </div>
  )
}

export default Index
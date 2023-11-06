import React from 'react'
import Navbar from './components/Navbar'
import { useSession } from 'next-auth/react'

function Index() {
  const {data, update} = useSession()
  
  return (
    <div>
        <Navbar></Navbar>
        <h1>Signed as {data?.user?.name || ''}</h1>
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
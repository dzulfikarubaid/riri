import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Dropdown';

function MiniNavbar(props:any) {
    const {id} = props
    
  return (
    <div>
      <Navbar className='relative'></Navbar>
      <div className='flex flex-col gap-10 bg-white justify-center '>
        <div className='bg-white top-0 w-full shadow-lg self-center'>
        <div id={id} className='w-full px-4 py-4 flex flex-row gap-10 justify-center'>
            <Link href="#aeli" className='hover:text-blue-500'>Apa itu AELI?</Link>
            <Link href="#visi-misi" className='hover:text-blue-500'>Visi Misi</Link>
            <Link href="#sejarah" className='hover:text-blue-500'>Sejarah</Link>
            <Link href="#program" className='hover:text-blue-500'>Program</Link>
            <Link href="#sertifikasi" className='hover:text-blue-500'>Sertifikasi</Link>
        </div>
        <div className='w-full bg-blue-400 h-4'></div>
        </div>
        
    </div>
    </div>
    
  )
}

export default MiniNavbar
import Link from 'next/link'
import React from 'react'

function Navbar(props:any) {
    const {children} = props
  return (
    <div className='flex flex-col gap-10 bg-white justify-center '>
        <div className='bg-white fixed pt-24 top-0 w-full shadow-lg self-center'>
        <div className='w-full px-4 py-4 flex flex-row gap-10 justify-center'>
            <li><Link href="#aeli">Apa itu AELI?</Link></li>
            <li><a href="#visi-misi">Visi Misi</a></li>
            <li><a href="#sejarah">Sejarah</a></li>
            <li><a href="#program">Program</a></li>
            <li><Link href="#sertifikasi">Sertifikasi</Link></li>
        </div>
        <div className='w-full bg-blue-400 h-4'></div>
        </div>
        <div className='w-full pt-24'>
        {children}
        </div>
    </div>
  )
}

export default Navbar
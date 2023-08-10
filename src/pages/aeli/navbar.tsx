import Link from 'next/link'
import React from 'react'

function Navbar(props:any) {
    const {children} = props
  return (
    <div className='flex flex-row gap-10 p-4'>
        <div className='w-1/4'>
        <div className='w-1/4 p-4 fixed flex flex-col gap-5 '>
            <li><Link href="#aeli">Apa itu AELI?</Link></li>
            <li><a href="#visi-misi">Visi Misi</a></li>
            <li><a href="#sejarah">Sejarah</a></li>
            <li><a href="#program">Program</a></li>
            <li><Link href="#sertifikasi">Sertifikasi</Link></li>
        </div>
        </div>
        {children}
    </div>
  )
}

export default Navbar
import Link from 'next/link'
import React, { useState } from 'react'
import {FaPen, FaPenSquare, FaSearch, FaTimes} from 'react-icons/fa'
import {FaPenToSquare} from 'react-icons/fa6'
import { PiUserCircleLight } from 'react-icons/pi';
function Navbar(props:any) {
    const [isOpen, setIsOpen] = useState(false);
    const{value, onChange} = props
  return (
    <div className='flex flex-row justify-between items-center px-24 py-6'>
        <div className='bg-white text-black  w-full flex flex-row gap-3 items-center'>
            <Link href={'/'} className='font-semibold text-xl border-r-[1px] pr-3 border-black'>AELI</Link>
            <Link href={'/articles'}>Articles</Link>
        </div>
        <div className='flex flex-row gap-8 items-center'>
            
        {
            isOpen ?
            <div className='flex flex-row gap-3 rounded-full border-gray-500 bg-gray-100 border-[1px] p-2 pl-4 py-1 items-center'>
            <FaSearch color='gray'></FaSearch>
            <input value={value}
        onChange={onChange} className='focus:outline-none bg-transparent'  type="text" placeholder='Cari judul artikel...'  />
            <button onClick={() => setIsOpen(!isOpen)}><FaTimes color='gray'></FaTimes></button>
            </div>
            :
            <button onClick={() => setIsOpen(!isOpen)} className='flex flex-row gap-2 py-[5.5px] items-center '><FaSearch></FaSearch></button>
        }
        <Link href={'/articles/write'} className='flex flex-row items-center gap-2'>
            <FaPenToSquare></FaPenToSquare>
            
        </Link>
        <Link href={'/profile'}>
            <PiUserCircleLight size={25}/>
        </Link>
        </div>
    

    </div>
  )
}

export default Navbar

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiChevronDown, BiUser, BiUserCircle } from "react-icons/bi";
import {signIn, signOut, useSession} from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { FaCircleUser, FaRegCircleUser } from 'react-icons/fa6';
import {PiUserCircleLight} from 'react-icons/pi'
function Navbar(props:any){
  const {className} = props
  const {data}:any = useSession()
  
  const {push} = useRouter()
  function handleSignout(){
    signOut()
  }
    return(
      <div className=''>
        
        <div className={`${className}  flex justify-between flex-row w-full text-black  px-24  items-center `} >
            <Link href={'/'} className='font-extrabold text-2xl text-blue-500'>RIRI<span className='text-black'>.</span></Link>
            <div className={`flex flex-row gap-8 items-center text-black h-24`}>
              <Link className='hover:border-b-4 border-black' href={'/'}>Home</Link>
              <Link className='hover:border-b-4 border-black'  href="/dashboard">Dashboard</Link>
              <Link className='hover:border-b-4 border-black'  href="/service">Services</Link>
              <Link className=' hover:border-b-4 border-black'  href="/about">About Us</Link>
            </div>
            
            {/* <li><Link href="/signin" className={` py-2 px-3 ${!white ? 'text-black bg-white hover:bg-gray-100' : 'text-white bg-blue-500 hover:bg-blue-600'}`}>Sign In</Link></li> */}
            <div>
            {
              data ?
              <div className='flex flex-row gap-4 items-center'>
                <Link className={`text-black`} href={`/profile`}>{data.user.name}</Link>
                <button className={` py-2 px-3 bg-blue-500 text-white rounded-full`} onClick={handleSignout}>Sign Out</button>
              </div>
              :
              <button onClick={()=>signIn()}><PiUserCircleLight size={25}/></button>
            }
            </div>
        </div>
        
      </div>
        
        
    )
}
export default Navbar;
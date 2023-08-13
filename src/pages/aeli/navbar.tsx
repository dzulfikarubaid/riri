import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Dropdown';
import { button } from '@material-tailwind/react';

function MiniNavbar(props:any) {
    const {id} = props
    function handleScroll(target:string){
        if (typeof window !== 'undefined') {
          const element = document.getElementById(target);
          if (element) {
            const rect = element.getBoundingClientRect();
            const isAboveScrollBar = rect.top < 300; // Jika bagian atas elemen berada di atas scroll bar

            const offset = isAboveScrollBar ? 150 : 0;
            const y = rect.top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }

    }
    function Menu(props:any){
      
      const {target, children} = props
      return(
        <button className='hover:text-blue-500' onClick={()=>handleScroll(target)}>{children}</button>
      )
    }
  return (
    <div>
      <Navbar className='relative'></Navbar>
      <div className='flex flex-col gap-10 justify-center '>
        <div className='bg-white/30 backdrop-blur-lg top-0 w-full shadow-lg self-center'>
        <div id={id} className='w-full px-4 py-4 flex flex-row gap-10 justify-center'>
         
            <Menu target='aeli'>Apa itu AELI?</Menu>
            <Menu target='visi-misi'>Visi Misi</Menu>
            <Menu target='sejarah'>Sejarah</Menu>
            <Menu target='program'>Program</Menu>
            <Menu target='sertifikasi'>Sertifikasi</Menu>
            
        </div>
        <div className='w-full bg-blue-400 h-4'></div>
        </div>
        
    </div>
    </div>
    
  )
}

export default MiniNavbar
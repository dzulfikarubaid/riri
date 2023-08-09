import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import Navbar from './components/Dropdown'
import { useState,useEffect } from 'react'
import Headroom from 'react-headroom'
import "@/styles/leaflet.css";
import Footer from './Footer'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      
        <Navbar></Navbar>

      <div className='pb-20 pt-[88px]'>
      <Component {...pageProps} />
      </div>
      
      <Footer></Footer>
      
    </div>
      
    
  ) 
}

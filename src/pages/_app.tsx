import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from './components/Dropdown'
import { useState, useEffect } from 'react'
import Headroom from 'react-headroom'
import "@/styles/leaflet.css";
import Footer from './Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <div style={{ flex: 1, paddingBottom: '20px' }}>
        <Component {...pageProps} />
      </div>
      <Footer className='mt-10'/>
    </div>
  );
}

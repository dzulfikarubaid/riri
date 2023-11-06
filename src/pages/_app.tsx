import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Headroom from 'react-headroom'
import "@/styles/leaflet.css";

import {SessionProvider} from 'next-auth/react';
export default function App({ Component, pageProps:{ session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      
        <Component {...pageProps} />

      
    </SessionProvider>
  );
}


import Head from 'next/head'
import RootLayout from './layout'
import CountUp from 'react-countup';
import indonesiaSvg from './indonesia.svg'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import MySwiper from './MySwiper';
import { useState } from 'react';
import Table  from './dpd/Table';
import Map from '../components/Map';
import dynamic from 'next/dynamic';
import Navbar from './components/Dropdown';
import Footer from './Footer';
export default function Home() {
  const [dpd, setDPD] = useState(false)
  return (
    <>
    <Head>
      <title>Home - AELI</title>
    </Head>
    <Navbar></Navbar>
    <div className='flex flex-col gap-10 pt-20'>
    <div className='w-full h-fit bg-blue-500  px-10 py-20 text-white'>
      <MySwiper></MySwiper>
      
      
    </div>
    <div className='w-full h-fit bg-white px-10 text-blue-500 text-center'>
    <h1 className='font-bold text-[30px] mb-10'>AELI Dalam Angka</h1>
      <h1 className='font-semibold text-black text-xl'>Jumlah DPD AELI</h1>
      <CountUp end={15} duration={10} className='font-semibold  text-[50px]'/>
      <h1 className='font-semibold text-black text-xl'>Jumlah Anggota AELI</h1>
      <CountUp end={199} duration={20} className='font-semibold text-[50px]'></CountUp>
    </div>
    <div className='w-full h-fit bg-white px-10 text-center'>
    
    <h1 className='font-bold text-[30px] text-blue-500'>Peta Persebaran DPD AELI di Indonesia</h1>
    <Map></Map>
    <div className='flex flex-row justify-center gap-10 text-black mb-10'>
      <div className='flex flex-row gap-4 items-center'>
        <div className='w-[30px] h-[30px] bg-blue-500'></div>
      <h1>Provinsi yang telah terdaftar pada AELI</h1>
      </div>
      <div className='flex flex-row gap-4 items-center '>
      <div className='w-[30px] h-[30px] bg-gray-400 '></div>
      <h1>Provinsi yang belum terdaftar</h1>
      </div>
    </div>
    <button onClick={() => {setDPD(true)}} className={`py-2 px-2 bg-blue-500 text-white ${dpd ? 'hidden' : ''}`}>Lihat Semua Daftar DPD AELI</button>
    {
      dpd && <Table></Table>
    }
    </div>
    </div>
    <Footer></Footer>
   
    
    
    </>
  )
}

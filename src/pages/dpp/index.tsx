import dynamic from 'next/dynamic'
import React from 'react'
import Content from '../Content'
import Image from 'next/image'


const DynamicComponentWithNoSSR = dynamic(
  () => import('./OrgChart'),
  { ssr: false }
)


function dpp() {
  function Card(){
    return(
      <div className=' p-4 text-blue-500 flex flex-col gap-4 rounded-xl w-[250px] '>
        <Image width={250} height={250} src="/jobs.jpg" alt="" />
        <div className=''>
          <h1 >Steve Jobs</h1>
          <h1 className='text-black'>Chief Operational Officer</h1>
        </div>
      </div>
    )
  }
  return (
    <Content>
      <h1 className='font-bold text-center text-xl'>Struktur Organisasi</h1>
      <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
      <h1 className='font-bold text-center text-xl'>Daftar Dewan Pengurus Pusat</h1>
      
      <div className='flex flex-wrap w-full gap-10 justify-center'>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      </div>
    </Content>
  )
}

export default dpp

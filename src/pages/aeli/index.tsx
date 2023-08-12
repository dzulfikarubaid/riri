import React, { useEffect, useState } from 'react'
import Content from '../Content'
import NoNavbar from '../NoNavbar'
import MiniNavbar from './navbar'
import Headroom from 'react-headroom'
import Link from 'next/link'
import Image from 'next/image'

function Index() {
    function Title(props:any) {
        const{id,children} = props
        return(
            <h1 id={id} className='font-bold text-center text-xl p-10'>
        {children}</h1>
        )
    }
    const [fix, setFix] = useState(false)
    function setFixed(){
   
      if(window.scrollY > 120){
        setFix(true);
      }else{
        setFix(false);
      }
  
    
   
  }
  useEffect(()=>{
    window.addEventListener('scroll', setFixed);
  },[])
  return (
    
    <div id='top'>
      <Headroom downTolerance={1}>
      <MiniNavbar id='navbar'>
      </MiniNavbar>
      </Headroom>
      <NoNavbar>
      
      <Title id='aeli'>Asosiasi Experiential Learning Indonesia</Title>
        <p className='pt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quas nam impedit quam rerum, perferendis eligendi aliquid id quod consequatur cumque aspernatur, ut repellendus! Magni tenetur illum officiis consequuntur eius.</p>
        
        <Title id='visi-misi'>Visi Misi</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        <Title id='sejarah'>Sejarah</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        <Title id='program'>Program</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        <Title id='sertifikasi'>Sertifikasi</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        {
          fix &&
          <Link href="#top" scroll={false} className='bottom-8 w-10 fixed right-8 ease-in-out duration-700 animate-pulse'>
          <Image width={40} height={40} src="/backtop.png" alt="" />
        </Link>
        }
      </NoNavbar></div>
  )
}

export default Index
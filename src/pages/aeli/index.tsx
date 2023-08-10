import React from 'react'
import Navbar from './navbar'

function index() {
    function Title(props:any) {
        const{id,children} = props
        return(
            <h1 id={id} className='font-bold text-center text-xl p-10'>
        {children}</h1>
        )
    }
  return (
    <Navbar>
      <div className='w-full'>
      <Title id='aeli'>Asosiasi Experiental Learning Indonesia</Title>
        <p className='pt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quas nam impedit quam rerum, perferendis eligendi aliquid id quod consequatur cumque aspernatur, ut repellendus! Magni tenetur illum officiis consequuntur eius.</p>
        
        <Title id='visi-misi'>Visi Misi</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        <Title id='sejarah'>Sejarah</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        <Title id='program'>Program</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        <Title id='sertifikasi'>Sertifikasi</Title>
        <p className='pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
      </div>
        
    </Navbar>
  )
}

export default index
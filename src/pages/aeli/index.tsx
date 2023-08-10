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
        <p className='pt-48'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quas nam impedit quam rerum, perferendis eligendi aliquid id quod consequatur cumque aspernatur, ut repellendus! Magni tenetur illum officiis consequuntur eius.</p>
        <p className='pt-48'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius alias ut molestiae minima quaerat, dolorum perferendis consectetur quod ab illo laboriosam assumenda blanditiis dignissimos cupiditate distinctio saepe non quis ullam.</p>
        <Title id='visi-misi'>Visi Misi</Title>
        <Title id='sejarah'>Sejarah</Title>
        <Title id='program'>Program</Title>
        <Title id='sertifikasi'>Sertifikasi</Title>
      </div>
        
    </Navbar>
  )
}

export default index
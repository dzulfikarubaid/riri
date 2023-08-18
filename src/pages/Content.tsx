import React from 'react'
import Navbar from './components/Dropdown'
import Footer from './Footer'

function Content(props:any) {
    const {children, className} = props
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar></Navbar>
      <div className={`px-10 mt-24 ${className}`}>{children}</div>
      <Footer className='mt-10'/>
    </div>
    
  )
}

export default Content
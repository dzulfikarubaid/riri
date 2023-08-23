import React from 'react'
import Navbar from './components/Dropdown'
import Footer from './Footer'

function Content(props: any) {
  const { children, className } = props;
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
      <Navbar />
      <div className={`px-10 mt-32 ${className}`}>
        {children}
      </div>
      <Footer className='mt-10' />
    </div>
  )
}
export default Content
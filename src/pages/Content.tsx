import React from 'react'
import Navbar from './components/Dropdown'

function Content(props:any) {
    const {children, className} = props
  return (
    <div>
      <Navbar></Navbar>
      <div className={`px-10 mt-24 ${className}`}>{children}</div>
    </div>
    
  )
}

export default Content
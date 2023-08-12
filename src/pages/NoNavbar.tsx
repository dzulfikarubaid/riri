import React from 'react'

function NoNavbar(props:any) {
    const {children} = props

  return (
    <div className='p-10'>{children}</div>
  )
}

export default NoNavbar
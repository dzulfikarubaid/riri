import React from 'react'

function NoNavbar(props:any) {
    const {children, className} = props

  return (
    <div className={`p-10 ${className}`}>{children}</div>
  )
}

export default NoNavbar
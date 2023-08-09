import React from 'react'

function Content(props:any) {
    const {children, className} = props
  return (
    <div className={`p-10 ${className}`}>{children}</div>
  )
}

export default Content
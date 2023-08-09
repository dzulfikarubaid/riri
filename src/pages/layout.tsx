import {Poppins} from 'next/font/google'

import React from 'react'
const poppins = Poppins({
    subsets:['latin']
    ,
    weight:'400'
    , 
    variable: '--font-poppins'
})
function RootLayout({
    children
}:{
    children:React.ReactNode
}) {
  return (

        <div className={`${poppins.variable}`}>
            {children}
        </div>

  )
}

export default RootLayout
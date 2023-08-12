import React from 'react'
import dynamic from 'next/dynamic'
import Content from '../pages/Content'
import Image from 'next/image'


const DynamicComponentWithNoSSR = dynamic(
  () => import('./OrgChart'),
  { ssr: false }
)
function Dpp() {
  return (
    <Content>
      <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
    </Content>
  )
}

export default Dpp
import { useRouter } from "next/router";
import React from 'react'
import Content from "../Content";

function DetailNews() {
    const {query} = useRouter();
  return (
    <Content>
        <h1>
            {query.id}
        </h1>
    </Content>

  )
}

export default DetailNews
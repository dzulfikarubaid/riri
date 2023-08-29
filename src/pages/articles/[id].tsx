import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Content from "../Content";
import axios from "axios";

function DetailArticles() {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const {query} = useRouter();
    const [value, setValue] = useState([]);

  useEffect(() => {
    axios.get('/api/getarticles')
      .then((res) => {
        console.log(res.data.data);
        setValue(res.data.data);
        const selected:any= value.find((item:any) => item.id === query.id);
        setSelectedArticle(selected);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Content>
        <h1>
            {query.id}
        </h1>
    </Content>

  )
}

export default DetailArticles
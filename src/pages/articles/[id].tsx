import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Content from "../Content";
import axios from "axios";
import Navbar from "./navbar";
import { formatDistanceToNow } from 'date-fns';

interface DataItem {
  id: string,
  name: string,
  content: string,
  title: string,
  create_at: string
}

function DetailArticles() {
  const [selectedArticle, setSelectedArticle] = useState<DataItem | null>(null);
  const [value, setValue] = useState<DataItem[]>([]); // Adding state for all articles
  const { query } = useRouter();

  useEffect(() => {
    axios.get('/api/getarticles')
      .then((res) => {
        console.log(res.data.data);
        const articles: DataItem[] = res.data.data;
        setValue(articles); // Set all articles
        const selected: DataItem | undefined = articles.find(item => item.id === query.id);
        if (selected) {
          setSelectedArticle(selected);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query.id]);
  const formatTimeLeft = (createdAt: string) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const timeLeftMillis = createdAtDate.getTime() - now.getTime();
    const secondsLeft = Math.floor(timeLeftMillis / 1000);
    
    if (secondsLeft < 60) {
      return "Less than a minute left";
    } else if (secondsLeft < 3600) {
      const minutes = Math.floor(secondsLeft / 60);
      return `${minutes} ${minutes > 1 ? "minutes" : "minute"} left`;
    } else if (secondsLeft < 86400) {
      const hours = Math.floor(secondsLeft / 3600);
      return `${hours} ${hours > 1 ? "hours" : "hour"} left`;
    } else {
      return "More than a day left";
    }
  };
  return (
    <div >
      <Navbar></Navbar>
      <div className="flex flex-col justify-center items-center">
      {selectedArticle && (
        <div className="w-[700px]">
          <h1 className="font-extrabold text-[40px]">{selectedArticle.title}</h1>
          <h1>{selectedArticle.name}</h1>
          <h1>{formatTimeLeft(selectedArticle.create_at)}</h1>
          <div dangerouslySetInnerHTML={{ __html: selectedArticle.content}} />
        </div>
      )}
      </div>
      
    </div>
  )
}

export default DetailArticles

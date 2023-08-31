import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Content from "../Content";
import axios from "axios";
import Navbar from "./navbar";
import { formatDistanceToNow, parseISO } from 'date-fns';
import Link from "next/link";

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
    console.log(now)
    console.log(createdAtDate)
    const timeLeftMillis = now.getTime() - createdAtDate.getTime();
    console.log(timeLeftMillis)
    const secondsLeft = Math.floor(timeLeftMillis / 1000);
    
    if (secondsLeft < 60) {
      return "kurang dari 1 menit yang lalu";
    } else if (secondsLeft < 3600) {
      const minutes = Math.floor(secondsLeft / 60);
      return `${minutes} ${minutes > 1 ? "menit" : "menit"} yang lalu`;
    } else if (secondsLeft < 86400) {
      const hours = Math.floor(secondsLeft / 3600);
      return `${hours} ${hours > 1 ? "jam" : "jam"} yang lalu`;
    } else {
      return "lebih dari satu hari yang lalu";
    }
  };
  return (
    <div >
      <Navbar></Navbar>
      <div className="flex flex-col justify-center items-center">
      {selectedArticle && (
        <div className="w-[700px] flex flex-col gap-10">
          <h1 className="font-extrabold text-[40px]">{selectedArticle.title}</h1>
          <div>
          <Link className='hover:border-b hover:border-black' href={`/profile/${selectedArticle.name}`}>{selectedArticle.name}</Link>
          <h1>Diposting {formatTimeLeft(selectedArticle.create_at)}</h1>
          </div>
          <div dangerouslySetInnerHTML={{ __html: selectedArticle.content}} />
        </div>
      )}
      </div>
      
    </div>
  )
}

export default DetailArticles

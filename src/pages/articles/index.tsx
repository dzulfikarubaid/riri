import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Link from 'next/link';

function Articles() {
  const [value, setValue] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('/api/getarticles')
      .then((res) => {
        console.log(res.data.data);
        setValue(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // Filter data based on searchInput
    const filteredResults = value.filter(({ title }:any) =>
      title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchInput, value]);
  return (
    <div>
      <Navbar value={searchInput} onChange={(e:any) => setSearchInput(e.target.value)}/>
      <div className='flex flex-row px-24 py-10 gap-10'>
        <div className='flex flex-wrap w-1/2 gap-6'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-xl font-semibold'>Artikel Terbaru</h1>
            <div>
              
            </div>
          </div>
          <div className='flex flex-col w-[600px] gap-10'>
          {value.map((item: any, index) => (
            <Link href={`/articles/${item.id}`} className='bg-gray-100 p-4 flex flex-row gap-10' key={item.id}>
                <div>
                <h1>{item.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }} />
                <p>{item.name}</p>
                </div>
                <img src={item.image} alt="" />
            </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Articles;

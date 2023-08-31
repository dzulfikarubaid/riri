import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
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
            <div  key={item.id}>
              <Link href={`/articles/${item.id}`} className='bg-gray-100 p-4 flex flex-row justify-between'>
              <div>
                <h1 className='font-bold text-xl'>{item.title}</h1>
                <div className='text-md font-medium text-black' dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }} />
                
                </div>
                <img className='w-[100px] h-[100px]' src={item.image ? item.image : '/logo-aeli-putih.png'} alt="" />
              </Link>
                

                <Link className='hover:border-b hover:border-black' href={`/profile/${item.name}`}>{item.name}</Link>
            </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Articles;

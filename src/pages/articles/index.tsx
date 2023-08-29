import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Link from 'next/link';

function Articles() {
  const [value, setValue] = useState([]);

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

  return (
    <div>
      <Navbar />
      <div className='flex flex-row px-24 py-10 gap-10'>
        <div className='flex flex-wrap w-1/2 gap-6'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-xl font-semibold'>Artikel Terbaru</h1>
            <div>
              {/* sorting data */}
            </div>
          </div>
          <div className='bg-gray-100 p-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nobis atque quis minima ipsam dignissimos delectus vitae. Minus aliquam ex, amet voluptate optio corrupti repellendus recusandae asperiores ad nam corporis.
          </div>
          {value.map((item: any, index) => (
            <Link href={`/articles/${item.id}`} className='bg-gray-100 p-4' key={item.id}>
                <h1>{item.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }} />
                <p>{item.name}</p>
            </Link>
            ))}

        </div>
      </div>
    </div>
  );
}

export default Articles;

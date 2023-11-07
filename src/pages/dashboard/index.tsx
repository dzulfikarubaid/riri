import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { FaCalculator, FaHistory } from 'react-icons/fa';
import {TbRulerMeasure} from 'react-icons/tb'

const Sidebar = ({children}:any) => {
    const {data:session}:any = useSession()
    const {push, query} = useRouter()
    const [profileData, setProfileData] = React.useState({
      name: '',
      email: '',
      image: '',
    })
    const [imageBase64, setImageBase64] = React.useState<string | null>(null);
    useEffect(() => {
      if (session) {
        axios.get(`/api/getprofile/${session.user.id}`)
          .then((res) => {
            // Update profileData with data from the API response
            const responseData = res.data.data;
            setProfileData({
              name: responseData.name || '',
              email: responseData.email || '',
              image: responseData.image || '',
            });
            if(!responseData.image){
              setImageBase64('/avatar.png');
            } 
            else{
              setImageBase64(responseData.image)
            }
          })
          .catch((error) => {
            console.error('Error fetching profile data:', error);
          });
      }
    }, [session]);
    function handleSignout(){
        signOut()
        }
        
       

  return (
    <>

      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className="flex items-center p-2 py-0 text-gray-900 rounded-lg dark:text-white  group">
                <h1 className='font-bold text-blue-500 text-xl'>RIRI.</h1>

              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 py-0 text-gray-900 rounded-lg dark:text-white  group">
                <h1 className='flex-1 whitespace-nowrap'>Dashboard</h1>
              </a>
            </li>
            <li>
              <Link href="/dashboard/pengukuran" className="flex mt-6 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <TbRulerMeasure></TbRulerMeasure>
                <span className="flex-1 ml-3 whitespace-nowrap">Pengukuran</span>
               
              </Link>
            </li>
            <li>
            <Link href="/dashboard/riwayat" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaHistory></FaHistory>
                <span className="flex-1 ml-3 whitespace-nowrap">Riwayat</span>
                
              </Link>
            </li>
           
     
            <li>
              <button onClick={handleSignout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
           
          </ul>
        </div>
      </aside>

      <div className=" sm:ml-64">
        <div className="">
            <div className=' w-full  flex flex-row-reverse justify-between p-6 items-center '>
                <Link href={'/profile'} className='flex flex-row items-center gap-4'>
                <h1>{session && session.user.name}</h1>
                <img className='w-10 rounded-xl border-2' src={String(imageBase64)} alt="" />
                </Link>
                
            </div>
            <div className='p-8'>
            {children}
            </div>
        </div>
      </div>

    </>
  );
};


export default Sidebar
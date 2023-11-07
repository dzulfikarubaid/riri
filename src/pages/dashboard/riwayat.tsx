import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Sidebar from '.';
import moment from 'moment'
const Riwayat = () => {
  const {data:session}:any = useSession()
  const [userData, setUserData] = React.useState<any>('')
  useEffect(() => {
    if (session) {
      axios.get(`/api/getmeasurements/`)
        .then((res) => {
          // Update profileData with data from the API response
          const responseData = res.data.data;
          const filteredData = responseData.filter((data:any) => data.email === session.user.email)
          setUserData(filteredData);
          console.log(filteredData)
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, [session]);
  return (
    <Sidebar>
      <h1>Riwayat Pengukuran</h1>
      <div className='flex flex-col gap-3 mt-8'>
        {userData && userData.map((data:any) => (
          <div key={data.id} className='border-2 rounded-3xl p-4'>
            <h1>{moment.unix(data.id).format('YYYY-MM-DD HH:mm:ss A')}</h1>
            <h1>Panjang bayi: {data.baby_length}</h1>
            <h1>Panjang lengan: {data.hand_length}</h1>
            <h1>Panjang kaki: {data.foot_length}</h1>
          </div>
        ))}
      </div>
    </Sidebar>
  )
}

export default Riwayat
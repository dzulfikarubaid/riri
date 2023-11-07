import React, { useEffect } from 'react'
import Sidebar from './index'
import axios from 'axios';
import { useSession } from 'next-auth/react';
const Pengukuran = () => {
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
        <div>
          <h1>Pengukuran</h1>
          <div>
            <h1></h1>
          </div>
        </div>
    </Sidebar>
  )
}

export default Pengukuran
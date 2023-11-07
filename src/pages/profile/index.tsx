import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { BiUserCircle } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { addDoc, collection, setDoc, doc, getFirestore } from 'firebase/firestore'
import { db } from '@/lib/firebase/init';
import { useRouter } from 'next/router';

function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data:session, update }: any = useSession();
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    image: session?.user?.image || '',
  });

  const [image, setImage] = useState<File | null>(null); // State untuk gambar yang akan diunggah
  const [imageBase64, setImageBase64] = useState<string | null>(null); // State untuk gambar dalam format base64

  useEffect(() => {
    if (image) {
      // Mengonversi gambar menjadi base64 ketika gambar berubah
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setImageBase64(base64Data);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

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
          setImageBase64(responseData.image || '');
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, [session]);

  const handleSubmit = async () => {
    setLoading(true);

    // Buat objek FormData untuk mengirim data profil dan gambar
    const formData = {
      id: session?.user?.id,
      name: profileData.name,
      email: profileData.email,
      image: String(imageBase64) || '',
    };
    await update(
      {
        ...session,
        user: {
          ...session?.user,
          name: profileData.name,
          email: profileData.email,
 
        },
      }
    )

      await axios.put(`/api/updateprofile/${session?.user?.id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        setLoading(false);
        history.back()
        
        
        
     
      })
      .catch((error) => {
        console.error('Error updating profile data:', error);
        alert("data gagal diubah")
        setLoading(false);
      })

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Menangani perubahan pada input gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage: any = e.target.files?.[0];
    setImage(selectedImage);
  };
  const char = profileData.name

  return (
    <div className="flex justify-center p-10 w-full items-center flex-col">
      {/* <h1 className='my-10'>Change Profile</h1> */}
      {session && (
        <div className="flex flex-col gap-4 w-[500px]" >
          <div className=' w-full justify-center items-center flex'>
            <div
              className="bg-gray-100 p-2 border-2 focus:outline-none h-[100px] w-[100px] rounded-3xl flex justify-center bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${
                  imageBase64 || 'avatar.png'
                })`,
              }}
            >
              <MdOutlineAddPhotoAlternate className='absolute -right-2 -bottom-2'></MdOutlineAddPhotoAlternate>
              <input
                className=' w-full h-full opacity-0 cursor-pointer'
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              ></input>

            </div>
          </div>



          <label>Nama Lengkap</label>
          <input
            className='bg-gray-100 rounded-xl p-2 focus:outline-none'
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
          <label>Email</label>
          <input
            className='bg-gray-100 rounded-xl p-2 focus:outline-none'
            type="text"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
          {
            !loading ?
            <button onClick={handleSubmit} className='w-full bg-blue-900 text-white rounded-xl py-2'>Simpan</button>
            :
            <button disabled className='w-full bg-blue-900 text-white rounded-xl py-2'>Loading...</button>
          }
        </div>
      )}
    </div>
  );
}

export default Profile;

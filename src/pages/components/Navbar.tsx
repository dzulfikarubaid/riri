import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PiUserCircleLight } from 'react-icons/pi';

// Define a type for user data
type UserData = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

function Navbar(props: any) {
  const { className } = props;
  const { data, status } = useSession();
  const { push } = useRouter();

  // Use the defined type for user data
  const [user, setUser] = useState<UserData | null>(null);

  function handleSignout() {
    signOut();
  }

  useEffect(() => {
    // Set the user state when the session changes
    console.log('Data from session:', data);

    if (status === 'authenticated') {
      // Use the optional chaining operator to safely access nested properties
      setUser((prevUser) => ({
        ...prevUser,
        name: data?.user?.name || null,
      }));
    } else {
      setUser(null);
    }
  }, [data, status]);

  return (
    <div>
      <div className={`${className}  flex justify-between flex-row w-full text-black  px-24  items-center `} >
        <Link href={'/'} className='font-extrabold text-2xl text-blue-500'>RIRI<span className='text-black'>.</span></Link>
        <div className={`flex flex-row gap-8 items-center text-black h-24`}>
          <Link className='hover:border-b-4 border-black' href={'/'}>Home</Link>
          <Link className='hover:border-b-4 border-black'  href="/dashboard">Dashboard</Link>
          <Link className='hover:border-b-4 border-black'  href="/service">Services</Link>
          <Link className='hover:border-b-4 border-black'  href="/about">About Us</Link>
        </div>
        <div>
          {user ? (
            <div className='flex flex-row gap-4 items-center'>
              <Link className={`text-black`} href={`/profile`}>{user.name}</Link>
              <button className={`py-2 px-3 bg-blue-500 text-white rounded-full`} onClick={handleSignout}>Sign Out</button>
            </div>
          ) : (
            <button onClick={() => signIn()}><PiUserCircleLight size={25}/></button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

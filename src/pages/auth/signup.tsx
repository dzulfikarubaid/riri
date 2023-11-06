import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '@/lib/firebase/service'
function Signup() {
    const [loading, setLoading] = useState(false)
    const {push} = useRouter()
    const [error, setError] = useState("")
    async function handleSubmit(e:any){
        e.preventDefault()
        setLoading(true)
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            c_password: e.target.c_password.value
        }
        const result = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),

        })
        
        if(result.status === 200){
            await addDoc(collection(firestore, 'users'), data).then(() => {
                console.log('data added')
            })
            setLoading(false)
            // e.target.reset()
            push('/auth/signin')
        }
        else {
            setLoading(false);
            const errorResponse = await result.json();
            if (errorResponse && errorResponse.message) {
              setError(errorResponse.message);
            } else {
              setError('Terjadi kesalahan'); 
            }
          }
    }
    function Input(props:any){
        const {type, name, placeholder, label} = props
        return(
            <div className='flex flex-col gap-2  '>
                <label htmlFor={name}>{label}</label>
                <input className='border-solid border-b-[1px] border-black focus:outline-none focus:border-blue-500' type={type} name={name} id={name} placeholder={placeholder}/>
            </div>
        )
    }
  return (
    <div className='bg-gray-100 flex flex-col h-full'>
        <Link href={"/"} className='bg-white text-black  w-full flex flex-row px-24 py-4 gap-3 items-center'>
            <h1 className='font-semibold text-xl border-r-[1px] px-3 border-black'>RIRI</h1>
            <h1>Accounts</h1>
        </Link>
        <div className='h-screen flex justify-center items-center my-12 '>
        <form onSubmit={handleSubmit}  className='flex flex-col justify-center items-center gap-6 py-16 rounded-xl bg-white px-20'>
            <h1 className='font-bold text-xl'>Registrasi dengan email</h1>
            {
                error && <p className='text-red-500 text-center max-w-[300px]'>{error}</p>
            }
            
            <Input 
            type='text' 
            name='name'
            label='Nama' 
            placeholder='Masukan nama anda'
            ></Input>
            <Input type='email' name='email'
            label='Email'
            placeholder='Masukkan email anda'></Input>
            <Input 
            label='Password'
            type='password' name='password' placeholder='Masukkan Password'></Input>
            <Input 
            label='Konfirmasi Password'
            type='password' name='c_password' placeholder='Masukkan Konfirmasi Password'></Input>
            <button type='submit' className='bg-black rounded-xl p-2 px-3 hover:bg-blue-300 text-white w-full'>{loading ? "Loading..." : "Sign Up"}</button>

            <p>Sudah punya akun? <Link href="/auth/signin" className='text-blue-500 hover:underline' >Masuk</Link></p>
        </form>

        </div>
        
    </div>
  )
}

export default Signup
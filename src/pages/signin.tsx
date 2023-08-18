import React from 'react'
import Link from 'next/link'

function Signin() {
    function Input(props:any){
        const {type, name, placeholder} = props
        return(
            <div className='flex flex-col gap-2  '>
                <label htmlFor={name}>{name}</label>
                <input className='border-solid border-b-[1px] border-black focus:outline-none focus:border-blue-500' type={type} name={name} placeholder={placeholder}/>
            </div>
        )
    }
  return (
    <div className='bg-gray-100 flex flex-col h-full'>
        <Link href="/" className='bg-white text-black  w-full flex flex-row px-24 py-4 gap-3 items-center'>
            <h1 className='font-semibold text-xl border-r-[1px] px-3 border-black'>AELI</h1>
            <h1>Asosiasi Experiential Learning Indonesia</h1>
        </Link>
        <div className='h-screen flex justify-center items-center'>
        <form action="" className='flex flex-col justify-center items-center gap-6 py-16 rounded-xl bg-white px-20'>
            <h1 className='font-bold text-xl'>Masuk dengan email</h1>
            <Input type='email' name='Email' placeholder='Masukan email anda'></Input>
            <Input type='password' name='Password' placeholder='Masukkan Password'></Input>
            <button className='bg-black rounded-xl p-2 px-3 hover:bg-blue-300 text-white w-full'>Sign In</button>
            <p>Belum punya akun? <Link className='text-blue-500 hover:underline' href="/signup">Daftar di sini</Link></p>
        </form>

        </div>
        
    </div>
  )
}

export default Signin
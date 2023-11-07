import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

function Signin() {
    const [loading, setLoading] = useState(false)
    const {push, query} = useRouter()
    const [error, setError] = useState("")
    const [email, setEmail]  = useState("")
    const [password, setPassword]  = useState("")
    const callbackUrl:any = query.callbackUrl || "/"
    async function handleSubmit(e:any){
        e.preventDefault()
        setLoading(true)
        const data = {
            
        }
        try{
            const res = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: callbackUrl
            })
            if(!res?.error){
                setLoading(false)
                push('/dashboard')
            }
            else{
                console.log(res)
                setLoading(false)
                setError("Email atau password salah")
            }
        }
        catch(err:any){
            console.log(err)
            setError("Email atau password salah")
        }
    }
    function Input(props:any){
        const {type, name, placeholder, label} = props
        return(
            <div className='flex flex-col gap-2  '>
                <label htmlFor={name}>{label}</label>
                <input className='border-solid border-b-[1px] border-black focus:outline-none focus:border-blue-500' type={type} name={name} placeholder={placeholder} id={name}/>
            </div>
        )
    }
  return (
    <div className='bg-gray-100 flex flex-col h-full'>
        <Link href="/" className='bg-white text-black  w-full flex flex-row px-24 py-4 gap-3 items-center'>
            <h1 className='font-semibold text-xl border-r-[1px] px-3 border-black'>RIRI</h1>
            <h1>Accounts</h1>
        </Link>
        <div className='h-screen flex justify-center items-center'>
        <form  className='flex flex-col justify-center items-center gap-6 py-16 rounded-xl bg-white px-20'>
            <h1 className='font-bold text-xl'>Masuk dengan email</h1>
            {
                error && <p className='text-red-500 text-center max-w-[300px]'>{error}</p>
            }
            <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input
            className='border-solid border-b-[1px] border-black focus:outline-none focus:border-blue-500'
            type='email' name='email' placeholder='Masukkan email anda' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <label htmlFor="password">Password</label>
            <input
            className='border-solid border-b-[1px] border-black focus:outline-none focus:border-blue-500'
            type='password' name='password' placeholder='Masukkan Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <button onClick={handleSubmit} className='bg-black rounded-xl p-2 px-3 hover:bg-blue-300 text-white w-full'>{
                loading ? "Loading..." : "Sign In"
            }</button>
            <p>Belum punya akun? <Link className='text-blue-500 hover:underline' href="/auth/signup">Daftar di sini</Link></p>
        </form>

        </div>
        
    </div>
  )
}

export default Signin
import React from 'react'
import Content from '../Content'
import Image from 'next/image'
import Dpp from '../../dpp'
import Link from 'next/link'

const pengurus = [
    {
        nama: "NURFAHMI",
        jabatan: "Ketua Umum",
        foto: "/avatar-blue.png"

    },
    {
        nama: "JEPIH NURHADI",
        jabatan: "Bendahara Umum",
        foto: "/avatar-blue.png"
    },
    {
        nama: "GIGIH GESANG",
        jabatan: "Sekretaris Jenderal",
        foto: "/avatar-blue.png"
    },
    {
        nama: "NURSANTI ADJI",
        jabatan: "Kepala BidangKesekretariatan",
        foto: "/avatar-blue.png"
    },
    {
        nama: "UNANG RUSNADI",
        jabatan: "Kepala Bidang Keanggotaan",
        foto: "/avatar-blue.png"
    },
    {
        nama: "DIAN WIBOWO",
        jabatan: "Kepala Bidang Keorganisasian",
        foto: "/avatar-blue.png"
    },
    {
        nama: "ADI WALUYO",
        jabatan: "Kepala Bidang Penelitian dan Pengembangan",
        foto: "/avatar-blue.png"
    },
    {
        nama: "ARDIAN RANGGA F",
        jabatan: "Kepala Bidang Pendidikan dan Pelatihan",
        foto: "/avatar-blue.png"
    },
    {
        nama:"D.P. ARSA",
        jabatan: "Kepala Bidang Sertifikasi dan Akreditasi",
        foto: "/avatar-blue.png"
    },
    {
        nama: "SOFIYAN HADI",
        jabatan: "Kepala Bidang Komunikasi Publik",
        foto: "/avatar-blue.png"
    },
    {
        nama: "DENY NUR ALAM",
        jabatan: "Kepala Bidang Hubungan Pemerintah",
        foto: "/avatar-blue.png"
    },
    {
        nama: "HERIYANTO",
        jabatan: "Kepala Bidang Hubungan Pemerintah",
        foto: "/avatar-blue.png"
    },
    {
        nama: "DENY NUR ALAM",
        jabatan: "Kepala Bidang Hubungan Internasional",
        foto: "/avatar-blue.png"
    },
    {
        nama: "DWIKI PRAYOGA MENZANO",
        jabatan: "Kepala Bidang Hubungan Pasar dan Mitra",
        foto: "/avatar-blue.png"
    },
    
]
function dpp() {
    function Card(props:any){
        const {nama, jabatan, foto, key} = props
        const formattedNama = nama
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

        const namaUrl = nama.toLowerCase().replace(/\s+/g, '-');
      return(
        <Link href={`/dpp/${namaUrl}`} key={key}>
        <div  className=' p-4 text-blue-500 flex flex-col gap-4 rounded-xl w-[250px] '>
          <Image width={200} height={200} src={foto} alt="" />
          <div className=''>
            <h1 >{formattedNama}</h1>
            <h1 className='text-black'>{jabatan}</h1>
          </div>
        </div>
        </Link>
      )
    }
    return (
      <Content>
        <div className=''>
        <h1 className='font-bold text-center text-xl'>Daftar Dewan Pengurus Pusat</h1>
        <div className='flex flex-wrap w-full gap-10 justify-center py-10'>
        {pengurus.map((item, index) => (
          <Card {...item} key={index}></Card>
        ))}
        </div>
        </div>
      </Content>
    )
  }
  
  export default dpp
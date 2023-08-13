import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: boolean,
    statusCode: number,
    data:{
    nama: string,
    alamat: string,
    telp: string,
    email: string,
    
    }[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
    
){
    const data = [
        {
          nama: "Bali",
          alamat: "Warung Petualang Jl. Bedugul 29, Sidakarya Denpasar",
          telp: '08525336363',
          email: "bali@aeli.or.id",
          gmaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.9422026638813!2d115.2270780341101!3d-8.697038977933927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2410504104b01%3A0xc133d5507ca6a660!2sJl.%20Bedugul%20No.29%2C%20Sidakarya%2C%20Denpasar%20Selatan%2C%20Kota%20Denpasar%2C%20Bali%2080224!5e0!3m2!1sid!2sid!4v1691849413328!5m2!1sid!2sid" 
        },
        {
          nama: "Jawa Timur",
          alamat: "The Mezzanine Jalan Nginden Semolo 34 - 40 kav A-11. Surabaya",
          telp: 'Telp. (031) 5967476. Fax. (031) 5926297. Mobile. 081233177758',
          email: " jatim@aeli.or.id",
          gmaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.480562308061!2d112.7658618104703!3d-7.299780357115913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa5375f7e063%3A0xa0b356e3743c4cfc!2sMezzanine!5e0!3m2!1sid!2sid!4v1691849742846!5m2!1sid!2sid" 
        },
        {
          nama: "DKI Jakarta",
          alamat: "Jl. Kebon Jeruk No. 1, Jakarta Barat",
          telp: 'Telp. (021) 567-8888. Fax. (021) 567-9999. Mobile. 08123456789',
          email: "jakarta@aeli.or.id",
        },
        {
          nama:"Jawa Barat",
          alamat:"Rumah Solusi Jalan Bukit Pakar Timur IV Kav. B1, Ciburial, Cimenyan, Kabupaten Bandung",
          telp: '',
          email:'jabar@aeli.or.id',
        },
        {
          nama:"Jawa Tengah",
          alamat:"Jalan Demak Bintoro I No. 10. Distrikan Nusukan Solo",
          telp:'(62-271) 718883',
          email:'jateng@aeli.or.id',
        },
        {
          nama:"DI Yogyakarta",
          alamat:"Jalan Magelang km 5, Gedongan RT 03 / RW 04. Sinduadi, Mlati Sleman",
          telp:'0817269836',
          email:'diy@aeli.or.id'
        }
        
      ];
    res.status(200).json({status:true,statusCode:200, data})
}
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
          email: " bali@aeli.or.id",
        },
        {
          nama: "Nusa Tenggara Barat",
          alamat: "Warung Petualang Jl. Bedugul 29, Sidakarya Denpasar",
          telp: '08525336363',
          email: " jatim@aeli.or.id",
        },
        
      ];
    res.status(200).json({status:true,statusCode:200, data})
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getData} from '@/lib/firebase/service'
type Data = {
  data:any,
  status:boolean,
  statusCode:number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const data = await getData('test/double')
  res.status(200).json({ data, status: true, statusCode: 200 })
}

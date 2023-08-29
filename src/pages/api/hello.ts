// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveData } from '@/lib/firebase/service'
type Data = {
  data:any,
  status:boolean,
  statusCode:number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await retrieveData("users")
  res.status(200).json({ data, status: true, statusCode: 200 })
}

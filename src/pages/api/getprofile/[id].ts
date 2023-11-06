// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { retrieveData } from '@/lib/firebase/service'

type Data = {
  data: any,
  status: boolean,
  statusCode: number,
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

  const { id }: any = req.query;
  const userData = await retrieveData("users");

  // Find the user with the specified ID
  const user = userData.find((user: any) => user.id === id);

  if (user) {
    res.status(200).json({ data: user, status: true, statusCode: 200 });
  } else {
    res.status(404).json({ data: null, status: false, statusCode: 404 });
  }
}

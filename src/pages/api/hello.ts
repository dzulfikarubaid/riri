// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { retrieveData } from '@/lib/firebase/service'
// type Data = {
//   name: string,
//   email: string,
//   message:string,
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   try {
//     const data = await retrieveData('users') // Make sure retrieveData is asynchronous
//     res.status(200).json(data) // Sending the retrieved data directly
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// }

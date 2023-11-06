import type { NextApiRequest, NextApiResponse } from 'next';
import { updateData } from "@/lib/firebase/service";

type Data = {
  status: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'PUT') {
    const { id }:any = req.query; // Extract the id from query parameters
    const userData = req.body; // Extract user data from the request body

    // Call updateData with the correct argument order
    updateData(
      { id, ...userData },
      ({ status, message }: { status: boolean; message: string }) => {
        if (status) {
          res.status(200).json({ status, message });
        } else {
          res.status(400).json({ status, message });
        }
      },
      id // pass id as the third argument
    );
  } else {
    res.status(405).json({ status: false, message: 'Method not allowed' });
  }
}

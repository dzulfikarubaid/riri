import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
 
const TABLE_HEAD = ["Nama Cabang", "Alamat", "Nomor Telepon", "Email"];
 
export default function Table() {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/data_dpd/')
    .then(res => res.json())
    .then(res => {
      setData(res.data)
      console.log(res.data)
    })
  })
  return (
    <Card className="w-full h-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ nama, alamat, telp, email }, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const url = 'dpd/indonesia-'+nama.toLowerCase().replace(/\s+/g, "")
            return (
              <tr key={url}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    <Link href={url} className="text-blue-500">{nama}</Link>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {alamat}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {telp}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {email}
                  </Typography>
                </td>
                
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
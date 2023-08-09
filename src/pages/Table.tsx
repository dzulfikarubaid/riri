import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
 
const TABLE_HEAD = ["Nama Cabang", "Alamat", "Nomor Telepon", "Email"];
 
const TABLE_ROWS = [
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
 
export default function Table() {
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
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ nama, alamat, telp, email }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const url = 'dpd/indonesia-'+nama.toLowerCase().replace(/\s+/g, "")
            return (
              <tr key={nama}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    <Link href={url} >{nama}</Link>
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
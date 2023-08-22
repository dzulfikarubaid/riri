
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Nama Cabang", "Alamat", "Nomor Telepon", "Email"];

export default function Table() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://api-aeli.vercel.app/dpd_list/")
      .then((res) => {
        setLoading(false);
        setData(res.data);
        setFilteredData(res.data); // Initialize filteredData with all data
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter data based on searchInput
    const filteredResults = data.filter(({ nama }) =>
      nama.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchInput, data]);

  return (
    <div className="w-full">
      <Card className="relative h-full overflow-scroll p-4">
      <input
        type="text"
        placeholder="Cari nama cabang..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="p-2 border rounded-xl mb-4 w-[400px] focus:outline-none self-end"
      />
      {loading ? (
        <div>Memuat data...</div>
      ) : (
        <table className="w-[400px] min-w-max table-auto text-left">
          <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 py-4">
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
            {filteredData.map(({ nama, alamat, telp, email }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "py-4" : "py-4 pr-2 border-b border-blue-gray-50";
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
                  
                  
                </tr>)
            })}
          </tbody>
        </table>
      )}
    </Card>

    </div>
    
  );
}


import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const TABLE_HEAD = ["Nama Cabang","Kontak", "Email"];

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
      <Card className="relative h-full overflow-scroll p-4 w-full">
      <div className='flex flex-row gap-3 rounded-full border-gray-500 bg-gray-100 border-[1px] p-2 pl-4 py-1 items-center w-[400px] self-end mb-10'>
      <FaSearch color='gray'></FaSearch>
      <input type="text" 
        placeholder="Cari nama cabang..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} className='focus:outline-none bg-transparent' />
      </div>
      {loading ? (
        <div>Memuat data...</div>
      ) : (
        <table className="w-full table-auto text-left">
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
            {filteredData.map(({ nama, contact, email }, index) => {
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
                      {contact}
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

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Content from "../Content";
import axios from "axios";
import { statesData } from "@/components/Map/data";
import Head  from "next/head";
import Map from "@/components/Map";
import Calendar from "react-calendar";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface DataItem {
  nama: string,
  alamat: string,
  contact: string,
  email: string,
  gmaps:string,
}

const DetailDPD = () => {
  const { query } = useRouter();
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const filteredFeatures = statesData.features.filter(
    feature => feature.properties?.slug === query.id
  );
  useEffect(() => {
    axios.get('https://api-aeli.vercel.app/dpd_list/')
      .then((res) => {
        setData(res.data);
        setLoading(false);
        // Filter data based on query.id
        const filtered = res.data.filter((item: DataItem) =>
          'indonesia-'+item.nama.toLowerCase().replace(/\s+/g, "") === query.id
        )
        
        setFilteredData(filtered);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
        setLoading(false);

      })
  }, [query.id]);

  if (filteredFeatures.length === 0) {
    // Handle the case where no matching feature is found
    return <div>No matching feature found for {query.id}</div>;
  }

  const firstFeature = filteredFeatures[0];

  if (!firstFeature.properties || !firstFeature.properties.state) {
    // Handle the case where properties or state doesn't exist
    return <div>Invalid feature data</div>;
  }

  const stateName = firstFeature.properties.state;
  return (
    <div>
      <Content>
        {
          
          loading ? <div>Memuat data...</div>
          :
          filteredData.length > 0 ? 
            filteredData.map((item: DataItem) => (
            <div key={item.nama}>
              <Head>
                <title>DPD {item.nama.toUpperCase()}</title>
              </Head>
              
              <Map targetState={stateName}></Map>
              <p className="w-full text-center p-6 py-4 bg-blue-400 text-white">DPD {item.nama}</p>
              <div className="flex flex-row pt-10 gap-10">
              
              <iframe src={item.gmaps} ></iframe>
              <div className="flex flex-col gap-2">
                
                <p className="w-[100px] font-semibold">Alamat :</p>
                <p className="">{item.alamat}</p>

                <p className="w-[100px] font-semibold">Kontak :</p>
                <p className="">{item.contact}</p>

                <p className="w-[100px] font-semibold">Email :</p>
                <p className="">{item.email}</p>

              
              
              </div>
              <div className="flex flex-col gap-20">
              <Calendar></Calendar>
              
              </div>
              </div>
              <div className="mt-10 flex flex-col justify-center items-center">
              <Link target="_blank" className="flex items-center justify-center flex-row gap-4 w-fit text-center p-6 py-2 rounded-xl bg-black text-white" href={`https://api.whatsapp.com/send?phone=62${item.contact.slice(1)}`}>
                <h1>HUBUNGI DPD {item.nama.toUpperCase()}</h1>
                <FaWhatsapp size={30}></FaWhatsapp>
              </Link>
              
                
              </div>
          
            </div>
             
          )) 
          :
          <div>DPD AELI pada provinsi {stateName} belum tersedia</div>
        }
    </Content>
    </div>
  );
};

export default DetailDPD;

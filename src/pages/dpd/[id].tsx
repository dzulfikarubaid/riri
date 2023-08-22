import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Content from "../Content";
import axios from "axios";
import { statesData } from "@/components/Map/data";
import Head  from "next/head";
import Map from "@/components/Map";

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
          filteredData.length > 0 ? filteredData.map((item: DataItem) => (
            <div key={item.nama}>
              <Head>
                <title>DPD {item.nama.toUpperCase()}</title>
              </Head>
              
              <Map targetState={stateName}></Map>
              <p className="w-full text-center p-6 py-4 bg-blue-400 text-white">DPD {item.nama}</p>
              <div className="flex flex-row pt-10 gap-10">
              
              <iframe src={item.gmaps} ></iframe>
              <div className="flex flex-row gap-6">
                <div>
                  <p>Alamat</p>
                  <p>Kontak</p>
                  <p>Email</p>
                </div>
                <div>
                <p>: {item.alamat}</p>
                <p>: {item.contact}</p>
                <p>: {item.email}</p>
                </div>
              
              </div>
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

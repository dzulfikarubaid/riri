import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Content from "../Content";
import { statesData } from "@/components/Map/data";
import Iframe from "react-iframe";

interface DataItem {
  nama: string,
    alamat: string,
    telp: string,
    email: string,
    gmaps:string,
}

const DetailDPD = () => {
  const { query } = useRouter();
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const filteredFeatures = statesData.features.filter(
    feature => feature.properties?.slug === query.id
  );
  useEffect(() => {
    fetch('/api/data_dpd/')
      .then(res => res.json())
      .then(res => {
        setData(res.data);
        console.log(res.data);

        // Filter data based on query.id
        const filtered = res.data.filter((item: DataItem) =>
          'indonesia-'+item.nama.toLowerCase().replace(/\s+/g, "") === query.id
        )
        setFilteredData(filtered);
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
        filteredData.length > 0 ? filteredData.map((item: DataItem) => (
          <div key={item.nama}>
            <p>{item.nama}</p>
            <p>{item.alamat}</p>
            <p>{item.telp}</p>
            <p>{item.email}</p>
            <iframe src={item.gmaps} ></iframe>
        
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

import { useRouter } from "next/router";
import  statesData  from "../data";

const DetailDPD = () => {
  const { query } = useRouter();
  const filteredFeatures = statesData.features.filter(
    feature => feature.properties?.slug === query.id
  );

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
      <h1>{stateName}</h1>
      <h1>Dewan Perwakilan Daerah AELI {query.id}</h1>
    </div>
  );
};

export default DetailDPD;


import { MapContainer, Marker, Polygon, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import { statesData } from './data'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
function Mapss() {
    const router = useRouter()
    const position = [-2.8182097651959817, 118.00233509522967]
    const specialStates = ['Riau', 'Lampung', 'Jawa Timur', 'Jakarta Raya', 'Bali', 'Jawa Tengah', 'Jawa Barat', 'Sumatera Barat', 'Yogyakarta', 'Nusa Tenggara Barat', 'Kepulauan Riau', 'Bengkulu', 'Banten', 'Sumatera Selatan']
  
  return (
    <div>
        <MapContainer id='map-container' center={[-2.8182097651959817, 118.00233509522967]} zoom={5} scrollWheelZoom={false} dragging={false}  className='w-full h-[500px] bg-transparent overflow-hidden' zoomControl={false} attributionControl={false} boxZoom={false} doubleClickZoom={false} >
        <GeoJSON data={statesData} style={(feature:any) => ({
    fillColor: specialStates.includes(feature.properties.state) ? '#3b82f6' : 'gray',
    fillOpacity: 1,
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '',
  })} onEachFeature={
            (feature, layer) => {
                layer.on('click', (e) => {
                    console.log(feature.properties.state)
                    router.push(`/dpd/${feature.properties.slug}`);
                
                })
                layer.on('mouseover', (e) => {
                    layer.bindTooltip(feature.properties.state)
                    e.target.setStyle({
                        dashArray: "",
                        fillColor: "black",
                        fillOpacity: 0.7,
                        weight: 2,
                        opacity: 1,
                        color: "white",
                      })
                })
                layer.on('mouseout', (e) => {
                    layer.bindTooltip(feature.properties.state)
                        e.target.setStyle({
                        fillOpacity: 1,
                        weight: 2,
                        dashArray: "",
                        color: 'white',
                        fillColor: specialStates.includes(feature.properties.state) ? '#3b82f6' : 'gray' 
                      })
                })
                
            

            }
        }></GeoJSON>
        </MapContainer>
    </div>
  )
}

export default Mapss

// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
// import 'leaflet/dist/leaflet.css'
import { Icon } from "leaflet"
import dynamic from "next/dynamic"

const MapApp = dynamic(() => import('./components/MapApp'), {
  ssr: false
})

export default function Home() {
  
  const defaultPosition: [number, number] = [31.2565875, 34.7691391];
  // const defaultPosition: [number, number] = [51.505, -0.09];
  
  return (
    <main className='w-full h-full'>
      <MapApp />
    </main>
  )
}

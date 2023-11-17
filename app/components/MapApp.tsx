'use client';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';


const MapApp = () => {

    const defaultPosition: [number, number] = [31.2565875, 34.7691391];

  return (
      <div className='content'>
          <div className="flex flex-col w-full h-full">
              <div className="h-12 ">

              </div>
              <MapContainer zoom={12}
                  center={defaultPosition} className="map-container"
              >
                  <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                  <Marker position={defaultPosition}>
                      <Popup>
                          pretty CSS
                          <br />
                          easily costomize
                      </Popup>
                  </Marker>
              </MapContainer>
          </div>
      </div>
  )
}

export default MapApp
import './App.css';
import '../node_modules/leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { StreetGatherer } from './components/StreetGatherer';

function App() {




  return (
    <div className="App">

      <MapContainer center={[41.17869, -8.59565]} zoom={13} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <StreetGatherer></StreetGatherer>
      </MapContainer>
    </div>
  );
}

export default App;

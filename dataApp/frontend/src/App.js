import './App.css';
import '../node_modules/leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet'
import { useEffect, useState } from 'react';

function App() {
  //const [latitude, setLatitude] = useState('');
  //const [longitude, setLongitude] = useState('');
  const [box, setBox] = useState('');
  const limeOptions = { color: 'lime' }




  useEffect(() => {
    try {
      console.log("api")
      fetch(`https://nominatim.openstreetmap.org/search.php?q=Rua+Dom+Frei+Vicente+da+Soledade+e+Castro&format=jsonv2`) //TODO: formatar para dar certo
        .then((response) => response.json())
        .then((json) => {
          try {
            console.log(json);
            setBox([[json[0].boundingbox[0], json[0].boundingbox[2]], [json[0].boundingbox[1], json[0].boundingbox[3]]])
          } catch (error) {
            console.log('Error: ', error);
          }
        });
    } catch (error) {
      console.log('Error: ', error);
    }
  });



  return (
    <div className="App">

      <MapContainer center={[41.17869, -8.59565]} zoom={13} >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>
    </div>
  );
}

export default App;

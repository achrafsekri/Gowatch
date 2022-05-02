import React from "react";
import "../styles/map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useState, useEffect } from "react";

function Map(props) {
  const [locationlist, setlocationlist] = useState([]);

  useEffect(() => {
    const fetchpos = async () => {
      let loc = [];
      props.locations.map((location) => {
        let url = `http://api.positionstack.com/v1/forward?access_key=27906c481d85becf3eb1ec34f6bfd310&query=${location.adress}`;
        axios.get(url).then((res) => {
          location.lat = JSON.stringify(res.data.data[0].latitude);
          location.lon = JSON.stringify(res.data.data[0].longitude);
        });
        loc.push(location);
      });
      setlocationlist(loc);
    };
    fetchpos().catch((er) => console.log(er));
  }, []);
  console.log(locationlist);

  return (
    <div className="mw-screen bg-black ">
      {console.log(locationlist!=[]&&locationlist[0]!=undefined)&&console.log(locationlist[0].lat)}
      {/* (
        {(locationlist!=[]&&locationlist[0].lat!=undefined)&&<MapContainer center={[locationlist[0].lat,locationlist[0].lon]} zoom={12} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            key={Math.floor(Math.random() * 10000)}
            position={[locationlist.lat,locationlist.lon]}
          />
          </MapContainer>}
      ) */}
    </div>
  );
}

export default Map;

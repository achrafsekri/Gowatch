import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Map from "../components/Map";
import { useContext } from "react";

export default function () {
  const { movieid } = useParams();

  const [loc, setlocs] = useState([{ adress: "", scene: "",lat:'',lon:'',id:''}]);
  useEffect(() => {
    const fetchdata = async () => {
      let url = `http://localhost:4000/locations?id=${movieid}`;
      let newlocarray = [];
      await axios.get(url).then((response) => {
        response.data
          .filter((loca) => loca.adress != "" && loca.scene != "")
          .map((loca) => {
            loca.id = Math.floor(Math.random() * 10000);
            loca.lat = '';
            loca.lon = '';
            loca.adress = loca.adress.replace("\n", "");
            loca.scene = loca.scene.replace("\n", "");
            loca.scene = loca.scene.replace("(", "");
            loca.scene = loca.scene.replace(")", "");
            newlocarray.push(loca);
          });
      });
      setlocs(newlocarray);
    };
    fetchdata().catch((er) => console.log(er));
  }, []);

  return (
    <div className="">
      {loc[0].adress!='' && <Map locations={loc}></Map>}
    </div>
  );
}

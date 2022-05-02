import React, { useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import searchI from "../assets/searchI.svg";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movie, setmovie] = useState("");
  const [result, setresult] = useState([]);
  const [display, setdisplay] = useState('none');

  const navigate = useNavigate();
  const handlechange = (e) => {
    e.preventDefault();
    setmovie(e.target.value);
  };

  const handlesearch = () => {
    let tmdbkey = "f278a9350a4a2d4ad58f9186c9142f05";
    let displayurl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbkey}&query=${movie}&page=1&include_adult=false`;
    setdisplay('display')
    axios.get(displayurl).then((response) => {
      setresult(response.data.results);
      console.log(response.data.results);
    });
    // let url = `http://www.omdbapi.com/?apikey=60ee7807&s=${movie}`;
    // axios.get(url).then((response) => {
    //   navigate(`/map/${response.data.Search[0].imdbID}`);
    // });
  };
  
  return (
    <div className="max-w-screen min-h-screen bg-gray-900	flex flex-col items-center pt-20">
      <div className=" w-3/4 flex flex-col justify-center items-center gap-8">
        <h1 className="text-white text-5xl font-bold tracking-wide text-center leading-relaxed">
          See where your favorite movies were filmed
        </h1>
        <div className="bg-white w-3/4 h-12 flex justify-between rounded">
          <input
            type="text"
            className="outline-none bg-white h-full w-full p-3 rounded"
            placeholder="Write any movie's name"
            onChange={handlechange}
          />
          <a
            onClick={handlesearch}
            className="flex items-center justify-center p-4 rounded-md cursor-pointer hover:bg-slate-200"
          >
            <img src={searchI} alt="search icon" className="w-7 h-7" />
          </a>
        </div>
        <div className={display=='none' && "hidden"}>
          <h1 className="text-white text-lg p-4 text-left">
            Select the movie you are looking for
          </h1>
          <div className="w-full p-4 grid grid-cols-4 gap-4 place-content-center ">
            {result.map((film) => (
              <MovieCard
                key={film.id}
                id={film.id}
                posterurl={film.poster_path}
                title={film.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [result, setresult] = useState([]);
  const [display, setdisplay] = useState("none");
  

  const handlesearch = (e) => {
    e.preventDefault();
    let tmdbkey = "f278a9350a4a2d4ad58f9186c9142f05";
    let displayurl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbkey}&query=${e.target.value}&page=1&include_adult=false`;
    setdisplay("display");
    axios.get(displayurl).then((response) => {
      setresult(response.data.results);
    });
  };

  return (
    <div className="max-w-screen min-h-screen bg-background_pm flex flex-col items-center pt-20">
      <div className=" w-3/4 flex flex-col justify-center items-center gap-8">
        <h1 className="text-white text-5xl font-bold tracking-wide text-center leading-relaxed">
          Type a movie or a tv show's name and get recomondations
        </h1>
        <div className="bg-white w-3/4 h-12 flex justify-between rounded shadow-pm">
          <input
            type="text"
            className="outline-none bg-white h-full w-full p-3 rounded "
            placeholder="Write any movie's name"
            onChange={handlesearch}
            onKeyDown={e=>e.key=='Enter'&&handlesearch()}
          />
          <a
            onClick={handlesearch}
            className="flex items-center justify-center p-4 rounded-l-md cursor-pointer "
          >
            <span className="material-icons ">search</span>
          </a>
        </div>
        <div className={display == "none" ? "hidden" : null}>
          <h1 className="text-white opacity-80 text-lg p-4 text-left">
            Select the movie or tv show you are looking for
          </h1>
          <div className="w-full p-4 grid grid-cols-4 gap-4 place-content-center ">
            {result.map((film) => (
              <MovieCard
                key={film.id}
                id={film.id}
                genre={film.genre_ids}
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
